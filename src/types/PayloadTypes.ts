export interface QueryOptions {
  offset?: number;
  limit?: number;
}

interface RegexQuery {
  $regex: string;
  $options: "i" | "m" | "x" | "s";
}

export interface LaunchPayload {
  options?: QueryOptions;
  query?: {
    [key: string]: RegexQuery;
  };
}

export interface RocketPayload {
  options?: QueryOptions;
  query?: {
    [key: string]: RegexQuery;
  };
}
