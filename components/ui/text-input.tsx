import { Input } from "antd";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: "text" | "email" | "password" | "url";
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
  required?: boolean;
  defaultValue?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  control,
  prefix,
  max,
  min,
  label = "",
  type,
  name,
  errors,
  placeholder = "",
  defaultValue,
  autoComplete,
  required,
  suffix,
}) => {
  return (
    <>
      {label ? (
        <label
          className="block text-black dark:text-white text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <Input
            className={`dark:bg-black dark:text-white dark:placeholder-gray-500  dark:border-gray-800 ${errors?.[name]?.message ? "border-red-500" : ""}`}
            size="large"
            type={type}
            id={name}
            suffix={suffix}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            prefix={prefix}
            min={min}
            max={max}
            {...field}
          />
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide dark:text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { TextInput };
