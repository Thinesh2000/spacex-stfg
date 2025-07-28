import {} from "react";
import { useLoaderData } from "react-router-dom";

// import rocketDetails from "../mock/rocketDetails.json";
import type { RocketDetails } from "../types/RocketTypes";

const Rocket = () => {
  const {
    name,
    description,
    flickr_images,
    height,
    diameter,
    mass,
    first_stage,
    second_stage,
    engines,
    landing_legs,
    payload_weights,
    company,
    country,
    cost_per_launch,
    success_rate_pct,
    first_flight,
    wikipedia,
  } = useLoaderData() as RocketDetails;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-white bg-gray-900 rounded-xl shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-400 mb-6">{description}</p>

      {/* Images */}
      <div className="flex flex-wrap gap-4 mb-8">
        {flickr_images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Rocket ${i}`}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.5rem)] rounded-lg"
          />
        ))}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
        <Info label="Company" value={company} />
        <Info label="Country" value={country} />
        <Info label="First Flight" value={first_flight} />
        <Info label="Cost/Launch" value={`$${cost_per_launch.toLocaleString()}`} />
        <Info label="Success Rate" value={`${success_rate_pct}%`} />
        <Info
          label="Wikipedia"
          value={
            <a href={wikipedia} target="_blank" className="text-blue-400 underline">
              Link
            </a>
          }
        />
      </div>

      {/* Dimensions */}
      <Section title="Dimensions & Mass">
        <Info label="Height" value={`${height.meters} m / ${height.feet} ft`} />
        <Info label="Diameter" value={`${diameter.meters} m / ${diameter.feet} ft`} />
        <Info label="Mass" value={`${mass.kg} kg / ${mass.lb} lb`} />
      </Section>

      {/* First Stage */}
      <Section title="First Stage">
        <Info label="Engines" value={first_stage.engines} />
        <Info label="Thrust (Sea Level)" value={`${first_stage.thrust_sea_level.kN} kN`} />
        <Info label="Thrust (Vacuum)" value={`${first_stage.thrust_vacuum.kN} kN`} />
        <Info label="Fuel" value={`${first_stage.fuel_amount_tons} tons`} />
        <Info label="Burn Time" value={`${first_stage.burn_time_sec} sec`} />
        <Info label="Reusable" value={first_stage.reusable ? "Yes" : "No"} />
      </Section>

      {/* Second Stage */}
      <Section title="Second Stage">
        <Info label="Engines" value={second_stage.engines} />
        <Info label="Thrust" value={`${second_stage.thrust.kN} kN`} />
        <Info label="Fuel" value={`${second_stage.fuel_amount_tons} tons`} />
        <Info label="Burn Time" value={`${second_stage.burn_time_sec} sec`} />
        <Info label="Reusable" value={second_stage.reusable ? "Yes" : "No"} />
      </Section>

      {/* Engines */}
      <Section title="Engine Specs">
        <Info label="Type" value={engines.type} />
        <Info label="Version" value={engines.version} />
        <Info label="Layout" value={engines.layout} />
        <Info label="Thrust-to-Weight" value={engines.thrust_to_weight} />
        <Info label="ISP (Vacuum)" value={engines.isp.vacuum} />
        <Info label="Propellants" value={`${engines.propellant_1} + ${engines.propellant_2}`} />
      </Section>

      {/* Payload */}
      <Section title="Payload Weights">
        {payload_weights.map((payload) => (
          <Info
            key={payload.id}
            label={payload.name}
            value={`${payload.kg} kg / ${payload.lb} lb`}
          />
        ))}
      </Section>

      {/* Landing Legs */}
      <Section title="Landing Legs">
        <Info label="Number" value={landing_legs.number} />
        <Info label="Material" value={landing_legs.material ?? "N/A"} />
      </Section>
    </div>
  );
};

export default Rocket;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">{children}</div>
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
