import type { RocketDetails } from "../types/RocketTypes";

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

const fetchLaunches = async (): Promise<[] | null> => {
  try {
    // Fetching launch data from the SpaceX API
    const response = await fetch("https://api.spacexdata.com/v4/launches", {
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

const services = {
  fetchRockets,
  fetchRocketDetails,
  fetchLaunches,
  fetchLaunchDetails,
};

export default services;
