import React from "react";
import { cn } from "../../../utils/cn";
import ContentWrapper from "../../../components/atoms/ContentWrapper";

export type TTheme = "dark" | "light";

const themeMap: Record<TTheme, string> = {
  dark: "text-white bg-slate-800",
  light: "text-slate-800 bg-white",
};
const Section = ({
  children,
  theme = "light",
}: {
  children: React.ReactNode;
  theme?: TTheme;
}) => {
  return (
    <div className={cn(themeMap[theme], "py-16 text-center")}>
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
};

export default Section;
