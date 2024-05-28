import React from "react";
import Footer from "../molecules/Footer";

const HomeLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
