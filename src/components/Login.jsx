import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email_add.value;
    const password = event.target.password.value;

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        if (res.data && res.data.success && res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } else {
          setErrorMessage("Incorrect email or password.");
        }
      })
      .catch((error) => {
        console.error("Login failed. Error:", error);
        setErrorMessage("Incorrect email or password");
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <form className="max-w-md mx-auto w-3/6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email_add"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email_add"
              name="email_add"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              style={{ top: "30%" }}
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

          <div className="flex justify-center mt-5">
            <input
              type="submit"
              value="Login"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            />
          </div>
        </form>
        <div className="flex justify-center mt-5 mb-3">
          <Link
            to="/signup"
            className="text-sm font-medium text-white dark:text-gray-300"
          >
            <p>Create an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
