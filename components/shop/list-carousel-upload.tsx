/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Carousel, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/router";
import { getOneFileGalleryAPI } from "@/api/post";
import { CreateOrUpdateFormLike } from "../like/create-or-update-form-like";
import { UploadModel } from "@/types/upload";
import { getOneFileUploadProductAPI } from "@/api/upload";

type Props = {
  uploads: UploadModel[];
};

const contentStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({ uploads }) => {
  return (
    <>
      {uploads?.length >= 0 && (
        <Carousel autoplay dotPosition={'top'}>
          {uploads?.map((item: any, index: number) => (
            <div key={index}>
              <Image
                className="object-cover w-full h-full"
                style={contentStyle}
                src={item?.url}
                //src={`${getOneFileUploadProductAPI(item?.path)}`}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ListCarouselUpload;
