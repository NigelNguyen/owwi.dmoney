import React from "react";

const VerticalField = ({ children, label }: { children: React.ReactNode, label: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">
    <span className="text-lg text-slate-950">{label}</span>
    {children}
  </div>;
};

export default VerticalField;
