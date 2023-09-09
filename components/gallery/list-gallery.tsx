/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Button, Tooltip } from "antd";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  FundOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateGallery } from "./create-or-update-gallery";
import { DeleteOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { truncateInput } from "@/utils/utils";
import { ReadMore } from "@/utils/read-more";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

type Props = {
  item?: PostModel;
  index: number;
};

const ListGallery: React.FC<Props> = ({ item, index }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const saveMutation = DeleteOnePostAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
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
            <Avatar
              size={100}
              shape="square"
              src={getOneFileGalleryAPI(String(item?.image))}
              alt={item?.title}
            />
          </div>

          <div className="flex-1 min-w-0 ml-4 cursor-pointer">
            {item?.title ? (
              <p className="mt-2 text-sm font-bold text-gray-600">
                <ReadMore html={String(item?.title ?? "")} value={30} />
              </p>
            ) : null}
            <p className="mt-2 text-sm font-medium text-gray-500">
              <FieldTimeOutlined /> {formateDateDayjs(item?.createdAt as Date)}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500">
              <LikeOutlined /> {item?.totalLike ?? 0}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500">
              <CommentOutlined /> {item?.totalComment ?? 0}
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500">
              <FundOutlined /> {item?.whoCanSee}
            </p>
          </div>

          {/* <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                                                                            <p className="text-sm font-medium text-gray-500">200 <LikeOutlined /></p>
                                                                            <p className="mt-20 text-sm font-medium text-gray-500">150 <CommentOutlined /></p>
                                                                        </div> */}

          <div className="py-4 text-sm font-medium text-right text-gray-900">
            <Tooltip placement="bottomRight" title={"Edit"}>
              <button
                onClick={() => setOpenModal(true)}
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineModeEdit />
              </button>
            </Tooltip>

            <Tooltip placement="bottomRight" title={"Delete"}>
              <button
                onClick={() => deleteItem(item)}
                className="ml-2 text-lg text-gray-600 hover:text-red-600"
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
        />
      )}
    </>
  );
};

export default ListGallery;
