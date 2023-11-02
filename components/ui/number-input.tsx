import { InputNumber } from "antd";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: "number";
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
  required?: boolean;
  defaultValue?: string | number;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const NumberInput: React.FC<Props> = ({
  control,
  prefix,
  suffix,
  max,
  min = 1,
  label = "",
  type,
  name,
  errors,
  required,
  placeholder = "",
  autoComplete,
  defaultValue,
}) => {
  return (
    <>
      {label ? (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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
          <InputNumber
            size="large"
            id={name}
            required={required}
            suffix={suffix}
            style={{ width: "100%" }}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            prefix={<strong>{prefix}</strong>}
            min={min}
            max={max}
            {...field}
          />
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { NumberInput };
