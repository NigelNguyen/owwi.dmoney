import { useContext } from "react";
import CButton from "../../components/atoms/CButton";
import Section from "./components/Section";
import { AuthContext } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import { DemoList, DemoLogin } from "../../assets/images";

const Home = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const dashboardButton = (
    <CButton
      label="Go to Dashboard"
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
        <p className="text-6xl mb-8">Welcome to Owwi Money</p>
        {dashboardButton}
      </Section>

      <Section theme="dark">
        <p className="text-4xl mb-8">Easy to note your expense</p>
        <img src={DemoList} className="rounded-lg" />
      </Section>
      <Section>
        <p className="text-4xl mb-8">Connect with your Meta Mask</p>
        <div className="flex justify-center">
          <img src={DemoLogin} className="rounded-lg max-w-96" />
        </div>
      </Section>
      <Section theme="dark">
        <p className="text-4xl mb-8">
          Easy management with intuitive interface
        </p>
        {dashboardButton}
      </Section>
    </div>
  );
};

export default Home;
