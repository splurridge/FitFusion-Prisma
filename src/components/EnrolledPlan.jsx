import { useEffect, useState } from "react";
import axios from "axios";

function EnrolledPlans() {
  const [enrolledPlans, setEnrolledPlans] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEnrolledPlans = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const response = await axios.get(
            "http://localhost:3000/dashboard/enrolled-plans/inner",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          setEnrolledPlans(response.data);
        }
      } catch (error) {
        console.error("Error fetching enrolled plans:", error);
      }
    };

    fetchEnrolledPlans();
  }, []);

  const handleUnenroll = async (planId) => {
    try {
      const confirmUnenroll = window.confirm(
        "Are you sure you want to unenroll in this plan?"
      );
      if (confirmUnenroll) {
        const response = await axios.post(
          "http://localhost:3000/dashboard/unenroll",
          { plan_id: planId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setEnrolledPlans((prevEnrolledPlans) =>
            prevEnrolledPlans.filter((plan) => plan.plan_id !== planId)
          );

          if (selectedPlan === planId) {
            setWorkouts([]);
            setSelectedPlan(null);
          }
        }
      }
    } catch (error) {
      console.error("Error unenrolling from the plan:", error);
    }
  };

  const handlePlanClick = async (planId) => {
    setLoading(true);
    try {
      if (selectedPlan === planId) {
        setSelectedPlan(null);
        setWorkouts([]);
      } else {
        const response = await axios.get(
          `http://localhost:3000/dashboard/plan-content/${planId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { workouts } = response.data;
        setWorkouts(workouts);
        setSelectedPlan(planId);
      }
    } catch (error) {
      console.error("Error fetching plan details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutStatusUpdate = async (workoutId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-workout-status/${workoutId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout.workout_id === workoutId ? { ...workout, status } : workout
          )
        );
      }
    } catch (error) {
      console.error("Error updating workout status:", error);
    }
  };

  const getBackgroundColor = (category) => {
    switch (category) {
      case "Flexibility":
        return "bg-red-100";
      case "Strength":
        return "bg-yellow-100";
      case "Cardio":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  const filteredEnrolledPlans = enrolledPlans.filter((plan) => {
    if (selectedCategory === "All") {
      return true;
    }
    return plan.plan_category === selectedCategory;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div style={{ margin: "0 50px" }}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800 bg-white p-4 rounded-t-xl">
          Enrolled Plans
        </h1>
        <div className="bg-white p-4 rounded-b-xl">
          <label htmlFor="categoryFilter" className="mr-2">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 rounded border-gray-300 border focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="All">All</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap justify-start gap-8 p-8">
        {filteredEnrolledPlans.map((enrolledPlan) => (
          <div key={enrolledPlan.plan_id} className="max-w-md w-full">
            <div
              onClick={() => handlePlanClick(enrolledPlan.plan_id)}
              className="text-gray-900  hover:bg-gray-100 bg-white group rounded-xl shadow-md overflow-hidden p-10"
            >
              <div className="text-xl font-bold mb-2 cursor-pointer">
                {enrolledPlan.plan_name}
              </div>
              <p className="text-gray-600 text-sm mb-2">
                <b>Category: </b>
                <a
                  className={`p-1 rounded-xl ${getBackgroundColor(
                    enrolledPlan.plan_category
                  )}`}
                >
                  {enrolledPlan.plan_category}
                </a>
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <b>Total Days: </b>
                {enrolledPlan.plan_total_day}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <b>Total Minutes: </b>
                {enrolledPlan.plan_total_minute}
              </p>
            </div>

            {selectedPlan === enrolledPlan.plan_id && (
              <div className="mt-4">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 mt-4">
                    <h2 style={{ fontSize: "1.50em", fontWeight: "bold" }}>
                      Workouts
                    </h2>
                    {workouts.map((workout) => (
                      <div key={workout.workout_id} className="my-4">
                        {workout.workout_name && (
                          <>
                            <h3>
                              <b>Workout Name: </b>
                              {workout.workout_name}
                            </h3>
                            {workout.workout_description && (
                              <p>
                                <b></b>Description:{" "}
                                {workout.workout_description}
                              </p>
                            )}
                          </>
                        )}
                        <p>
                          <b>Day: </b>
                          {workout.workout_day}
                        </p>
                        <p>
                          <b>Sets: </b>
                          {workout.workout_set}
                        </p>
                        <p>
                          <b>Reps: </b>
                          {workout.workout_rep}
                        </p>
                        <p>
                          <b>Minutes: </b>
                          {workout.workout_minute}
                        </p>
                        <p>
                          <b>Status: </b>
                          {workout.status}
                        </p>

                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() =>
                            handleWorkoutStatusUpdate(
                              workout.workout_id,
                              "Finished"
                            )
                          }
                        >
                          Finished
                        </button>
                        <button
                          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() =>
                            handleWorkoutStatusUpdate(
                              workout.workout_id,
                              "Pending"
                            )
                          }
                        >
                          Pending
                        </button>

                        <button
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            handleWorkoutStatusUpdate(
                              workout.workout_id,
                              "Skipped"
                            )
                          }
                        >
                          Skipped
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleUnenroll(enrolledPlan.plan_id)}
                >
                  Unenroll
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledPlans;
