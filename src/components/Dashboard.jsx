import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import EnrolledPlan from "./EnrolledPlan.jsx";
import Logout from "./Logout";
import Logo from "./../assets/fitfusion.png";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Dashboard data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [navigate]);

  const scrollToEnrolledClasses = () => {
    const enrolledClassesDiv = document.getElementById("enrolledclass");
    if (enrolledClassesDiv) {
      enrolledClassesDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAvailablePlan = () => {
    const availablePlanDiv = document.getElementById("availableplan");
    if (availablePlanDiv) {
      availablePlanDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div
          id="sidebar"
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white  border-r border-gray-200  transform transition-transform "translate-x-0" : "-translate-x-full sm:translate-x-0"`}
          aria-label="Sidebar"
        >
          <div className="p-4 flex flex-col h-full justify-between">
            <div>
              <a className="flex items-center mb-6">
                <img src={Logo} alt="Logo" className="w-8 h-8 full mr-4" />
                <span className="text-xl font-bold text-gray-800">Profile</span>
              </a>
              <ul>
                <li
                  onClick={scrollToEnrolledClasses}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-200 group"
                >
                  <span>
                    <span className="text-l font-bold text-gray-800">
                      Enrolled Plan
                    </span>
                  </span>
                </li>
                <li
                  onClick={scrollToAvailablePlan}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-purple-200 group"
                >
                  <span>
                    <span className="text-l font-bold text-gray-800">
                      Available Plan
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Logout />
            </div>
          </div>
        </div>
        <div className="p-4 sm:ml-64 w-full bg-white">
          <div className="gap-4 mt-4">
            <div id="enrolledclass">
              <EnrolledPlan />
            </div>
            <div id="availableplan">
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
