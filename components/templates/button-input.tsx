import { ColorType } from "@/types/profile.type";



interface SizeInterface {
  [key: string]: string;
}

const sizeType: SizeInterface = {
  large: "2",
  normal: "1",
  medium: "0.2",
}

const shapeType: SizeInterface = {
  round: "full",
  default: "md",
}



interface Props {
  size?: 'large' | 'medium' | 'normal',
  loading: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  color: ColorType;
  shape?: 'round' | 'default',
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
}) => {
  return (
    <>
      <button
        type={loading ? 'button' : type}
        onClick={onClick}
        className={`
            rounded-${shapeType[String(shape ?? 'default')]}
            inline-flex
            items-center
            justify-center
            w-full
            px-4
            py-${sizeType[String(size ?? 'normal')]}
            text-sm
            font-bold
            leading-7
            text-center 
            text-white
            transition-all
            duration-200
            bg-${color}-${loading ? '200' : '500'}
            border-1
            font-semibold
            border-transparent
            focus:outline-none 
            focus:ring-offset-1 
            focus:ring-${color}-100
            hover:bg-${color}-${loading ? '200' : '500'}
        `}

      >
        {loading ? <>Please wait...</> : <>{children}</>}
      </button>
    </>
  );
};

export { ButtonInput };
