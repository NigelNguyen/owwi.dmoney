import CButton from "../../components/atoms/CButton";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import { NotFound } from "../../assets/images";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-[100vw] h-[100vh]">
        <div className="flex flex-col gap-4 text-center items-center w-fit absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
          <div className="text-3xl text-text-cell font-semibold">
            Page Not Found
          </div>
          <img src={NotFound} className="max-w-96" />
          <CButton
            label="<- Back to Home"
            onClick={() => navigate(paths.home)}
            className="w-fit"
          />
        </div>
    </div>
  );
};

export default PageNotFound;
