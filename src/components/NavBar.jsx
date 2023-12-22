import { Link } from "react-router-dom";
import Logo from "./../assets/fitfusion.png";

function Navbar() {
  return (
    <nav className="bg-gray-800 border-gray-200 dark:bg-gray-1000 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} alt="Profile Picture" className="w-8 h-8 full mr-2" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Fit Fusion
          </span>
        </Link>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to="/"
                href="#"
                className="block py- px-3 text-white rounded bg-transparent md:text-purple-600 md:p-2 md:dark:text-purple-600 hover:bg-purple-600 hover:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                href="#"
                className="block py-2 px-3 text-white rounded bg-transparent md:text-purple-600 md:p-2 md:dark:text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                href="#"
                className="block py-2 px-3 text-white rounded bg-transparent md:text-purple-600 md:p-2 md:dark:text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
