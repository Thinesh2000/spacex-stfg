import {} from "react";

import launch from "../mock/launchDetails.json";

const LaunchDetails = () => {
  const launchDate = new Date(launch.date_utc).toLocaleString();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{launch.name}</h1>
          <p className="text-gray-400 text-sm">Flight #{launch.flight_number}</p>
          <p className="text-gray-400 text-sm">Date: {launchDate}</p>
        </div>
        <img
          src={launch.links.patch.large}
          alt="mission patch"
          className="w-24 h-24 rounded-lg object-contain border border-gray-700"
        />
      </div>

      {/* Status */}
      <div className="mb-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            launch.success ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {launch.success ? "Success" : "Failure"}
        </span>
      </div>

      {/* Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Launch Details</h2>
        <p className="text-gray-300">{launch.details || "No details available."}</p>
      </div>

      {/* Failures (if any) */}
      {launch.failures.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-red-400">Failures</h2>
          <ul className="list-disc pl-6 text-gray-300">
            {launch.failures.map((fail, i) => (
              <li key={i}>
                <strong>Time:</strong> {fail.time}s — {fail.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Core Info */}
      {launch.cores.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Core Details</h2>
          <ul className="text-gray-300">
            {launch.cores.map((core, i) => (
              <li key={i} className="mb-2">
                <strong>Core ID:</strong> {core.core} <br />
                <strong>Flight:</strong> {core.flight} | <strong>Reused:</strong>{" "}
                {core.reused ? "Yes" : "No"} | <strong>Landing Attempt:</strong>{" "}
                {core.landing_attempt ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* External Links */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Related Links</h2>
        <div className="flex gap-4 flex-wrap text-blue-400 text-sm">
          {launch.links.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              Webcast
            </a>
          )}
          {launch.links.article && (
            <a
              href={launch.links.article}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              Article
            </a>
          )}
          {launch.links.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-300"
            >
              Wikipedia
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
