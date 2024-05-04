import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
}

const TimePickerInput: React.FC<Props> = ({
  control,
  label = '',
  name,
  errors,
  placeholder = '',
}) => {
  const format = 'HH:mm';

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
          <>
            <TimePicker
              id={name}
              size="large"
              format={format}
              placeholder={placeholder}
              style={{ width: '100%' }}
              className={`${errors?.[name]?.message ? 'border-red-500' : ''}`}
              value={dayjs(
                field.value ?? dayjs(new Date()).format(format),
                format,
              )}
              onChange={(value) => {
                field.onChange(dayjs(value).format(format));
              }}
              status={errors?.[name]?.message ? 'error' : ''}
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

export { TimePickerInput };
