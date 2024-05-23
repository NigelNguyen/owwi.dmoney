import DashBoard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { TRole } from "../types/constants";

export type TRoute = {
  path: string;
  element: React.ReactNode;
  roles: Array<TRole>;
};
export type TRoutes = Array<TRoute>;

export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  records: '/records'
}

export const routes:TRoutes = [
  {
    path: paths.home,
    element: <Home />,
    roles: ['guest', 'member', 'user'],
  },
  {
    path: paths.login,
    element: <Login/>,
    roles: ['guest']
  },
  {
    path: paths.register,
    element: <Register/>,
    roles: ['guest']
  },
  {
    path: paths.dashboard,
    element: <DashBoard/>,
    roles: ['user', 'member']
  },
  {
    path: paths.records,
    element: <DashBoard/>,
    roles: ['member','user']
  }
];
