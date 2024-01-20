import { Control, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../../ui/label';

interface Props {
  control: Control<any>;
  dataItem: any;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  firstOptionName: string;
  optionType: 'currency' | 'other';
}

const SelectInput: React.FC<Props> = ({
  control,
  dataItem,
  label = '',
  name,
  errors,
  placeholder = '',
  optionType,
  firstOptionName = '',
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
        render={({ field: { ref, ...field } }) => (
          <>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataItem?.length > 0 ? (
                    dataItem?.map((item: any, index: number) => (
                      <SelectItem
                        value={
                          optionType === 'currency' ? item?.code : item?.id
                        }
                        key={index}
                      >
                        {optionType === 'currency'
                          ? `${item?.code} - ${item?.name}`
                          : item?.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <p>Data Not Found</p>
                    </div>
                  )}

                  {/* <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <Select
              size="large"
              style={{ width: "100%" }}
              id={name}
              placeholder={placeholder}
              status={errors?.[name]?.message ? "error" : ""}
              {...field}
            >
              {dataItem?.length > 0 ? (
                dataItem?.map((item: any, index: number) => (
                  <Option

                    value={optionType === "currency" ? item?.code : item?.id}
                    key={index}
                  >
                    {optionType === "currency"
                      ? ${item?.code} - ${item?.name}
                      : item?.name}
                  </Option>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>
                  <SmileOutlined style={{ fontSize: 20 }} />
                  <p>Data Not Found</p>
                </div>
              )}
            </Select> */}
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
