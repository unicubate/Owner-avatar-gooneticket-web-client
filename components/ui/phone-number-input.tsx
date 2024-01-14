import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

const PhoneNumberInput: React.FC<Props> = ({
  control,
  label = "",
  name,
  errors,
  placeholder = "",
  defaultValue,
  required,
}) => {
  return (
    <>

      {label ? (
        <label
          className="block dark:text-white text-sm font-bold mb-2"
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
          <PhoneInput
            defaultCountry="CM"
            className={`w-full px-4 py-2.5 text-base font-semibold duration-200 border focus:outline-none focus:border-blue-600 rounded-md dark:bg-[#121212] dark:text-white dark:placeholder-gray-500  dark:border-gray-800  ${errors?.[name]?.message ? "border-red-500" : ""}`}
            placeholder={placeholder}
            id={name}
            required={required}
            autoComplete="off"
            {...field}
            rules={{ required: true }}
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

export { PhoneNumberInput };
