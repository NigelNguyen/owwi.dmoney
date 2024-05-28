import { TRole } from "../types/constants";
import { routes } from "./routes";
import { Route } from "react-router-dom";

const generateRoutes = ({ role }: { role: TRole }) => {
  return routes
    .filter((route) => route.roles.includes(role))
    .map((route) => {
      return (
        <Route
          path={route.path}
          element={<route.layout>{route.element}</route.layout>}
          key={route.path}
        />
      );
    });
};

export default generateRoutes;
