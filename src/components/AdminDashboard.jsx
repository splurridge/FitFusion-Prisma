import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLogout from "./AdminLogout";
import AdminPlans from "./AdminPlans";
import Logo from "./../assets/fitfusion.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  const addNewPlanRef = useRef(null);
  const existingPlansRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin");
    } else {
      axios
        .get("http://localhost:3000/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Admin Dashboard data:", response.data);
          setAdminData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching admin dashboard data:", error);
          setError("Failed to fetch admin data. Please try again.");
        });
    }
  }, [navigate]);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200  transform transition-transform "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
        aria-label="Sidebar"
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div>
            <a className="flex items-center mb-6">
              <img
                src={Logo}
                alt="Profile Picture"
                className="w-8 h-8 full mr-4"
              />
              <span className="text-xl font-semibold text-gray-800">
                Fit Fusion
              </span>
            </a>
            <ul>
              <li>
                <span
                  className="font-semibold flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-100 group"
                  onClick={() => scrollToRef(addNewPlanRef)}
                >
                  Add New Plan
                </span>
              </li>
              <li>
                <span
                  className="font-semibold flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-100 group"
                  onClick={() => scrollToRef(existingPlansRef)}
                >
                  Existing Plans
                </span>
              </li>
            </ul>
          </div>

          <div className="pb-4 flex items-center p-2 text-gray-900 rounded-lg group hover:bg-purple-100">
            <AdminLogout />
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <h2 ref={addNewPlanRef} className="text-4xl font-bold mb-8 text-center">
          Welcome to Admin Dashboard
        </h2>
        {error && <p>Error: {error}</p>}
        {adminData && (
          <div>
            <p className="text-sm font-semibold">
              Admin ID: {adminData.admin_id}
            </p>
          </div>
        )}
        <div ref={existingPlansRef}>
          <AdminPlans />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
