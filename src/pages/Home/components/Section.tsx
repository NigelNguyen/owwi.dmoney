import React from "react";
import { cn } from "../../../utils/cn";
import ContentWrapper from "../../../components/atoms/ContentWrapper";

export type TTheme = "purple" | "blue";

const themeMap: Record<TTheme, string> = {
  purple: "bg-purple-02",
  blue: "bg-blue-01",
};
const Section = ({
  children,
  theme = "purple",
}: {
  children: React.ReactNode;
  theme?: TTheme;
}) => {
  return (
    <div className={cn(themeMap[theme], "py-16 text-center text-text-title")}>
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
};

export default Section;
