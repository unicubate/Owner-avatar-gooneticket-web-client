import { Control, Controller, FieldValues } from 'react-hook-form';
import { Label } from '../../ui/label';

interface Props {
  control: Control<FieldValues>;
  label?: string;
  className?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  required?: boolean;
  children: React.ReactNode;
  defaultValue?: string;
}

const SelectOptionInput = ({
  control,
  label = '',
  name,
  errors,
  className,
  required,
  placeholder = '',
  children,
  defaultValue,
}: Props) => {
  return (
    <>
      {label ? (
        <Label
          htmlFor={name}
          className="mb-2 block text-sm font-bold dark:text-white"
        >
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : null}
        </Label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <select
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              defaultValue="default"
              className={`bg-background flex h-10 w-full border ${errors?.[name] ? 'border-red-600' : 'border-input'}  focus-visible:ring-ring ring-offset-background file:text-foreground placeholder:text-muted-foreground rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <option value="default" disabled selected>
                {placeholder}
              </option>
              {children}
            </select>
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

export { SelectOptionInput };
