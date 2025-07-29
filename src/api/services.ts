import type { LaunchPayload, RocketPayload } from "../types/PayloadTypes";
import type { LaunchData, RocketDetails } from "../types/ResponseTypes";

const fetchRockets = async (): Promise<RocketDetails[] | null> => {
  try {
    // Fetching rocket data from the SpaceX API
    const response = await fetch("https://api.spacexdata.com/v4/rockets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching rockets:", error);
    return Promise.reject("Error fetching rockets");
  }
};

const fetchRocketsByQuery = async ({
  name = "",
  offset = 0,
  limit = 10,
}: {
  name?: string;
  offset?: number;
  limit?: number;
}): Promise<RocketDetails[] | null> => {
  try {
    const payload: RocketPayload = {
      options: {
        offset,
        limit,
      },
    };
    if (name) {
      payload.query = {
        name: {
          $regex: name,
          $options: "i", // case-insensitive
        },
      };
    }

    // Fetching rocket data from the SpaceX API
    const response = await fetch("https://api.spacexdata.com/v4/rockets/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return await response.json().then((res) => res?.docs ?? null);
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching rockets:", error);
    return Promise.reject("Error fetching rockets");
  }
};

const fetchRocketDetails = async (rocketId: string): Promise<RocketDetails | null> => {
  try {
    // Fetching detailed rocket data from the SpaceX API
    const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching rocket data:", error);
    return Promise.reject("Error fetching rocket data");
  }
};

const fetchLaunches = async (): Promise<null> => {
  try {
    // Fetching detailed launch data from the SpaceX API
    const response = await fetch(`https://api.spacexdata.com/v4/launches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching launch data:", error);
    return Promise.reject("Error fetching launch data");
  }
};

const fetchLaunchesByQuery = async ({
  name = "",
  offset = 0,
  limit = 10,
}: {
  name?: string;
  offset?: number;
  limit?: number;
}): Promise<LaunchData[] | null> => {
  try {
    const payload: LaunchPayload = {
      options: {
        offset,
        limit,
      },
    };
    if (name) {
      payload.query = {
        name: {
          $regex: name,
          $options: "i", // case-insensitive
        },
      };
    }

    // Fetching launch data from the SpaceX API
    const response = await fetch("https://api.spacexdata.com/v4/launches/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return await response.json().then((res) => res?.docs ?? null);
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching launches:", error);
    return Promise.reject("Error fetching launches");
  }
};

const fetchLaunchDetails = async (launchId: string): Promise<null> => {
  try {
    // Fetching detailed launch data from the SpaceX API
    const response = await fetch(`https://api.spacexdata.com/v4/launches/${launchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching launch data:", error);
    return Promise.reject("Error fetching launch data");
  }
};

const fetchNextLaunch = async () => {
  try {
    const response = await fetch("https://api.spacexdata.com/v4/launches/next", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching next launch:", error);
    return Promise.reject("Error fetching next launch");
  }
};

const services = {
  fetchRockets,
  fetchRocketDetails,
  fetchLaunches,
  fetchLaunchDetails,
  fetchNextLaunch,
  fetchLaunchesByQuery,
  fetchRocketsByQuery,
};

export default services;
