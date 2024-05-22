import CButton from "../../components/atoms/CButton";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="text-3xl text-slate-50 ">404 Page Not Found</div>
      <CButton label="<- Back to Home" onClick={() => navigate(paths.home)} />
    </div>
  );
};

export default PageNotFound;
