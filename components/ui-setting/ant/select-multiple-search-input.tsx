import { SmileOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { Control, Controller } from "react-hook-form";
const { Option } = Select;

interface Props {
  control: Control<any>;
  dataItem: any;
  label?: string;
  name: string;
  errors: { [key: string]: any };
  placeholder?: string;
  icon?: React.ReactNode;
  mode: "multiple" | "tags";
}

const SelectMultipleSearchInput: React.FC<Props> = ({
  control,
  dataItem,
  label = "",
  name,
  errors,
  placeholder = "",
  icon,
  mode,
}) => {
  return (
    <>
      {label ? <label
        className="block text-sm font-bold mb-2"
        htmlFor={name}>
        {label}
      </label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Select
            showSearch
            size="large"
            mode={mode}
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
                    <Option key={index} value={item?.id} name={item?.name}>
                      <Space>
                        {icon}

                        {item?.name}
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

export { SelectMultipleSearchInput };
