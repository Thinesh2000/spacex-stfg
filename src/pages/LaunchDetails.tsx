import { type ReactNode } from "react";
import { formatDate } from "date-fns";
import { useLoaderData } from "react-router-dom";
import { FaWikipediaW, FaYoutube, FaGlobe } from "react-icons/fa";

// types
import type { LaunchData } from "../types/ResponseTypes";

const LaunchDetails = () => {
  const launch = useLoaderData() as LaunchData;
  // const launchDate = new Date(launch.date_utc).toLocaleString();

  const links: ExternalLinkProps[] = [
    {
      href: launch.links.webcast,
      icon: <FaYoutube />,
      title: "Webcast",
      color: "text-red-400",
    },
    {
      href: launch.links.wikipedia,
      icon: <FaWikipediaW />,
      title: "Wikipedia",
      color: "text-blue-400",
    },
    {
      href: launch.links.article,
      icon: <FaGlobe />,
      title: "Article",
      color: "text-green-400",
    },
  ];

  return (
    <section className="w-full min-h-screen px-6 md:px-12 py-12 text-white">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Date Section - Left Column */}
        <div className="lg:col-span-3 flex flex-col space-y-2">
          <h2 className="text-6xl font-bold">{launch.name}</h2>
          <p className="text-white/60 text-sm">{formatDate(launch.date_utc, "dd, mm, yyyy")}</p>
        </div>

        {/* Details Section - Right Column */}
        <div className="lg:col-span-9 space-y-10">
          {/* Header Card */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">{launch.name}</h1>
                <p className="text-white/60 text-sm">
                  Flight Number: <span className="text-white">{launch.flight_number}</span>
                </p>
                <p className="text-white/60 text-sm">
                  Status:{" "}
                  <span className={launch.success ? "text-green-400" : "text-red-400"}>
                    {launch.success ? "Successful" : "Failed"}
                  </span>
                </p>
              </div>
              {launch.links.patch?.large && (
                <img
                  src={launch.links.patch.large}
                  alt="Mission Patch"
                  className="w-32 h-32 object-contain"
                />
              )}
            </div>
          </div>

          {/* Details */}
          {launch.details && (
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Mission Overview</h3>
              <p className="text-white/80 leading-relaxed">{launch.details}</p>
            </div>
          )}

          {/* Failure Reasons */}
          {launch.failures?.length > 0 && (
            <div className="bg-red-900/30 border border-red-500/20 rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-red-300 mb-2">Failure Reasons</h3>
              <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
                {launch.failures.map((f, i) => (
                  <li key={i}>
                    ⏱️ {f.time}s — {f.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cores Information */}
          {launch.cores?.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg font-semibold mb-3">Core Information</h3>
              <ul className="space-y-2 text-sm text-white/80">
                {launch.cores.map((core, i) => (
                  <li key={i}>
                    Core ID: <span className="text-white">{core.core}</span> – Flight: {core.flight}{" "}
                    – Reused: <span className="text-white">{core.reused ? "Yes" : "No"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External Links */}
          <div className="flex flex-wrap gap-6 items-center">
            {links.map((link, index) => (
              <ExternalLink
                key={index}
                href={link.href}
                icon={link.icon}
                title={link.title}
                color={link.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExternalLinkProps {
  href: string;
  icon: ReactNode;
  title: string;
  color: string;
}
const ExternalLink = (props: ExternalLinkProps) => {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 ${props.color} hover:scale-120 transition-all`}
    >
      {props.icon} {props.title}
    </a>
  );
};

export default LaunchDetails;
