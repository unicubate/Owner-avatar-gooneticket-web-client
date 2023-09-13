/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Tooltip } from "antd";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateGallery } from "./create-or-update-gallery";
import { DeleteOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { ReadMore } from "@/utils/read-more";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineModeEdit,
} from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { downloadOneFileUploadAPI, viewOneFileUploadAPI } from "@/api/upload";
import { FiDownload } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { useRouter } from "next/router";

type Props = {
  item?: PostModel;
  index: number;
};

const ListGallery: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const saveMutation = DeleteOnePostAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes, Deleted",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6f42c1",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation.mutateAsync({ postId: item?.id });
          AlertSuccessNotification({
            text: "Image deleted successfully",
            className: "info",
            gravity: "top",
            position: "center",
          });
        } catch (error: any) {
          AlertDangerNotification({
            text: `${error.response.data.message}`,
            gravity: "top",
            className: "info",
            position: "center",
          });
        }
      }
    });
  };

  return (
    <>
      <div key={index} className="py-5 divide-gray-200">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 cursor-pointer">
            {item?.uploadsImage?.length > 0 ? (
              <Avatar
                size={100}
                shape="square"
                src={viewOneFileUploadAPI({
                  folder: "posts",
                  fileName: String(item?.uploadsImage[0]?.path),
                })}
                alt={item?.title}
              />
            ) : null}
          </div>

          <div className="flex-1 min-w-0 ml-3 cursor-pointer">
            {item?.title ? (
              <p className="mt-2 text-lg font-bold text-gray-600">
                <ReadMore html={String(item?.title ?? "")} value={50} />
              </p>
            ) : null}

            <div className="flex mt-10 items-center">
              <button className="tex-sm text-gray-700">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalLike ?? 0}
              </span>

              <button className="ml-1.5 tex-sm text-gray-700">
                <BiComment />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.totalComment ?? 0}
              </span>

              <button className="ml-1.5 tex-sm text-gray-700">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>

              <button className="ml-1.5 tex-sm text-gray-700">
                <TbWorld />
              </button>
              <span className="ml-1.5 font-normal text-sm">
                {item?.whoCanSee}
              </span>

              {item?.allowDownload && (
                <>
                  <button
                    onClick={() => {
                      router.push(
                        `${downloadOneFileUploadAPI({
                          folder: "posts",
                          fileName: String(item?.uploadsImage[0]?.path),
                        })}`
                      );
                    }}
                    title="Download"
                    className="ml-1.5 tex-sm text-gray-700"
                  >
                    <FiDownload />
                  </button>
                  <span className="ml-1.5 font-normal text-sm">Download</span>
                </>
              )}
            </div>
          </div>

          <div className="py-4 text-sm font-medium text-right text-gray-900">
            <Tooltip placement="bottomRight" title={"Edit"}>
              <button
                onClick={() => setOpenModal(true)}
                className="ml-1 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineModeEdit />
              </button>
            </Tooltip>

            <Tooltip placement="bottomRight" title={"Delete"}>
              <button
                onClick={() => deleteItem(item)}
                className="ml-1 text-lg text-gray-600 hover:text-red-600"
              >
                <MdDeleteOutline />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {openModal && (
        <CreateOrUpdateGallery
          post={item}
          openModal={openModal}
          setOpenModal={setOpenModal}
          uploadImages={item?.uploadsImage}
        />
      )}
    </>
  );
};

export default ListGallery;
