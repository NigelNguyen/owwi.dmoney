import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-purple-01 font-medium flex flex-col gap-6 items-center py-8 min-h-[20vh] justify-center">
      <p className="text-2xl text-blue-03">Let's stay close. Follow me</p>
      <div>
        <Link to="https://github.com/ThanhNghiaNg">
          <FaGithub size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
