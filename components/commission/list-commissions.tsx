/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Spin, Tooltip } from "antd";
import { FieldTimeOutlined, LoadingOutlined } from "@ant-design/icons";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { DeleteOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { ReadMore } from "@/utils/read-more";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { CommissionModel } from "@/types/commission";
import { useRouter } from "next/router";
import { GetUploadsAPI, viewOneFileUploadAPI } from "@/api/upload";
import ListCarouselUpload from "../shop/list-carousel-upload";
import { BiMoney } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

type Props = {
  item?: CommissionModel;
  index: number;
};

const ListCommissions: React.FC<Props> = ({ item, index }) => {
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

  const { status, data: dataImages } = GetUploadsAPI({
    userId: item?.userId,
    model: "COMMISSION",
    uploadableId: `${item?.id}`,
    uploadType: "image",
  });

  if (status === "loading") {
    <p>loading...</p>;
  }

  return (
    <>
      <div key={index} className="py-5 divide-gray-200">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({
                folder: "commissions",
                fileName: String(dataImages?.data[0]?.path),
              })}
              alt={item?.title}
            />
          </div>

          <div className="flex-1 min-w-0 ml-3 cursor-pointer">
            {item?.title ? (
              <p className="text-lg font-bold text-gray-600">
                <ReadMore html={String(item?.title ?? "")} value={50} />
              </p>
            ) : null}

            <div className="flex mt-10 items-center">
              {item?.price ? (
                <>
                  <button className="text-lg font-normal">
                    <BiMoney />
                  </button>
                  <span className="ml-2 font-normal text-sm">
                    {item?.price} {item?.currency?.symbol}
                  </span>
                </>
              ) : null}
              <button className="ml-2 text-lg font-normal">
                <AiOutlineCalendar />
              </button>
              <span className="ml-2 font-normal text-sm">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>
          </div>

          <div className="py-4 text-sm font-medium text-right text-gray-900">
            <Tooltip placement="bottomRight" title={"Edit"}>
              <button
                onClick={() => router.push(`/commissions/${item?.id}/edit`)}
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
    </>
  );
};
export { ListCommissions };
