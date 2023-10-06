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
import { getOneFileGalleryAPI } from "@/api-site/post";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/context-user";
import Link from "next/link";
import { ProductModel } from "@/types/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ReadMore } from "@/utils/read-more";
import { GetUploadsAPI, viewOneFileUploadAPI } from "@/api-site/upload";

type Props = {
  item?: ProductModel;
  commentTake: number;
};

const ListPublicShop: React.FC<Props> = ({ item, commentTake }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();

  const {
    status,
    data: dataImages,
  } = GetUploadsAPI({
    userId: item?.userId,
    model: "PRODUCT",
    uploadableId: `${item?.id}`,
    uploadType: "image",
  });

  if (status === 'loading') {
    <p>loading...</p>
  }
  return (
    <>
      <div key={item?.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
        {dataImages.length > 0 ?
          <Image
            preview={false}
            height={200}
            width="100%"
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src={viewOneFileUploadAPI({ folder: 'products', fileName: String(dataImages?.data[0]?.path) }) as string}
            alt=""
          /> : null}


        <div className="flex flex-col flex-1 p-3">
          <div className="flex items-center flex-shrink-0">

            <p className="text-2xl font-bold text-gray-900">
              {item?.priceDiscount ?? ""}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {item?.currency?.symbol ?? ""}
            </p>

            {item?.enableDiscount ? (
              <>
                <p className="ml-2 text-lg font-bold text-gray-400">
                  <del> {item?.price ?? ""} </del>
                </p>
                <p className="text-lg font-bold text-gray-400">
                  <del> {item?.currency?.symbol ?? ""} </del>
                </p>
              </>
            ) : null}

            <p className="ml-auto text-lg font-bold">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </p>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2 flex-1 hover:text-blue-600 transition-all duratin-200">
            <Link href={`/shop/${item?.slug}`} title={item?.title}>
              <ReadMore html={String(item?.title ?? "")} value={60} />
            </Link>
          </h3>
          <p className="mt-2 text-base font-normal text-gray-600">
            <HtmlParser html={String(item?.description ?? "")} value={60} />
          </p>
          {/* <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ListPublicShop;
