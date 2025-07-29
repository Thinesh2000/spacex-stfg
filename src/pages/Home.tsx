import { useState } from "react";
import { Link } from "react-router-dom";

// components
import LaunchTimer from "../components/LaunchTimer";

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

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col gap-6 justify-center px-6 py-16 min-h-screen max-w-7xl mx-auto text-white">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
          Journey Beyond Earth
        </h2>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-sm">
          From Falcon rockets to interplanetary missions, SpaceX is rewriting the rules of space
          exploration. Discover the tech, the missions, and the moments that define humanity's next
          giant leap.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white/10 rounded-xl shadow-xl backdrop-blur-lg border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">Revolutionary Rockets</h3>
            <p className="text-sm text-gray-300">
              Learn how Falcon 9 and Starship are redefining launch costs and reusability.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl shadow-xl backdrop-blur-lg border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">Historic Launches</h3>
            <p className="text-sm text-gray-300">
              Relive the launches that shook the world and paved the way for Mars.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl shadow-xl backdrop-blur-lg border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">Mission to Mars</h3>
            <p className="text-sm text-gray-300">
              See how SpaceX plans to make life multiplanetary, one mission at a time.
            </p>
          </div>
        </div>
        <LaunchTimer />
      </section>
    </>
  );
};

export default HomePage;
