const CButton = ({
  label,
  onClick,
  type,
}: {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <button
      className="border-none bg-slate-950 px-4 py-2 rounded-md text-slate-50"
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default CButton;
