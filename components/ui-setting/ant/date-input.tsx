import { cn } from '@/lib/utils';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface Props {
  control: Control<FieldValues>;
  label?: string;
  name: string;
  required?: boolean;
  errors: { [key: string]: any };
  placeholder?: string;
}

const DateInput: React.FC<Props> = ({
  control,
  label = '',
  name,
  errors,
  required,
  placeholder = '',
}) => {
  return (
    <>
      {label ? (
        <label className="mb-2 block text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <DatePicker
            picker="date"
            size="large"
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
            id={name}
            className={cn(
              `border border-input dark:border-gray-900 dark:bg-background dark:text-white dark:placeholder:text-gray-500`,
            )}
            placeholder={placeholder}
            value={dayjs(field.value ?? new Date())}
            onChange={(value) => {
              field.onChange(value);
            }}
            required={required}
            status={errors?.[name]?.message ? 'error' : ''}
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

export { DateInput };
