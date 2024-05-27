import { useContext } from "react";
import CButton from "../../components/atoms/CButton";
import Section from "./components/Section";
import { AuthContext } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import { DemoLogin, DemoDashboard } from "../../assets/images";
import { FaArrowRight } from "react-icons/fa6";
import RandomPointsBackground from "./components/RandomPointsBackground";

const Home = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const dashboardButton = (
    <CButton
      label={
        <div className="flex items-center gap-1">
          <span>CONSOLE</span>
          <FaArrowRight />
        </div>
      }
      onClick={() => {
        if (role === "guest") {
          navigate(paths.login);
        } else {
          navigate(paths.records);
        }
      }}
    />
  );

  return (
    <div>
      <Section>
        <div className="flex flex-col gap-12">
          <div className="flex justify-between items-center">
            <p className="text-3xl">
              <strong>Owwi</strong>Money
            </p>
            {dashboardButton}
          </div>

          <RandomPointsBackground>
            <div className="flex flex-col justify-center gap-6 my-32 z-10">
              <p className="text-8xl">
                <strong>{new Date().getFullYear()}</strong>
              </p>
              <p className="text-2xl uppercase">Your year</p>
              <p className="text-4xl font-medium uppercase">
                To manage your money
              </p>
            </div>
          </RandomPointsBackground>

          <div className="flex flex-col gap-4 items-center">
            <p className="text-2xl font-medium uppercase">
              Easy to join with MetaMask
            </p>
            <img src={DemoLogin} className="max-w-96" />
          </div>
        </div>
      </Section>
      <Section theme="blue">
        <div className="flex flex-col gap-8 items-center text-white">
          <p className="text-2xl font-medium uppercase">
            Easy to note and manage your money
          </p>
          <img
            src={DemoDashboard}
            className="max-w-96 md:max-w-[640px] rounded-md"
          />
        </div>
      </Section>
    </div>
  );
};

export default Home;
