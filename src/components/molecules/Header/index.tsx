import { useContext } from "react";
import { OwwiLogo } from "../../../assets/images";
import Avatar from "../../atoms/Avatar";
import CButton from "../../atoms/CButton";
import ContentWrapper from "../../atoms/ContentWrapper";
import { AuthContext } from "../../../provider/authProvider";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { paths } from "../../../routes/routes";
import { useLogout } from "../../../apis/hooks/auth";
import toast from "react-hot-toast";

const Header = () => {
  const { role, logout } = useContext(AuthContext);
  const { mutate: endSession } = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    endSession(
      {},
      {
        onSuccess: () => {
          logout?.();
          navigate(paths.home);
          toast.success("Logged out!");
        },
        onError: () => {
          toast.error("Failed to logout!");
        },
      }
    );
  };

  const navigatePaths = [
    {
      path: paths.records,
      label: "Records",
    },
    {
      path: paths.categories,
      label: "Categories",
    },
    {
      path: paths.partners,
      label: "Partners",
    },
    {
      path: paths.dashboard,
      label: "Dashboard",
    },
  ];

  return (
    <div className="bg-white py-2 text-slate-950 mb-8">
      <ContentWrapper>
        <div className="flex justify-between items-center">
          <div className="hidden sm:flex 2xl:gap-12 xl:gap-8 lg:gap-6 gap-4  items-center text-lg italic">
            <NavLink to={paths.home}>
              <Avatar
                size="large"
                image={OwwiLogo}
                variant="rounded"
                className="shadow-lg mr-8"
              />
            </NavLink>
            {navigatePaths.map((item) => (
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  `hover:text-purple-400 ${isPending ? "pending" : isActive ? "font-semibold" : ""}`
                }
                key={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          {role === "guest" ? (
            <CButton
              variant="outlined"
              label="Login"
              title="Login to keep your data every where"
            />
          ) : (
            <CButton
              variant="outlined"
              label={<IoIosLogOut size={24} />}
              title="Logout"
              className="py-2"
              onClick={logoutHandler}
            />
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Header;
