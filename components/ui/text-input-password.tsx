import { Input } from "antd";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
const { Password } = Input;

interface Props {
  control: Control<any>;
  icon?: any;
  label?: string;
  name: string;
  type: "password";
  required?: boolean;
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
}

const TextInputPassword: React.FC<Props> = ({
  control,
  icon,
  label = "",
  type,
  name,
  errors,
  placeholder = "",
  autoComplete,
  required,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      {label ? <label
        className="block text-sm font-bold mb-2"
        htmlFor={name}>
        {label}
      </label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Password
            className={`dark:bg-black dark:placeholder-gray-500  dark:border-gray-800 ${errors?.[name]?.message ? "border-red-500" : ""}`}
            size="large"
            type={type}
            id={name}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
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

export { TextInputPassword };
