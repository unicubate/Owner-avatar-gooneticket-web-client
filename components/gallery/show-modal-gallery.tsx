import { Avatar, Button, Image, Upload } from "antd";
import { BiComment } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";
import {
  MdFavoriteBorder,
  MdOutlineModeEdit,
  MdDeleteOutline,
} from "react-icons/md";
import { PiLockKey } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import Link from "next/link";
import { HtmlParser } from "@/utils/html-parser";
import { getOneFileGalleryAPI } from "@/api/post";
import ListComments from "../comment/list-comments";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { useAuth } from "../util/session/context-user";
import { formateDMYHH } from "@/utils";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { downloadOneFileUploadAPI, viewOneFileUploadAPI } from "@/api/upload";

const { Dragger } = Upload;

type Props = {
  openModal: boolean;
  setOpenModal: any;
  commentTake?: number;
  item?: PostModel;
};

const ShowModalGallery: React.FC<Props> = ({
  setOpenModal,
  commentTake,
  openModal,
  item,
}) => {
  const router = useRouter();
  const user = useAuth() as any;

  const downloadItem = (item: any) => {
    console.log("item ======>", item);
    location.replace(
      `localhost:4700/api/v1/uploads/download/20230906i0cI573Q.jpeg`
    );
  };

  return (
    <>
      {openModal ? (
        <>
          <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
            <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
              <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
              <div className="w-full overflow-hidden border-none max-w-3xl p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white overflow-x-hidden max-h-full flex flex-col pointer-events-auto bg-clip-padding outline-none text-current">
                <div className="flex flex-shrink-0 items-center justify-between p-4 border-gray-200 rounded-t-md">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0 cursor-pointer">
                      <Avatar
                        size={40}
                        className="object-cover w-10 h-10 rounded-full"
                        src={item?.profile?.image}
                        alt={`${item?.profile?.firstName} ${item?.profile?.lastName}`}
                      />
                    </div>

                    <div className="ml-2 cursor-pointer">
                      <p className="text-sm font-bold text-gray-900">
                        {item?.profile?.firstName ?? ""}{" "}
                        {item?.profile?.lastName ?? ""}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        {formateDMYHH(item?.createdAt as Date)}
                      </p>
                    </div>
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
                    <button
                      title="Close"
                      onClick={() => setOpenModal(false)}
                      className="ml-2 text-gray-900 hover:text-gray-900 focus:ring-gray-900"
                    >
                      <AiOutlineClose className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-auto overflow-y-auto relative p-4">
                  <div className="mt-2">
                    <Image
                      width="100%"
                      preview={false}
                      src={`${viewOneFileUploadAPI({
                        folder: "posts",
                        fileName: item?.uploadsImage[0]?.path,
                      })}`}
                      alt={item?.title}
                    />
                  </div>

                  <p className="mt-4 text-lg font-bold text-gray-900 cursor-pointer">
                    {item?.title ?? ""}
                  </p>
                  <p className="mt-2 text-sm font-normal text-gray-600">
                    <HtmlParser html={String(item?.description ?? "")} />
                  </p>

                  <div className="flex mt-4 items-center">
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

                    <button className="ml-auto text-lg font-bold">
                      <PiLockKey />
                    </button>
                    <span className="ml-2 text-sm font-normal">Locked</span>
                  </div>

                  <ListComments
                    postId={String(item?.id)}
                    take={Number(commentTake)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export { ShowModalGallery };
