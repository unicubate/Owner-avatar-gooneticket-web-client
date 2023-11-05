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
      <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
        <button
          type="button"
          title=""
          className="text-sm font-medium transition-all duration-200"
        >
          {" "}
        </button>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <div className="
                  relative 
                  inline-flex 
                  flex-shrink-0 
                  h-6
                  transition-all 
                  duration-200 
                  ease-in-out 
                  bg-white 
                  dark:bg-black 
                  border 
                  border-gray-200 
                  dark:border-gray-800  
                  rounded-full 
                  cursor-pointer 
                  w-11 
                  focus:outline-none">
                <label
                  htmlFor={name}
                  className="flex items-center relative w-max cursor-pointer select-none"
                >
                  {label ? <span className="font-bold mr-3">{label}</span> : null}

                  <Switch
                    // checkedChildren={<CheckOutlined />}
                    // unCheckedChildren={<CloseOutlined />}
                    checked={value}
                    onChange={onChange}
                  />
                </label>
              </div>

            </>
          )}
        />
      </div>
    </>
  );
};

export { SwitchInput };
