import {} from "react";
import { useLoaderData } from "react-router-dom";

import type { RocketDetails } from "../types/ResponseTypes";

const Rocket = () => {
  const rocket = useLoaderData() as RocketDetails;

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-12 text-white">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{rocket.name}</h1>
        <p className="text-gray-400 text-lg">{rocket.description}</p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rocket.flickr_images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Rocket ${i}`}
            className="rounded-lg object-cover w-full h-56"
          />
        ))}
      </div>

      {/* Basic Info */}
      <Section title="Basic Info">
        <Info label="Company" value={rocket.company} />
        <Info label="Country" value={rocket.country} />
        <Info label="First Flight" value={rocket.first_flight} />
        <Info label="Cost/Launch" value={`$${rocket.cost_per_launch.toLocaleString()}`} />
        <Info label="Success Rate" value={`${rocket.success_rate_pct}%`} />
        <Info
          label="Wikipedia"
          value={
            <a href={rocket.wikipedia} target="_blank" className="text-blue-400 underline">
              Read more...
            </a>
          }
        />
      </Section>

      {/* Dimensions & Mass */}
      <Section title="Dimensions & Mass">
        <Info label="Height" value={`${rocket.height.meters} m / ${rocket.height.feet} ft`} />
        <Info label="Diameter" value={`${rocket.diameter.meters} m / ${rocket.diameter.feet} ft`} />
        <Info label="Mass" value={`${rocket.mass.kg} kg / ${rocket.mass.lb} lb`} />
      </Section>

      {/* First Stage */}
      <Section title="First Stage">
        <Info label="Engines" value={rocket.first_stage.engines} />
        <Info label="Thrust (Sea Level)" value={`${rocket.first_stage.thrust_sea_level.kN} kN`} />
        <Info label="Thrust (Vacuum)" value={`${rocket.first_stage.thrust_vacuum.kN} kN`} />
        <Info label="Fuel" value={`${rocket.first_stage.fuel_amount_tons} tons`} />
        <Info label="Burn Time" value={`${rocket.first_stage.burn_time_sec} sec`} />
        <Info label="Reusable" value={rocket.first_stage.reusable ? "Yes" : "No"} />
      </Section>

      {/* Second Stage */}
      <Section title="Second Stage">
        <Info label="Engines" value={rocket.second_stage.engines} />
        <Info label="Thrust" value={`${rocket.second_stage.thrust.kN} kN`} />
        <Info label="Fuel" value={`${rocket.second_stage.fuel_amount_tons} tons`} />
        <Info label="Burn Time" value={`${rocket.second_stage.burn_time_sec} sec`} />
        <Info label="Reusable" value={rocket.second_stage.reusable ? "Yes" : "No"} />
      </Section>

      {/* Engines */}
      <Section title="Engine Specs">
        <Info label="Type" value={rocket.engines.type} />
        <Info label="Version" value={rocket.engines.version} />
        <Info label="Layout" value={rocket.engines.layout} />
        <Info label="Thrust-to-Weight" value={rocket.engines.thrust_to_weight} />
        <Info label="ISP (Vacuum)" value={rocket.engines.isp.vacuum} />
        <Info
          label="Propellants"
          value={`${rocket.engines.propellant_1} + ${rocket.engines.propellant_2}`}
        />
      </Section>

      {/* Payload */}
      <Section title="Payload Weights">
        {rocket.payload_weights.map((payload) => (
          <Info
            key={payload.id}
            label={payload.name}
            value={`${payload.kg} kg / ${payload.lb} lb`}
          />
        ))}
      </Section>

      {/* Landing Legs */}
      <Section title="Landing Legs">
        <Info label="Number" value={rocket.landing_legs.number} />
        <Info label="Material" value={rocket.landing_legs.material ?? "N/A"} />
      </Section>
    </div>
  );
};

export default Rocket;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-inner hover:shadow-xl transition-shadow duration-300 my-12">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-gray-400">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
