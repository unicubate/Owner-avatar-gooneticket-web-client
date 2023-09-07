/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Button, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineModeEdit,
} from "react-icons/md";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { getOneFileGalleryAPI } from "@/api/post";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/session/context-user";
import Link from "next/link";
import { ProductModel } from "@/types/product";
import { ShoppingCartOutlined } from "@ant-design/icons";

type Props = {
  item?: ProductModel;
  commentTake: number;
};

const ListPublicShop: React.FC<Props> = ({ item, commentTake }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();
  return (
    <>
      <div key={item?.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
        <Image
          preview={false}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          src="https://picsum.photos/seed/UGlAfLt/640/480"
          alt=""
        />

        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-center flex-shrink-0">
            <p className="text-2xl font-bold text-gray-900">$56.93</p>
            <p className="text-lg text-gray-400 font-bold ml-1">
              {" "}
              <del> $79.49 </del>
            </p>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
            <a href="#" title="">
              {" "}
              Columbia Mens Bahama Vent PFG Boat Shoe{" "}
            </a>
          </h3>
          <p className="mt-2 text-base font-normal text-gray-600 font-pj">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPublicShop;
