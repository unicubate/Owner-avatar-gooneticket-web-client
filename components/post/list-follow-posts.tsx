/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar } from "antd";
import { PostModel } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/context-user";
import Link from "next/link";
import { PiLockKey } from "react-icons/pi";
import { downloadOneFileUploadAPI } from "@/api/upload";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import { ButtonInput } from "../ui/button-input";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";

type Props = {
  item?: PostModel;
  commentTake: number;
};

const ListFollowPosts: React.FC<Props> = ({ item, commentTake }) => {
  const user = useAuth() as any;
  const router = useRouter();

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
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
              <button
                title="Share"
                className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
              >
                <IoShareOutline className="w-5 h-5" />
              </button>
              {item?.allowDownload && (
                <button
                  title="Download"
                  onClick={() => {
                    router.push(
                      `${downloadOneFileUploadAPI({
                        folder: "posts",
                        fileName: item?.uploadsImage[0]?.path,
                      })}`
                    );
                  }}
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {item?.urlMedia && ["VIDEO", "AUDIO"].includes(item?.type) ? (
            <div className="mt-2 mx-auto">
              <ReactPlayer
                className="mr-auto"
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          {item?.uploadsImage?.length > 0 ? (
            <div className="group relative mt-2 text-center justify-center mx-auto">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="posts"
                preview={false}
                height="100%"
                className={`${
                  item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                    ? "blur-3xl"
                    : ""
                }`}
              />

              {item?.whoCanSee === "MEMBERSHIP" &&
              item?.isValidSubscribe !== 1 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <button className="font-bold">
                      <PiLockKey className="w-7 h-7" />
                    </button>
                    <p className="text-sm font-bold">
                      {" "}
                      This post is for members only.{" "}
                    </p>

                    <ButtonInput
                      className="mt-2"
                      shape="default"
                      type="button"
                      size="normal"
                      loading={false}
                      color="red"
                    >
                      Join now
                    </ButtonInput>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {item?.id ? (
            <Link
              href={`/posts/${item?.slug}`}
              className="mt-2 text-lg font-bold text-gray-900 cursor-pointer"
            >
              {item?.title ?? ""}
            </Link>
          ) : null}

          <div className="mt-2 text-sm font-normal text-gray-600 ">
            <span className="ql-editor">
              <HtmlParser html={String(item?.description ?? "")} />
            </span>
          </div>

          <div className="flex mt-2 items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-2 text-lg font-bold">
              <BiComment />
            </button>
            <span className="ml-2 font-normal text-sm">
              {item?.totalComment ?? 0}
            </span>
            {user?.id === item?.userId ? (
              <>
                <Link
                  title="Edit"
                  href={`/posts/${
                    item?.id
                  }/edit?type=${item?.type.toLocaleLowerCase()}`}
                  className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                >
                  <MdOutlineModeEdit className="w-5 h-5" />
                </Link>

                <button
                  // onClick={() => deleteItem(item)}
                  title="Delete"
                  className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </>
            ) : null}

            {item?.whoCanSee === "MEMBERSHIP" &&
            item?.isValidSubscribe !== 1 ? (
              <>
                <button className="ml-auto text-lg font-bold">
                  <HiOutlineLockClosed />
                </button>
                <span className="ml-2 text-sm font-normal">Locked</span>
              </>
            ) : (
              <>
                <button className="ml-auto text-lg font-bold">
                  <HiOutlineLockOpen />
                </button>
                <span className="ml-2 text-sm font-normal">Unlocked</span>
              </>
            )}
          </div>

          <ListComments postId={String(item?.id)} take={commentTake} />
        </div>
      </div>
    </>
  );
};

export default ListFollowPosts;
