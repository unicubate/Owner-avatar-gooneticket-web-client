/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Image } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";

type Props = {
  item?: PostModel;
  index: number;
};

const ListFollowPosts: React.FC<Props> = ({ item, index }) => {
  return (
    <>
      <div
        key={index}
        className="mt-8 max-w-2xl mx-auto overflow-hidden bg-white shadow-2xl shadow-gray-300/50"
      >
        <div className="p-8 sm:py-10 sm:px-12">
          <div className="flex items-center">
            <div className="relative flex-shrink-0">
              <Avatar
                size={40}
                className="object-cover w-10 h-10 rounded-full"
                src={item?.profile?.image}
                alt={`${item?.profile?.firstName} ${item?.profile?.lastName}`}
              />
            </div>

            <div className="ml-4">
              <p className="text-sm font-bold text-gray-900">
                {item?.profile?.firstName ?? ""} {item?.profile?.lastName ?? ""}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                18 nov. 2022 à 16:57
              </p>
            </div>

            <div className="ml-auto">
              <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                {" "}
                Private{" "}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {item?.image ?
              <Image
                width="100%"
                height="100%"
                preview={false}
                src={item?.image}
                alt={item?.title}
              /> : null}
          </div>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            {item?.title ?? ""}
          </h3>
          <p className="mt-4 text-base font-normal text-gray-500" dangerouslySetInnerHTML={{ __html: item?.description || '' }} />

          <ListComments postId={String(item?.id)} />

        </div>
      </div>
    </>
  );
};

export default ListFollowPosts;
