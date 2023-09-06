/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Avatar, Image } from "antd";
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
import { PiLockKey } from "react-icons/pi";
import { ButtonInput } from "../templates/button-input";
import { ShowModalGallery } from "./show-modal-gallery";
import { ReadMore } from "@/utils/read-more";

type Props = {
  item?: PostModel;
  commentTake: number;
};

const ListPublicGallery: React.FC<Props> = ({ item, commentTake }) => {
  const [openModal, setOpenModal] = useState(false);
  const userVisiter = useAuth() as any;
  return (
    <>
      <div className="group relative" key={item?.id}>
        <a
          title={item?.title}
          href={void (0)}
          onClick={() => setOpenModal(true)}
          className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl"
        >
          <Image
            preview={false}
            height={250}
            width="100%"
            // className={`object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 blur-lg`}
            className={`object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110`}
            // src="https://picsum.photos/seed/CJ1Gt/640/480"
            src={`${getOneFileGalleryAPI(String(item?.image))}`}
            alt={item?.title}
          />

          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <button className="font-bold">
                <PiLockKey className="w-7 h-7" />
              </button>
              <p className="text-sm font-bold"> This post is for members only. </p>

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
          </div> */}

        </a>

        <div className="flex flex-col flex-1">
          <p className="mt-2 text-base font-bold text-gray-600">
            <ReadMore html={String(item?.title ?? '')} value={45} /> </p>
        </div>

        <div className="flex mt-2 items-center text-gray-500">
          <CreateOrUpdateFormLike typeLike="POST" item={item} />

          <button className="ml-3.5 text-lg font-bold">
            <BiComment />
          </button>
          <span className="ml-1.5 font-normal text-sm">
            {item?.totalComment ?? 0}
          </span>
          <span className="ml-auto text-sm font-normal">
            {formateDMYHH(item?.createdAt as Date)}
          </span>
          <button className="ml-1.5 text-lg font-bold">
            <PiLockKey />
          </button>
        </div>

      </div>

      {/* <div className="group relative">
            <a
              title=""
              href={void (0)}
              onClick={() => setOpenModal(true)}
              className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl cursor-pointer"
            >
              <Image
                preview={false}
                height={250}
                width="100%"
                className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                src="https://picsum.photos/seed/o4fbCEZY/640/480"
                alt=""
              />
            </a>
            <div className="flex flex-col flex-1">
              <p className="mt-2 text-base font-bold text-gray-600"> Pokemon bar commission </p>
            </div>

            <div className="flex mt-2 items-center text-gray-500">
              <button className="text-lg font-bold">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                1
              </span>

              <button className="ml-3.5 text-lg font-bold">
                <BiComment />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                0
              </span>
              <span className="ml-auto text-sm font-normal">
                10 août 2023
              </span>
            </div>
          </div> */}

      {/* <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            <div className="cursor-pointer">
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
              {item?.allowDownload ? (
                <button
                  title="Download"
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              ) : null}

              {userVisiter?.id === item?.userId ? (
                <>
                  <button
                    onClick={() => router.push(`/posts/${item?.id
                      }/edit?type=${item?.type.toLocaleLowerCase()}`)}
                    title="Edit"
                    className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <MdOutlineModeEdit className="w-5 h-5" />
                  </button>

                  <button
                    // onClick={() => deleteItem(item)}
                    title="Delete"
                    className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                  >
                    <MdDeleteOutline className="w-5 h-5" />
                  </button>
                </>
              ) : null}
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

          <div className="flex mt-4 items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-2 text-lg font-bold">
              <BiComment />
            </button>
            <span className="ml-2 font-normal text-sm">
              {item?.totalComment ?? 0}
            </span>
          </div>
        </div>
      </div> */}

      {openModal ? (
        <ShowModalGallery
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={item}
          commentTake={commentTake}
        />
      ) : null}
    </>
  );
};

export default ListPublicGallery;
