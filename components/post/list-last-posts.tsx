/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PostModel } from "@/types/post";
import { formateDMYHH } from "@/utils";
import { BiConversation } from "react-icons/bi";
import {
  MdFavoriteBorder,
} from "react-icons/md";
import Link from "next/link";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import { useRouter } from "next/router";

type Props = {
  item?: PostModel;
};

const ListLastPosts: React.FC<Props> = ({ item }) => {
  const { locale } = useRouter();
  return (
    <>
      <li key={item?.id} className="flex items-stretch justify-between space-x-2 py-7">
        <div className="flex-shrink-0">
          {item?.uploadsImage?.length > 0 ? (
            <div className="object-cover w-16 h-16 rounded-lg">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="posts"
                preview={false}
                height={65}
                className={`object-cover w-16 h-16 ${item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                  ? "blur-xl"
                  : ""
                  }`}
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-between flex-1 ml-5">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/posts/${item?.slug}`}
                className="text-sm font-bold text-black dark:text-white cursor-pointer"
              >
                {item?.title ?? ""}
              </Link>
            ) : null}

            <div className="flex mt-2 items-center font-medium text-gray-600">
              <button className="text-lg">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 text-sm">
                {item?.totalLike ?? 0}
              </span>

              <button className="ml-3.5 text-lg">
                <BiConversation />
              </button>
              <span className="ml-1.5 text-sm">
                {item?.totalComment ?? 0}
              </span>
              <span className="ml-auto text-sm">
                {formateDMYHH(item?.createdAt as Date, locale as string)}
              </span>
            </div>
          </div>
        </div>
      </li>

    </>
  );
};

export { ListLastPosts };
