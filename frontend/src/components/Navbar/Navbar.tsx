import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
      : "hover:text-yellow-300 transition-colors duration-300";

  return (
    <div>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500/70 via-purple-500/70 to-pink-500/70 backdrop-blur-md shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">📊 Chart Viewer</h1>
          <ul className="flex space-x-6 text-base font-medium">
            <li>
              <NavLink to="/" className={navLinkClasses} end>
                Bar Chart
              </NavLink>
            </li>
            <li>
              <NavLink to="/line" className={navLinkClasses}>
                Line Chart
              </NavLink>
            </li>
            <li>
              <NavLink to="/pie" className={navLinkClasses}>
                Pie Chart
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Push content down to make room for fixed navbar */}
      <div className="pt-24 px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
