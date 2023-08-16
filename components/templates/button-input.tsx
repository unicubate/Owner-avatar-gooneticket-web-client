import { ColorType } from "@/types/profile.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";



interface SizeInterface {
  [key: string]: string;
}

const sizeType: SizeInterface = {
  large: "2.5",
  normal: "1.5",
  medium: "0.2",
}

const shapeType: SizeInterface = {
  round: "full",
  default: "md",
}



interface Props {
  className?: string,
  size?: 'large' | 'medium' | 'normal',
  loading: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  color: ColorType;
  shape?: 'round' | 'default',
  minW?: 'fit' | 'full',
  onClick?: () => void,
}

const ButtonInput: React.FC<Props> = ({
  type,
  size,
  shape,
  color,
  loading,
  children,
  onClick,
  minW,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ffff" }} spin />;
  return (
    <>
      <button
        type={loading ? 'button' : type}
        onClick={onClick}
        disabled={loading ? true : false}
        className={`
            rounded-${shapeType[String(shape ?? 'default')]}
            inline-flex
            items-center
            justify-center
            min-w-${(minW ?? 'full')}
            px-8
            py-${sizeType[String(size ?? 'normal')]}
            text-sm
            leading-6
            text-center 
            text-white
            transition-all
            duration-200
            bg-${loading ? 'blue' : color}-${loading ? '200' : '600'}
            border-1
            font-semibold
            border-transparent
            focus:outline-none 
            focus:ring-offset-1 
            focus:ring-${color}-100
            hover:bg-${color}-${loading ? '200' : '500'}
        `}
      >
        
        {loading ? <><Spin indicator={antIcon} /> <span className="px-2">Please wait...</span></> : <>{children}</>}
      </button>
    </>
  );
};

export { ButtonInput };
