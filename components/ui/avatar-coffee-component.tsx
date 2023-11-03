import { capitalizeOneFirstLetter } from "@/utils/utils";
import { Avatar } from "antd";
import { ScreenSizeMap } from "antd/es/_util/responsiveObserver";
import { BiCoffeeTogo } from "react-icons/bi";

interface Props {
  color: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

const AvatarCoffeeComponent: React.FC<Props> = ({
  color,
  size,
  className = "h-10 w-10",
}) => {
  return (
    <>
      <Avatar
        className={className}
        size={size}
        style={{ backgroundColor: "#fde7", color: `${color}` }}
      >
        <BiCoffeeTogo className={`${className} text-${color}-400`} />
      </Avatar>
    </>
  );
};

export { AvatarCoffeeComponent };
