import { useContext } from "react";
import { AuthContext } from "../../provider/authProvider";
import DashboardDefault from "./components/DashboardDefault";
import DashboardMember from "./components/DashboardMember";

const DashBoard = () => {
  const { role } = useContext(AuthContext);

  return <>{role === "member" ? <DashboardMember /> : <DashboardDefault />}</>;
};

export default DashBoard;
