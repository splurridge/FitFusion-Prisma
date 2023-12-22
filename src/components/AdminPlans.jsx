import { useState, useEffect } from "react";
import Delete from "./../assets/delete.png";
import Update from "./../assets/update.png";
import axios from "axios";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    plan_name: "",
    plan_total_day: "",
    plan_total_minute: "",
    plan_category: "",
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:3000/admin/plans", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const addWorkoutField = () => {
    const newWorkout = {
      workout_name: "",
      workout_description: "",
      workout_minute: "",
      workout_set: "",
      workout_rep: "",
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const handleWorkoutChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index] = {
      ...updatedWorkouts[index],
      [name]: value,
    };
    setWorkouts(updatedWorkouts);
  };

  const addPlan = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const newPlanWithWorkouts = {
        ...newPlan,
        workouts: workouts,
      };

      const response = await axios.post(
        "http://localhost:3000/admin/add-plan-with-workouts",
        newPlanWithWorkouts,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log("Add Plan Response:", response.data);

      if (response.data.success) {
        fetchPlans();
        setNewPlan({
          plan_name: "",
          plan_total_day: "",
          plan_total_minute: "",
          plan_category: "",
        });
        setWorkouts([]);
      } else {
        console.error("Error adding plan:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  const deletePlan = async (planId) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        console.error("Admin token not found");
        return;
      }

      await axios.delete(`http://localhost:3000/admin/delete-plan/${planId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const selectPlanForUpdate = async (plan) => {
    try {
      setSelectedPlan(plan);

      setNewPlan({
        plan_name: plan.plan_name,
        plan_total_day: plan.plan_total_day.toString(),
        plan_total_minute: plan.plan_total_minute.toString(),
        plan_category: plan.plan_category,
      });

      const adminToken = localStorage.getItem("adminToken");
      const response = await axios.get(
        `http://localhost:3000/admin/plan/${plan.plan_id}/workouts`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setWorkouts(response.data);
      } else {
        setWorkouts([]);
      }
    } catch (error) {
      console.error("Error fetching workouts for the plan:", error);
      setWorkouts([]);
    }
  };

  const updateSelectedPlan = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const updatedPlanWithWorkouts = {
        plan_name: newPlan.plan_name,
        plan_total_day:
          newPlan.plan_total_day !== ""
            ? parseInt(newPlan.plan_total_day)
            : null,
        plan_total_minute:
          newPlan.plan_total_minute !== ""
            ? parseInt(newPlan.plan_total_minute)
            : null,
        plan_category: newPlan.plan_category,
        workouts: workouts,
      };

      await axios.put(
        `http://localhost:3000/admin/update-plan/${selectedPlan.plan_id}`,
        updatedPlanWithWorkouts,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      fetchPlans();
      setSelectedPlan(null);
      setNewPlan({
        plan_name: "",
        plan_total_day: "",
        plan_total_minute: "",
        plan_category: "",
      });
      setWorkouts([]);

      console.log("Plan updated successfully.");
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3 className="text-md font-semibold">Add New Plan</h3>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="text"
            name="plan_name"
            value={newPlan.plan_name}
            placeholder="Plan Name"
            onChange={handleInputChange}
            className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            name="plan_total_day"
            value={newPlan.plan_total_day}
            placeholder="Total Days"
            onChange={handleInputChange}
            className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            name="plan_total_minute"
            value={newPlan.plan_total_minute}
            placeholder="Total Minutes"
            onChange={handleInputChange}
            className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
            style={{ marginRight: "10px" }}
          />
          <select
            name="plan_category"
            value={newPlan.plan_category}
            onChange={handleInputChange}
            className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
            style={{ marginRight: "10px" }}
          >
            <option value="">Select Category</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
          </select>
        </div>
        <h3 className="text-md font-semibold">Add New Workout</h3>
        <button
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          onClick={addWorkoutField}
          style={{ marginBottom: "20px" }}
        >
          Add Workout
        </button>
        {workouts.map((workout, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
            <select
              name="workout_day"
              value={workout.workout_day}
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            >
              <option value="">Select Workout Day</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="7">Sunday</option>
            </select>
            <input
              type="text"
              name="workout_name"
              value={workout.workout_name}
              placeholder="Workout Name"
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            />
            <input
              type="number"
              name="workout_minute"
              value={workout.workout_minute}
              placeholder="Workout Minutes"
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            />
            <input
              type="number"
              name="workout_set"
              value={workout.workout_set}
              placeholder="Workout Sets"
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            />
            <input
              type="number"
              name="workout_rep"
              value={workout.workout_rep}
              placeholder="Workout Reps"
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            />
            <textarea
              type="text"
              name="workout_description"
              value={workout.workout_description}
              placeholder="Workout Description"
              onChange={(e) => handleWorkoutChange(index, e)}
              className="bg-purple-50 border border-purple-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 pr-10 bg-white-700"
              style={{ marginRight: "10px" }}
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-md font-semibold">Existing Plans</h3>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Total Days</th>
              <th>Total Minutes</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.plan_id}>
                {/* Display plan details */}
                <td>{plan.plan_name}</td>
                <td>{plan.plan_total_day}</td>
                <td>{plan.plan_total_minute}</td>
                <td>{plan.plan_category}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={Delete}
                      alt="Profile Picture"
                      className="w-4 h-4 full mr-2"
                      onClick={() => deletePlan(plan.plan_id)}
                    />
                    <img
                      src={Update}
                      alt="Profile Picture"
                      className="w-4 h-4 full mr-2"
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Are you sure you want to update this plan?"
                        );
                        if (confirmed) {
                          selectPlanForUpdate(plan);
                          updateSelectedPlan();
                        }
                      }}
                      style={{ marginLeft: "5px" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          onClick={addPlan}
          style={{ marginBottom: "20px" }}
        >
          Add Plan
        </button>
      </div>
    </div>
  );
};

export default AdminPlans;
