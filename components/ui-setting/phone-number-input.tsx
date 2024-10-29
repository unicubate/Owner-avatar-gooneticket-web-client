import { Control, Controller, FieldValues } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Label } from '../ui/label';

interface Props {
  control: Control<FieldValues>;
  label?: string;
  defaultCountry: any;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  labelHelp?: React.ReactNode;
}

const PhoneNumberInput = ({
  control,
  label = '',
  name,
  defaultCountry,
  errors,
  placeholder = '',
  defaultValue,
  required,
  labelHelp,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {label ? (
          <Label htmlFor={name} className="mb-2 block text-sm font-bold">
            {label}
            {required ? <span className="ml-1 text-red-600">*</span> : null}
          </Label>
        ) : null}
        {labelHelp}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <>
            <PhoneInput
              defaultCountry={defaultCountry}
              international
              withCountryCallingCode
              className={`border-input dark:bg-background w-full rounded-md border px-3 py-2 text-sm font-semibold dark:border-gray-800 ${errors?.[name]?.message ? 'border-red-500' : ''}`}
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
