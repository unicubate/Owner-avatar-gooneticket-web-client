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
import { ButtonInput } from "../templates/button-input";
import { GetUploadsAPI } from "@/api/upload";
import ListCarouselUpload from "../shop/list-carousel-upload";

type Props = {
  item?: ProductModel;
};

const ListPublicCommissions: React.FC<Props> = ({ item }) => {
  const userVisiter = useAuth() as any;
  const router = useRouter();

  const {
    status,
    data: dataImages,
  } = GetUploadsAPI({
    userId: item?.userId,
    commissionId: item?.id,
    uploadType: "image",
  });

  if (status === 'loading') {
    <p>loading...</p>
  }

  return (
    <>

      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">

          {item?.id ? (
            <Link
              href={`/${item?.profile?.username}/posts/${item?.slug}`}
              className="mt-4 text-lg font-bold text-gray-900 cursor-pointer"
            >
              {item?.title ?? ""}
            </Link>
          ) : null}

          <p className="mt-4 text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="mt-2 text-center justify-center mx-auto">
            <ListCarouselUpload uploads={dataImages?.data} folder="commissions" />
          </div>

          <div className="mt-6 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                shape="default"
                type="button"
                size="large"
                loading={false}
                color={"indigo"}
                minW="fit"
              >
                Request this
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPublicCommissions;
