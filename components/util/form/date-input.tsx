import { DatePicker, Input } from "antd";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
}

const DateInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  placeholder = "",
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
        render={({ field: { onChange, value } }) => (
          <DatePicker
            picker="date"
            size="large"
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            id={name}
            placeholder={placeholder}
            onChange={(value) => {
              onChange(value);
            }}
            status={errors?.[name]?.message ? "error" : ""}
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

export { DateInput };
