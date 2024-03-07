import { Control, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Props {
  control: Control<any>;
  label?: string;
  defaultCountry: any;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

const PhoneNumberInput: React.FC<Props> = ({
  control,
  label = '',
  name,
  defaultCountry,
  errors,
  placeholder = '',
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
          <>
            <PhoneInput
              defaultCountry={defaultCountry}
              className={`w-full rounded-md border px-4 py-2.5 text-base font-semibold dark:border-gray-800 ${errors?.[name]?.message ? 'border-red-500' : ''}`}
              placeholder={placeholder}
              id={name}
              required={required}
              autoComplete="off"
              {...field}
              rules={{ required: true }}
            />
          </>
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
