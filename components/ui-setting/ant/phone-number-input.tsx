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
          className="mb-2 block text-sm font-bold dark:text-white"
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
            className={`w-full rounded-md border px-4 py-2.5 text-base font-semibold duration-200 focus:border-blue-600 focus:outline-none dark:border-gray-800 dark:bg-[#121212] dark:text-white  dark:placeholder:text-gray-500  ${errors?.[name]?.message ? "border-red-500" : ""}`}
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
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { PhoneNumberInput };
