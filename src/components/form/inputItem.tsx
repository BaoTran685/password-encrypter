import { cn } from "@/lib/tailwind-merge";

interface InputItemProps {
  label: string;
  name: string;
  type: string,
  placeholder: string,
  onChange: Function;
  value: number | string | undefined;
  isError: boolean;
  readonly: boolean;
}
const InputItem = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  value,
  isError,
  readonly,
}: InputItemProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="text-white text-sm font-medium block mb-2"
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={cn(`text-sm text-white input--box p-2.5`, {
          "border-red-600": isError === true,
          "border-[#A1A1AA]": isError === false,
        })}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        readOnly={readonly}
      />
    </>
  );
};

export default InputItem;
