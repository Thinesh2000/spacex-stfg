import { useState } from "react";
import { Link } from "react-router-dom";
import useThemeToggle from "../hooks/useThemeToggle";

const nextLaunch = {
  fairings: {
    reused: null,
    recovery_attempt: null,
    recovered: null,
    ships: [],
  },
  links: {
    patch: {
      small: null,
      large: null,
    },
    reddit: {
      campaign: null,
      launch: null,
      media: null,
      recovery: null,
    },
    flickr: {
      small: [],
      original: [],
    },
    presskit: null,
    webcast: "https://youtu.be/pY628jRd6gM",
    youtube_id: "pY628jRd6gM",
    article: null,
    wikipedia: null,
  },
  static_fire_date_utc: null,
  static_fire_date_unix: null,
  net: false,
  window: null,
  rocket: "5e9d0d95eda69974db09d1ed",
  success: null,
  failures: [],
  details: null,
  crew: [],
  ships: [],
  capsules: [],
  payloads: ["5fe3b86eb3467846b324217c"],
  launchpad: "5e9e4502f509094188566f88",
  flight_number: 188,
  name: "USSF-44",
  date_utc: "2022-11-01T13:41:00.000Z",
  date_unix: 1667310060,
  date_local: "2022-11-01T09:41:00-04:00",
  date_precision: "hour",
  upcoming: true,
  cores: [
    {
      core: "5fe3b8f2b3467846b3242181",
      flight: 1,
      gridfins: true,
      legs: true,
      reused: false,
      landing_attempt: null,
      landing_success: null,
      landing_type: null,
      landpad: null,
    },
    {
      core: "5fe3b8fbb3467846b3242182",
      flight: 1,
      gridfins: true,
      legs: true,
      reused: false,
      landing_attempt: null,
      landing_success: null,
      landing_type: null,
      landpad: null,
    },
    {
      core: "5fe3b906b3467846b3242183",
      flight: 1,
      gridfins: true,
      legs: true,
      reused: false,
      landing_attempt: null,
      landing_success: null,
      landing_type: null,
      landpad: null,
    },
  ],
  auto_update: true,
  tbd: false,
  launch_library_id: "2306e0bc-e1a3-4a4a-9285-e1a94073655e",
  id: "6243aec2af52800c6e91925d",
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const [_, setIsDark] = useThemeToggle();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center px-6 py-10 max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Explore SpaceX</h2>
          <p className="mb-6 text-lg">
            Stay updated with the latest launches, rockets, and SpaceX history.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/rockets"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Rockets
            </Link>
            <Link
              to="/launches"
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Launches
            </Link>
          </div>
        </div>
        <img
          src="https://images2.imgbox.com/40/e3/GypSkayF_o.png"
          alt="Rocket Launch"
          className="rounded-2xl shadow-xl w-full"
        />
      </section>

      {/* Next Launch */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Next Launch</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h4 className="text-xl font-bold mb-2">{nextLaunch.name}</h4>
            <p className="mb-2">Date: {new Date(nextLaunch.date_utc).toLocaleString()}</p>
            <p className="text-sm">Launchpad: {nextLaunch.launchpad}</p>
          </div>
        )}
      </section>

      {/* Explore Cards */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Explore</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Rockets</h4>
            <p className="text-sm mb-2">View all SpaceX rockets</p>
            <Link to="/rockets" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Launches</h4>
            <p className="text-sm mb-2">Upcoming and past launches</p>
            <Link to="/launches" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">History</h4>
            <p className="text-sm mb-2">Major milestones in SpaceX's journey</p>
            <Link to="/history" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Header = () => {
  const [_, setIsDark] = useThemeToggle();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-800 sticky top-0 z-50">
      <h1 className="text-2xl font-bold">SpaceX</h1>
      <nav className="space-x-4 hidden md:block">
        <Link to="/" className="no-underline text-inherit hover:underline">
          Home
        </Link>
        <Link to="/rockets" className="no-underline text-inherit hover:underline">
          Rockets
        </Link>
        <Link to="/launches" className="no-underline text-inherit hover:underline">
          Launches
        </Link>
        <Link to="/history" className="no-underline text-inherit hover:underline">
          History
        </Link>
        <button type="button" onClick={() => setIsDark((prev: boolean) => !prev)}>
          Toggle theme
        </button>
      </nav>
      <button className="md:hidden text-sm border px-3 py-1 rounded">Menu</button>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-16 py-6 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
    SpaceX Info Web App | Made with ❤️ using SpaceX API & React
  </footer>
);

export default HomePage;
