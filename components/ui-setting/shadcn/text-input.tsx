import { Control, Controller } from 'react-hook-form';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  min?: number;
  max?: number;
  type: 'text' | 'email' | 'password' | 'url';
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  required?: boolean;
  defaultValue?: string;
  pattern?: string;
}

const TextInput: React.FC<Props> = ({
  control,
  max,
  min,
  label = '',
  type,
  name,
  errors,
  pattern,
  placeholder = '',
  defaultValue,
  autoComplete,
  required,
}) => {
  return (
    <>
      {label ? (
        <Label
          htmlFor={name}
          className="block dark:text-white text-sm font-bold mb-2"
        >
          {label}
        </Label>
      ) : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { ref, ...field } }) => (
          <Input
            className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
            type={type}
            id={name}
            pattern={pattern}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
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
