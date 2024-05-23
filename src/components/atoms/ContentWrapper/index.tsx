import React from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 sm:px-8 md:-16 lg:px-24 xl:px-32 2xl:px-64">{children}</div>;
};

export default ContentWrapper;
