import { SmileOutlined } from "@ant-design/icons";
import { Select, Space, Tag } from "antd";
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
  icon?: React.ReactNode;
}

const SelectDiscountSearchInput: React.FC<Props> = ({
  control,
  dataItem,
  label = "",
  name,
  errors,
  placeholder = "",
  icon,
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
            showSearch
            size="large"
            style={{ width: "100%" }}
            id={name}
            placeholder={placeholder}
            status={errors?.[name]?.message ? "error" : ""}
            filterOption={(input, option) =>
              (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
            }
            {...field}
          >
            <>
              {dataItem?.length > 0
                ? dataItem?.map((item: any, index: number) => (
                    <Option
                      key={index}
                      value={item?.id}
                      name={`${item?.code} ${item?.percent}`}
                    >
                      <Space>
                        {icon}
                        {item?.percent}% off commissions - {item?.code}
                        <button className="text-lg ml-2 font-bold transition-all duration-200">
                          <Tag
                            bordered={false}
                            className="ml-2"
                            color={`${item.isValid ? "success" : "error"}`}
                          >
                            {item.isValid ? "Valid" : "Invalid"}
                          </Tag>
                        </button>
                      </Space>
                    </Option>
                  ))
                : null}
            </>
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

export { SelectDiscountSearchInput };
