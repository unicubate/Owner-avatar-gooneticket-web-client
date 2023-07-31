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
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
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
          <Password
            size="large"
            type={type}
            id={name}
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
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { TextInputPassword };
