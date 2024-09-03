import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
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
  defaultValue?: string;
  children: React.ReactNode;
}

const SelectInput = ({
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
            <Select
              onValueChange={onChange}
              name={name}
              value={value}
              required={required}
              defaultValue={defaultValue}
            >
              <SelectTrigger
                className={cn(
                  `${errors?.[name]?.message ? 'border-red-500' : ''}`,
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              {children}
            </Select>
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

export { SelectInput };
