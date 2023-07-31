import { SmileOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Control, Controller } from "react-hook-form";
const { Option } = Select;

interface Props {
  control: Control<any>;
  dataItem: any;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  firstOptionName: string;
  optionType: "currency" | "other";
}

const SelectInput: React.FC<Props> = ({
  control,
  dataItem,
  label = "",
  name,
  errors,
  placeholder = "",
  optionType,
  firstOptionName = "",
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
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
                    ? `${item?.code} - ${item?.name}`
                    : item?.name}
                </Option>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                <SmileOutlined style={{ fontSize: 20 }} />
                <p>Data Not Found</p>
              </div>
            )}
          </Select>
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { SelectInput };
