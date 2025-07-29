import { Link, useLocation } from "react-router-dom";
import useThemeToggle from "../hooks/useThemeToggle";

// assets
import LightLogo from "../assets/spacex-light.svg";
import DarkLogo from "../assets/spacex-dark.svg";

// icons
import { FaRocket, FaHistory, FaSatelliteDish, FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [isDark, setIsDark] = useThemeToggle();

  const menuItems: MenuItemProps[] = [
    { to: "/rockets", title: "Rockets", icon: <FaRocket /> },
    { to: "/launches", title: "Launches", icon: <FaSatelliteDish /> },
    { to: "/history", title: "History", icon: <FaHistory /> },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={isDark ? LightLogo : DarkLogo}
          alt="SpaceX"
          className="h-[40px] w-[160px] transition-all"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {menuItems.map((item) => (
          <MenuItem key={item.to} to={item.to} title={item.title} icon={item.icon} />
        ))}

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => setIsDark((prev: boolean) => !prev)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
        >
          {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          <span>{isDark ? "Light" : "Dark"}</span>
        </button>
      </nav>

      {/* Mobile Placeholder */}
      <button className="md:hidden text-sm border px-3 py-1 rounded">Menu</button>
    </header>
  );
};

interface MenuItemProps {
  to: string;
  title: string;
  icon?: React.ReactNode;
}

const MenuItem = ({ title, to, icon }: MenuItemProps) => {
  const { pathname } = useLocation();

  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`group flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:font-bold font-medium transition-all duration-200 ${
        isActive ? "font-bold text-underline" : ""
      }`}
    >
      <span className="transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
        {icon}
      </span>
      <span>{title}</span>
    </Link>
  );
};

export default Header;
