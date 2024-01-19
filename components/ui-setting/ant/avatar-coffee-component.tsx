import { capitalizeOneFirstLetter } from "@/utils/utils";
import { Avatar } from "antd";
import type { ScreenSizeMap } from "antd/es/_util/responsiveObserver";
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
      <BiCoffeeTogo className={`${className} text-blue-400`} />
    </>
  );
};

export { AvatarCoffeeComponent };
