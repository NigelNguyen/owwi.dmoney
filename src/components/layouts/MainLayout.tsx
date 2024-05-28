import React from "react";
import Header from "../molecules/Header";
import ContentWrapper from "../atoms/ContentWrapper";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
};

export default MainLayout;
