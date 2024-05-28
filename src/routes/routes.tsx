import HomeLayout from "../components/layouts/HomeLayout";
import MainLayout from "../components/layouts/MainLayout";
import Categories from "../pages/Categories";
import DashBoard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Partners from "../pages/Partners";
import Records from "../pages/Records";
import Register from "../pages/Register";
import { TRole } from "../types/constants";

export type TRoute = {
  path: string;
  element: React.ReactNode;
  roles: Array<TRole>;
  layout: ({ children }: {    children?: React.ReactNode;}) => JSX.Element ;
};
export type TRoutes = Array<TRoute>;

export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  records: "/records",
  categories: "/categories",
  partners: "/partners",
};

export const routes: TRoutes = [
  {
    path: paths.home,
    element: <Home />,
    roles: ["guest", "member", "user"],
    layout: HomeLayout,
  },
  {
    path: paths.login,
    element: <Login />,
    roles: ["guest", "member", "user"],
    layout: HomeLayout,
  },
  {
    path: paths.register,
    element: <Register />,
    roles: ["guest", "member", "user"],
    layout: HomeLayout,
  },
  {
    path: paths.dashboard,
    element: <DashBoard />,
    roles: ["member", "user"],
    layout: MainLayout
  },
  {
    path: paths.records,
    element: <Records />,
    roles: ["member", "user"],
    layout: MainLayout
  },
  {
    path: paths.categories,
    element: <Categories />,
    roles: ["member", "user"],
    layout: MainLayout
  },
  {
    path: paths.partners,
    element: <Partners />,
    roles: ["member", "user"],
    layout: MainLayout
  },
];
