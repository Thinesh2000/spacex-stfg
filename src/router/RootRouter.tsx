// region: imports
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// types
import type { RouteObject } from "react-router-dom";
import services from "../api/services";

// import { AnimateWrapper } from "../components/animations";

// pages
const Home = lazy(() => import("../pages/Home"));
const History = lazy(() => import("../pages/History"));
const RocketsListing = lazy(() => import("../pages/RocketsListing"));
const RocketDetails = lazy(() => import("../pages/RocketDetails"));
const LaunchesListing = lazy(() => import("../pages/LaunchesListing"));
const LaunchDetails = lazy(() => import("../pages/LaunchDetails"));

// region: public routes
//* publicly accessible routes
const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    index: true,
    Component: Home,
  },
  {
    path: "/history",
    Component: History,
  },
  {
    path: "/rockets",
    Component: RocketsListing,
  },
  {
    path: "/rockets/:rocketId",
    Component: RocketDetails,
    loader: async ({ params }) => {
      if (!params.rocketId) {
        throw new Error("Rocket ID is required");
      }
      const data = await services.fetchRocketDetails(params.rocketId);
      if (!data) {
        throw new Error("Rocket data not found");
      }
      return data;
    },
  },
  {
    path: "/launches",
    Component: LaunchesListing,
  },
  {
    path: "/launches/:launchId",
    Component: LaunchDetails,
    loader: async ({ params }) => {
      if (!params.launchId) {
        throw new Error("Launch ID is required");
      }
      const data = await services.fetchLaunchDetails(params.launchId);
      if (!data) {
        throw new Error("Launch data not found");
      }
      return data;
    },
  },
];

// region: private routes
//* Authentication is required
const PrivateRoutes: RouteObject[] = [{}];

// region: export router
const RootRouter = () => {
  const Routes = [...PrivateRoutes, ...PublicRoutes];
  const router = createBrowserRouter(Routes);

  return (
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default RootRouter;
