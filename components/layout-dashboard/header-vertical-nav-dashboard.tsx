import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiHomeCircle,
  BiSearch,
  BiMessageRoundedDots,
  BiDetail,
  BiCog,
  BiCodeCurly,
} from "react-icons/bi";
import { FiList } from "react-icons/fi";
import { VscOpenPreview } from "react-icons/vsc";
import { BsGift, BsShop } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { VerticalNavDashboard } from "./vertical-nav-dashboard";



interface Props {
  user?: any;
}

const HeaderVerticalNavDashboard: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="hidden border-r border-gray-200 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col pt-5 overflow-y-auto">

          <VerticalNavDashboard />

        </div>
      </div>
    </>
  );
};

export { HeaderVerticalNavDashboard };
