import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    height: "",
    weight: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/register", values)
      .then((res) => {
        console.log("Registration successful:", res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="justify-center bg-gray-900 min-h-screen flex flex-col items-center text-white">
        <h1 className="text-4xl font-bold mb-8">Create Account</h1>
        <form className="max-w-md mx-auto w-3/4" onSubmit={handleSubmit}>
          <div className=" flex items-center relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="username"
              className="mr-3 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-700 peer"
              placeholder=" "
              name="username"
              value={values.username}
              onChange={handleInput}
              required
            />

            <label
              htmlFor="floating_username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          <div className="flex items-center relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              value={values.email}
              onChange={handleInput}
              required
            />
            <label
              htmlFor="email"
              className="mr-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>

          <div className="flex items-center relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              name="password"
              className="mr-3 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              value={values.password}
              onChange={handleInput}
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex items-center   relative z-0 w-full mb-5 group">
              <input
                type="number"
                id="height"
                name="height"
                className="mr-3 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-700 peer"
                placeholder=" "
                value={values.height}
                onChange={handleInput}
                required
              />
              <label
                htmlFor="height"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Height
              </label>
            </div>

            <div className="flex items-center relative z-0 w-full mb-5 group">
              <input
                type="number"
                id="weight"
                name="weight"
                className="mr-3 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-700 peer"
                placeholder=" "
                value={values.weight}
                onChange={handleInput}
                required
              />
              <label
                htmlFor="weight"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-700 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Weight
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <input
              type="submit"
              value="Sign Up"
              className="flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-6 px-12 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            />
          </div>
        </form>
        <br />
        <Link
          to="/login"
          className="text-sm font-medium text-white dark:text-gray-300"
        >
          <p>Already have an account?</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
