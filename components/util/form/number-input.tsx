import { InputNumber } from "antd";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  icon?: any;
  label?: string;
  name: string;
  type: "number";
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
}

const NumberInput: React.FC<Props> = ({
  control,
  icon,
  label = "",
  type,
  name,
  errors,
  placeholder = "",
  autoComplete,
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputNumber
            size="large"
            id={name}
            style={{ width: "100%" }}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            prefix={icon}
            min={1}
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
