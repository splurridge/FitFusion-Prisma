import { useEffect, useState } from "react";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin-dashboard/plans"
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const availablePlans = plans.filter((plan) => {
    if (selectedCategory === "All") {
      return true;
    } else {
      return plan.plan_category === selectedCategory;
    }
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div className="p-4 rounded-lg bg-red-100 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-900">
          Available Plans
        </h1>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white-50 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 pr-10 dark:bg-white-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-purple-500 dark:focus:border-purple-500"
        >
          <option value="All">All</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>
      {/* Render available plans */}
      <div className="flex flex-wrap justify-start gap-8 p-8">
        {availablePlans.map((plan) => (
          <div key={plan.plan_id} className="max-w-md w-full">
            <div className="text-gray-900  hover:bg-purple-100 dark:hover:bg-purple-100 group bg-white rounded-xl shadow-md overflow-hidden p-4">
              <div className="text-xl font-bold mb-2 cursor-pointer">
                {plan.plan_name}
              </div>
              <p className="text-gray-600 text-sm mb-2">
                Total Days: {plan.plan_total_day}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Total Minutes: {plan.plan_total_minute}
              </p>
              <p className="text-gray-600 text-sm">
                Category: {plan.plan_category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
