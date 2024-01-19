/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PostModel, PostType } from "@/types/post";
import ListComments from "../comment/list-comments";
import { formateDMYHH } from "@/utils";
import { BiComment, BiConversation } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import ReactPlayer from "react-player";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { HtmlParser } from "@/utils/html-parser";
import { IoShareOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../util/context-user";
import Link from "next/link";
import { downloadOneFileUploadAPI } from "@/api-site/upload";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import "react-h5-audio-player/lib/styles.css";
import { AudioPlayerInput } from "../ui-setting/ant/audio-player-Input";
import { useRouter } from "next/router";
import { ButtonInput } from "../ui-setting/ant";
import { AvatarComponent } from "../ui-setting/ant/avatar-component";
import { UserVisitorModel } from "@/types/user.type";

type Props = {
  item?: PostModel;
  commentTake: number;
  userVisitor: UserVisitorModel;
};

const ListFollowPosts: React.FC<Props> = ({
  item,
  commentTake,
  userVisitor,
}) => {
  const { locale, push } = useRouter();

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white dark:bg-[#121212] rounded-lg"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            <div
              onClick={() => push(`/${item?.profile?.username}`)}
              className="relative flex-shrink-0 cursor-pointer"
            >
              <AvatarComponent size={50} profile={item?.profile} />
            </div>

            <div
              onClick={() => push(`/${item?.profile?.username}`)}
              className="ml-3 cursor-pointer"
            >
              <p className="text-sm font-bold dark:text-white">
                {item?.profile?.firstName ?? ""} {item?.profile?.lastName ?? ""}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date, locale as string)}
              </p>
            </div>

            <div className="ml-auto">
              <div className="flex items-center space-x-2 sm:ml-5">
                {item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1 ? (
                  <ButtonInput
                    onClick={() =>
                      push(`/${item?.profile?.username}/memberships`)
                    }
                    shape="default"
                    type="button"
                    size="medium"
                    loading={false}
                    color={item?.profile?.color as any}
                    icon={<HiOutlineLockClosed className="w-5 h-5" />}
                  >
                    <span className="ml-1 font-bold">Join membership</span>
                  </ButtonInput>
                ) : null}
                <button
                  title="Share"
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <IoShareOutline className="w-5 h-5" />
                </button>
                {/* {item?.allowDownload && (
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
                )} */}
              </div>
            </div>
          </div>

          {item?.urlMedia && ["VIDEO"].includes(item?.type) ? (
            <div
              className={`mt-1 mx-auto 
            ${item?.whoCanSee === "MEMBERSHIP" && item?.isValidSubscribe !== 1
                  ? "blur-xl"
                  : ""
                }`}
            >
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
                post={item}
                uploads={item?.uploadsImage}
                folder="posts"
                height={400}
                className={`object-cover ${item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                  ? "blur-xl"
                  : ""
                  }`}
              />
            </div>
          ) : null}

          {/* <div className="flex mt-2 items-center">
            {item?.uploadsImage?.length > 0 && ["AUDIO"].includes(item?.type as PostType) ? (
              <ListCarouselUpload
                post={item}
                uploads={item?.uploadsImage}
                folder="posts"
                preview={false}
                width={100}
                height={100}
                className={`object-cover flex-none rounded-lg bg-slate-100 ${item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                  ? "blur-xl"
                  : ""
                  }`}
              />
            ) : null}
            <div className="min-w-0 flex-auto space-y-1 font-semibold">
              {item?.whoCanSee && ["AUDIO"].includes(item?.type as PostType) ? (
                <AudioPlayerInput
                  post={item}
                  urlMedia={item?.urlMedia}
                  enableUrlMedia={item?.enableUrlMedia}
                  uploads={item?.uploadsFile}
                  folder="posts"
                />
              ) : null}
            </div>
          </div> */}

          {item?.whoCanSee && ["AUDIO"].includes(item?.type as PostType) ? (
            <div className="text-center justify-center mx-auto">
              <AudioPlayerInput
                post={item}
                urlMedia={item?.urlMedia}
                enableUrlMedia={item?.enableUrlMedia}
                uploads={item?.uploadsFile}
                folder="posts"
              />
            </div>
          ) : null}

          {item?.title ? (
            <div className="mt-2 text-lg">
              <Link
                href={`/posts/${item?.slug}`}
                className="font-bold text-gray-900 dark:text-white cursor-pointer"
              >
                {item?.title ?? ""}
              </Link>
            </div>
          ) : null}

          {item?.description ? (
            <div
              className={`text-sm font-normal text-gray-600 dark:text-gray-300 group relative`}
            >
              <span
                className={`ql-editor ${item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                  ? "blur-lg"
                  : ""
                  }`}
              >
                <HtmlParser
                  html={String(item?.description ?? "")}
                  value={item?.isValidSubscribe !== 1 ? 600 : 0}
                />
              </span>
            </div>
          ) : null}

          <div className="flex mt-2 items-center font-medium text-gray-600">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-2 text-2xl">
              <BiConversation />
            </button>
            <span className="ml-2 text-sm">{item?.totalComment ?? 0}</span>
            {userVisitor?.id === item?.userId ? (
              <>
                <Link
                  title="Edit"
                  href={`/posts/${item?.id
                    }/edit?type=${item?.type.toLocaleLowerCase()}`}
                  className="ml-2 hover:text-indigo-400 focus:ring-indigo-400"
                >
                  <MdOutlineModeEdit className="w-6 h-6" />
                </Link>
              </>
            ) : null}
            {item?.allowDownload && (
              <>
                <button
                  title="Download"
                  onClick={() => {
                    push(
                      `${downloadOneFileUploadAPI({
                        folder: "posts",
                        fileName:
                          item.type === "AUDIO"
                            ? item?.uploadsFile[0]?.path
                            : item?.uploadsImage[0]?.path,
                      })}`
                    );
                  }}
                  className="ml-2 text-2xl text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              </>
            )}

            {item?.whoCanSee === "MEMBERSHIP" &&
              item?.isValidSubscribe !== 1 ? (
              <>
                <button className="ml-auto text-2xl">
                  <HiOutlineLockClosed />
                </button>
                <span className="ml-2 text-sm">Locked</span>
              </>
            ) : (
              <>
                <button className="ml-auto text-2xl">
                  <HiOutlineLockOpen />
                </button>
                <span className="ml-2 text-sm">Unlocked</span>
              </>
            )}
          </div>

          <ListComments
            model="POST"
            modelIds={["POST"]}
            userVisitorId={userVisitor?.id ?? ""}
            organizationId={String(item?.organizationId)}
            postId={String(item?.id)}
            take={commentTake}
          />
        </div>
      </div>
    </>
  );
};

export { ListFollowPosts };
