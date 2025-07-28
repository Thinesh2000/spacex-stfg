import { useState } from "react";
import { Link } from "react-router-dom";

import rockets from "../mock/rocketList.json"; // Assuming you have a mock data file for rockets

const RocketsListing = () => {
  const [search, setSearch] = useState("");

  const filteredRockets = rockets.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Rocket Listing</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search rockets..."
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRockets.map((rocket) => (
          <Link key={rocket.id} to={`/rockets/${rocket.id}`}>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-blue-500 cursor-pointer">
              <img
                src={rocket.flickr_images[0]}
                alt={rocket.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">{rocket.name}</h2>
                <p className="text-sm text-gray-400">First Flight: {rocket.first_flight}</p>
                <p className="text-sm text-gray-400">
                  Cost per Launch: ${rocket.cost_per_launch.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Success Rate: {rocket.success_rate_pct}%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredRockets.length === 0 && <p className="mt-8 text-gray-400">No rockets found.</p>}
    </div>
  );
};

export default RocketsListing;
