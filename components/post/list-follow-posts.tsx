/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Image } from "antd";
import { PostModel } from "@/types/post";
import ListCommentsPosts from "../comment/list-comments-posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsAPI } from "@/api/comment";
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
                src="https://picsum.photos/seed/bXJsaR0Ga/640/480"
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
            <Image
              width="100%"
              height="100%"
              preview={true}
              src="https://picsum.photos/seed/qiPtavBwFF/640/480"
              alt={item?.title}
              // placeholder={
              //     <Image
              //         preview={true}
              //         src="https://picsum.photos/seed/qiPtavBwFF/640/480"
              //         width={200}
              //     />
              // }
            />
          </div>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            {item?.title ?? ""}
          </h3>
          <p className="mt-4 text-base font-normal text-gray-500">
            {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
          </p>

          <ListComments postId={String(item?.id)} />
          
        </div>
      </div>
    </>
  );
};

export default ListFollowPosts;
