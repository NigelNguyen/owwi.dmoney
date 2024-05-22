import { InputHTMLAttributes } from "react";

export interface TCInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  onChange: (value: string) => void;
}

const CInput = ({ onChange, value, type }: TCInputProps) => {
  return (
    <input
      className="outline-gray-900 border-gray-500 text-black hover:border-gray-700 border-[1px] px-3 py-1 rounded-md"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type={type}
    />
  );
};

export default CInput;
