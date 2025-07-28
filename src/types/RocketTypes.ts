export interface RocketDetails {
  name: string;
  description: string;
  flickr_images: string[];
  height: Record<string, string>;
  diameter: Record<string, string>;
  mass: Record<string, string>;
  first_stage: Record<string, string>;
  second_stage: Record<string, string>;
  engines: Record<string, string>;
  landing_legs: Record<string, string>;
  payload_weights: Record<string, string>[];
  company: string;
  country: string;
  cost_per_launch: string;
  success_rate_pct: string;
  first_flight: string;
  wikipedia: string;
}
