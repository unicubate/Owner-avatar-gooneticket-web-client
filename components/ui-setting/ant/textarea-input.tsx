import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
const { TextArea } = Input;

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  defaultValue?: string;
  row: number;
  required?: boolean;
  autoComplete?: "on" | "off";
}

const TextAreaInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  row,
  placeholder = "",
  defaultValue = "",
  required,
  autoComplete,
}) => {
  return (
    <>
      {label ? <label
        className="block dark:text-white text-sm font-bold mb-2"
        htmlFor={name}>
        {label}
      </label> : null}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <TextArea
            className={`dark:bg-[#121212] dark:text-white dark:placeholder-gray-500  dark:border-gray-800 ${errors?.[name]?.message ? "border-red-500" : ""}`}
            size="large"
            id={name}
            maxLength={6000}
            style={{ height: 120 }}
            required={required}
            autoSize={{ minRows: row, maxRows: 500 }}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
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

export { TextAreaInput };
