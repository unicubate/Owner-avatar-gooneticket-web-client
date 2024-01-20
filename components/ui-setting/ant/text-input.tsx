import { Input } from 'antd';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  className?: string;
  min?: number;
  max?: number;
  type: 'text' | 'email' | 'password' | 'url';
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  pattern?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  control,
  prefix,
  max,
  min,
  label = '',
  type,
  name,
  errors,
  pattern,
  className,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
  suffix,
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
          <Input
            className={`${className} dark:border-gray-800 dark:bg-[#121212] dark:text-white dark:placeholder:text-gray-500`}
            size="large"
            type={type}
            id={name}
            pattern={pattern}
            suffix={suffix}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? 'error' : ''}
            prefix={prefix}
            min={min}
            max={max}
            {...field}
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

export { TextInput };
