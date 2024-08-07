import { PasswordInput } from '@/components/ui/password-input';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Label } from '../../ui/label';

interface Props {
  control: Control<FieldValues>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  pattern?: string;
}

const TextPasswordInput = ({
  control,
  max,
  min,
  label = '',
  name,
  errors,
  pattern,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
}: Props) => {
  return (
    <>
      {label ? (
        <Label htmlFor={name} className="mb-2 block text-sm font-bold">
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : null}
        </Label>
      ) : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <>
            <PasswordInput
              className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
              id={name}
              pattern={pattern}
              required={required}
              placeholder={placeholder}
              autoComplete={autoComplete}
              min={min}
              max={max}
              {...field}
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

export { TextPasswordInput };
