import { useEffect, useRef, useState } from "react";
import { IOptions } from "../../../types/common";
import CInput from "../../atoms/Input";
import { cn } from "../../../utils/cn";
import HelperText from "../../atoms/HelperText";

const AutoComplete = ({
  options,
  value,
  onChange,
  className,
  errorMessage
}: {
  options: IOptions;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  errorMessage?:string
}) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilterValue(options.find((item) => item.value === value)?.label || "");
  }, [value]);

  return (
    <div
      className={cn("w-full relative", className)}
      ref={ref}
      onFocus={() => setOpenDropdown(true)}
    >
      <CInput
        value={filterValue}
        onChange={setFilterValue}
        onBlur={(event) => {
          setTimeout(() => {
            onChange(
              options.find(
                (item) =>
                  item.label.toLowerCase() === event.target.value.toLowerCase()
              )?.value || ""
            );
            setOpenDropdown(false);
          }, 150);
        }}
      />
      {errorMessage && <HelperText type="error" message={errorMessage} className="mt-1"/>}
      {openDropdown && (
        <div
          style={{ width: `${ref?.current?.offsetWidth}px` }}
          className="absolute top-[2rem] left-0 rounded-md z-20 overflow-hidden border-2"
          onFocus={() => setOpenDropdown(true)}
        >
          {options
            .filter((item) =>
              item.label
                .toLowerCase()
                .includes(filterValue.toString().toLowerCase())
            )
            .map((item) => (
              <div
                key={item.value}
                onClick={(event) => {
                  setOpenDropdown(true);
                  event.stopPropagation();
                  onChange(item.value.toString());
                  setFilterValue(
                    options.find((item) => item.value === value)?.label || ""
                  );
                  setOpenDropdown(false);
                }}
                className="hover:cursor-pointer hover:bg-gray-100 bg-white text-slate-800 p-2 border-b-[1px] last:border-b-0"
              >
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
