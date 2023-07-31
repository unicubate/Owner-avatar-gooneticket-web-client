import { CheckOutlined, CloseOutlined, SmileOutlined } from "@ant-design/icons";
import { Select, Switch } from "antd";
import { Control, Controller } from "react-hook-form";
const { Option } = Select;

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
}

const SwitchInput: React.FC<Props> = ({ control, label = "", name }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <label
              htmlFor={name}
              className="flex items-center relative w-max cursor-pointer select-none"
            >
              {label ? <span className="font-bold mr-3">{label}</span> : null}

              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={value}
                onChange={onChange}
              />
            </label>
          </>
        )}
      />
    </>
  );
};

export { SwitchInput };
