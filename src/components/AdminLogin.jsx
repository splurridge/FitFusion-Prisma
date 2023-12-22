import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/admin/login", {
        admin_email: email,
        admin_password: password,
      })
      .then((res) => {
        if (res.data && res.data.success && res.data.token) {
          localStorage.setItem("adminToken", res.data.token);
          navigate("/admin-dashboard");
        } else {
          setError("Admin login failed. Invalid credentials or other error.");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setError("Unauthorized: Invalid credentials");
          } else {
            setError("An error occurred. Please try again later.");
          }
          console.error("Admin login error:", error.response.data);
        } else if (error.request) {
          setError("Network error. Please check your internet connection.");
          console.error("Admin login error:", error.request);
        } else {
          setError("An unexpected error occurred. Please try again later.");
          console.error("Admin login error:", error.message);
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto w-3/6">
          <div className="mb-5">
            <label
              htmlFor="admin_email"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="admin_email"
              name="admin_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="admin_password"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="admin_password"
                name="admin_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 15a7.5 7.5 0 005 2.598M9 9a7.5 7.5 0 00-5 2.598"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <center>
              <input
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                type="submit"
                value="Login"
              />
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
