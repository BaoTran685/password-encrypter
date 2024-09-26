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
        className="text-black text-sm font-medium block mb-2"
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={cn(`text--content text-black input--box border-2 p-2`, {
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
