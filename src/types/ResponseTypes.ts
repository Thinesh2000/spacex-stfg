export interface LaunchData {
  fairings: {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
  };
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: {
    time: number;
    altitude: number | null;
    reason: string;
  }[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: {
    name?: string;
  };
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
  }[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

export interface RocketDetails {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  flickr_images: string[];

  height: Dimension;
  diameter: Dimension;
  mass: Mass;

  first_stage: Stage;
  second_stage: SecondStage;

  engines: Engine;
  landing_legs: LandingLegs;

  payload_weights: PayloadWeight[];
}

interface Dimension {
  meters: number;
  feet: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface Thrust {
  kN: number;
  lbf: number;
}

interface Stage {
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface SecondStage {
  thrust: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  payloads: {
    composite_fairing: {
      height: Dimension;
      diameter: Dimension;
    };
    option_1: string;
  };
}

interface Engine {
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
  isp: {
    sea_level: number;
    vacuum: number;
  };
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
}

interface LandingLegs {
  number: number;
  material: string | null;
}

interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}
