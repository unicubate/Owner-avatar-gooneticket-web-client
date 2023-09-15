/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { PostModel } from "@/types/post";
import { formateDMYHH } from "@/utils";
import { BiComment } from "react-icons/bi";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { useAuth } from "../util/session/context-user";
import { PiLockKey } from "react-icons/pi";
import { ShowModalGallery } from "./show-modal-gallery";
import { ReadMore } from "@/utils/read-more";
import { ButtonInput } from "../templates/button-input";
import ListCarouselUpload from "../shop/list-carousel-upload";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { HiOutlineLockOpen } from "react-icons/hi";

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
          href={void 0}
          onClick={() => setOpenModal(true)}
          className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl"
        >
          {item?.uploadsImage && item?.uploadsImage.length > 0 ? (
            <ListCarouselUpload
              uploads={item?.uploadsImage}
              folder="posts"
              preview={false}
              height={250}
              className={`object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 ${
                item?.whoCanSee === "MEMBERSHIP" && item?.isValidSubscribe !== 1
                  ? "blur-3xl"
                  : ""
              }`}
            />
          ) : null}

          {item?.whoCanSee === "MEMBERSHIP" && item?.isValidSubscribe !== 1 ? (
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
        </a>

        <div className="flex flex-col flex-1">
          <p className="mt-2 text-base font-bold text-gray-600">
            <ReadMore html={String(item?.title ?? "")} value={45} />{" "}
          </p>
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
          {/* <button className="ml-1.5 text-lg font-bold">
            <PiLockKey />
          </button> */}
          {item?.whoCanSee === "MEMBERSHIP" && item?.isValidSubscribe !== 1 ? (
            <button title="Locked" className="ml-1.5 text-lg font-bold">
              <HiOutlineLockClosed />
            </button>
          ) : (
            <button title="Unlocked" className="ml-1.5 text-lg font-bold">
              <HiOutlineLockOpen />
            </button>
          )}
        </div>
      </div>

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
