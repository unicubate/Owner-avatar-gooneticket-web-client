/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { getOneFileGalleryAPI } from "@/api/post";
import { CreateOrUpdateFormLike } from "../like/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import parse from "html-react-parser";

type Props = {
  item?: PostModel;
  index?: number;
};

const ListFollowPosts: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  return (
    <>
      <div
        key={index}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/50"
      >
        <div className="p-8 sm:py-10 sm:px-12">
          <div className="flex items-center">
            <div
              onClick={() => router.push(`/${item?.profile?.username}`)}
              className="relative flex-shrink-0 cursor-pointer"
            >
              <Avatar
                size={40}
                className="object-cover w-10 h-10 rounded-full"
                src={item?.profile?.image}
                alt={`${item?.profile?.firstName} ${item?.profile?.lastName}`}
              />
            </div>

            <div
              onClick={() => router.push(`/${item?.profile?.username}`)}
              className="ml-4 cursor-pointer"
            >
              <p className="text-sm font-bold text-gray-900">
                {item?.profile?.firstName ?? ""} {item?.profile?.lastName ?? ""}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date)}
              </p>
            </div>

            <div className="ml-auto">
              <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                {" "}
                Private{" "}
              </p>
            </div>
          </div>

          {item?.urlMedia && ["VIDEO", "AUDIO"].includes(item?.type) ? (
            <div className="mt-2">
              <ReactPlayer
                className="mr-auto"
                url={item?.urlMedia}
                width="100%"
                height="400px"
                controls
              />
            </div>
          ) : null}

          {item?.image ? (
            <div className="mt-2">
              <Image
                width="100%"
                height="100%"
                preview={false}
                src={`${getOneFileGalleryAPI(String(item?.image))}`}
                alt={item?.title}
              />
            </div>
          ) : null}

          {item?.id ? (
            <h3
              onClick={() => router.push(`/posts/${item?.slug}`)}
              className="mt-2 text-lg font-bold text-gray-900 cursor-pointer"
            >
              {item?.title ?? ""}
            </h3>
          ) : null}

          <p className="mt-4 text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="flex mt-4 items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-3.5 text-lg font-bold">
              <BiComment />
            </button>
            <span className="ml-1.5 font-normal text-sm">
              {item?.totalComment ?? 0}
            </span>
          </div>

          <ListComments postId={String(item?.id)} take={2} />
        </div>
      </div>
    </>
  );
};

export default ListFollowPosts;
