import { Link, NavLink, useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Provider/AuthContext";
// import Logo from "../../public/logo.jpg";
// import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (logOut) {
        await logOut();
        setDropdownOpen(false);
        navigate("/login"); // Redirect after logout
      } else {
        console.error("logOut function is not defined.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-orange-400 fixed top-0 w-[1250px]  z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo & Name */}
        <div className="flex items-center gap-4">
          {/* <img className="h-12 w-12 rounded-full" src={Logo} alt="Logo" /> */}
          <Link to="/" className="text-2xl text-black font-bold">
            Job Task
          </Link>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex items-center gap-6 absolute md:static top-16  md:w-auto  md:bg-transparent p-4 md:p-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <NavLink to="/" className="hover:text-purple-600 text-black">
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `hover:text-purple-600 text-black ${isActive ? "text-gray-300" : ""}`
            }
          >
            Add Task
          </NavLink>

          {user ? (
            <>
            

              {/* User Dropdown */}
              <div className="relative dropdown-menu">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-md rounded-lg z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      {user.displayName}
                    </div>
                   
                   
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4  py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
            >
              Login
            </NavLink>
          )}

          {/* Theme Toggle */}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;