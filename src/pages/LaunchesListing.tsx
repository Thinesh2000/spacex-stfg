import { useState } from "react";
import { Link } from "react-router-dom";

import launches from "../mock/lauchList.json"; // Assuming you have a mock data file for rockets

const LaunchesListing = () => {
  const [search, setSearch] = useState("");

  const filteredLaunches = launches.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">SpaceX Launches</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by mission name..."
        className="mb-8 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Launch Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredLaunches.map((launch) => (
          <Link
            to={`/launches/${launch.id}`}
            key={launch.id}
            className="bg-gray-900 rounded-xl p-4 transition-all hover:scale-105 hover:shadow-xl border border-gray-700"
          >
            <div className="flex justify-center mb-4">
              <img
                src={
                  launch.links.patch.small ??
                  "https://via.placeholder.com/100x100.png?text=No+Image"
                }
                alt={launch.name}
                className="w-20 h-20 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-center mb-1 text-white">{launch.name}</h2>
            <p className="text-sm text-center text-gray-400">
              {new Date(launch.date_utc).toLocaleDateString()}
            </p>
            <div className="mt-3 text-center">
              <span
                className={`px-2 py-1 text-xs rounded-full text-white ${
                  launch.success === true
                    ? "bg-green-600"
                    : launch.success === false
                    ? "bg-red-600"
                    : "bg-yellow-600"
                }`}
              >
                {launch.success === true
                  ? "Success"
                  : launch.success === false
                  ? "Failure"
                  : "Upcoming"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LaunchesListing;
