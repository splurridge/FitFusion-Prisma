import { useEffect, useState } from "react";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [enrolledPlans, setEnrolledPlans] = useState([]);
  const [enrolledPlanIds, setEnrolledPlanIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const response = await axios.get(
            "http://localhost:3000/dashboard/plans",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          setPlans(response.data);
          fetchEnrolledPlans(storedToken);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const enrolledIds = enrolledPlans.map((plan) => plan.plan_id);
    setEnrolledPlanIds(enrolledIds);
  }, [enrolledPlans]);

  const fetchEnrolledPlans = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/enrolled-plans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnrolledPlans(response.data);
    } catch (error) {
      console.error("Error fetching enrolled plans:", error);
    }
  };

  const isEnrolled = (planId) => {
    return enrolledPlanIds.includes(planId);
  };

  const handlePlanClick = async (planId) => {
    setSelectedPlan(planId === selectedPlan ? null : planId);
    setLoading(true);

    try {
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
    } catch (error) {
      console.error("Error fetching plan details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (planId) => {
    try {
      const confirmEnroll = window.confirm(
        "Are you sure you want to enroll in this plan?"
      );
      if (confirmEnroll) {
        const response = await axios.post(
          "http://localhost:3000/dashboard/enroll",
          { plan_id: planId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          fetchEnrolledPlans(token);
        }
      }
    } catch (error) {
      console.error("Error enrolling in the plan:", error);
    }
  };

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

  const availablePlans = plans.filter((plan) => !isEnrolled(plan.plan_id));

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPlans = availablePlans.filter(
    (plan) =>
      selectedCategory === "All" || plan.plan_category === selectedCategory
  );

  return (
    <div style={{ margin: "0 50px" }}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800 bg-white p-4 rounded-t-xl">
          Available Plans
        </h1>
        <div className="bg-white p-4 rounded-b-xl">
          <label htmlFor="categoryFilter" className="mr-2">
            Filter by Category:
          </label>
          <select
            id="categorySelect"
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
      <hr className="bg-purple-900" />
      <div className="flex flex-wrap justify-start gap-8 p-8">
        {filteredPlans.map((plan) => (
          <div key={plan.plan_id} className="max-w-md w-full">
            <div
              onClick={() => handlePlanClick(plan.plan_id)}
              className="text-gray-900  hover:bg-purple-50 bg-white group rounded-xl shadow-md overflow-hidden p-10"
            >
              <div className="text-xl font-bold mb-2 cursor-pointer">
                {plan.plan_name}
              </div>
              <p className="text-gray-600 text-sm mb-2">
                <b>Category: </b>
                <a
                  className={`p-1 rounded-xl ${getBackgroundColor(
                    plan.plan_category
                  )}`}
                >
                  {plan.plan_category}
                </a>
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <b>Total Days: </b>
                {plan.plan_total_day}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <b>Total Minutes: </b>
                {plan.plan_total_minute}
              </p>
            </div>

            {selectedPlan === plan.plan_id && (
              <div className="mt-4">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {workouts.length > 0 ? (
                      <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 mt-4">
                        <h2>Workouts</h2>
                        {workouts.map((workout) => (
                          <div key={workout.workout_id} className="my-4">
                            {workout.workout_name && (
                              <>
                                <h3>Workout Name: {workout.workout_name}</h3>
                                {workout.workout_description && (
                                  <p>
                                    Description: {workout.workout_description}
                                  </p>
                                )}
                              </>
                            )}
                            <p>Day: {workout.workout_day}</p>
                            <p>Sets: {workout.workout_set}</p>
                            <p>Reps: {workout.workout_rep}</p>
                            <p>Minutes: {workout.workout_minute}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No workouts available</p>
                    )}

                    {!isEnrolled(plan.plan_id) ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEnroll(plan.plan_id)}
                      >
                        Enroll
                      </button>
                    ) : (
                      <>
                        <p className="text-green-500 font-semibold">
                          Already Enrolled
                        </p>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                          onClick={() => handleUnenroll(plan.plan_id)}
                        >
                          Unenroll
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
