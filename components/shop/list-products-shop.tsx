/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Tooltip } from "antd";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { DeleteOnePostAPI } from "@/api/post";
import { ReadMore } from "@/utils/read-more";
import { MdDeleteOutline, MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/router";
import { GetUploadsAPI, viewOneFileUploadAPI } from "@/api/upload";
import { BiMoney } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { ProductModel } from "@/types/product";
import { DeleteOneProductAPI } from "@/api/product";

type Props = {
  item?: ProductModel;
  index: number;
};

const ListProductsShop: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutateAsync: saveMutation } = DeleteOneProductAPI({
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
          await saveMutation({ productId: item?.id });
          AlertSuccessNotification({
            text: "Product deleted successfully",
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

  const {
    status,
    data: dataImages,
  } = GetUploadsAPI({
    userId: item?.userId,
    model: "PRODUCT",
    uploadableId: `${item?.id}`,
    uploadType: "image",
  });

  if (status === 'loading') {
    <p>loading...</p>
  }

  return (
    <>
      <div key={index} className="py-5 divide-gray-200">
        <div className="flex items-center">
          <div className="relative flex-shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({ folder: 'products', fileName: String(dataImages?.data[0]?.path) })}
              alt={item?.title}
            />
          </div>

          <div className="flex-1 min-w-0 ml-3 cursor-pointer">
            {item?.title ? (
              <p className="text-lg font-bold text-gray-600">
                <ReadMore html={String(item?.title ?? "")} value={50} />
              </p>
            ) : null}
            {/* {item?.price ? (
              <p className="mt-4 text-sm font-medium text-gray-600">
                {item?.price} {item?.currency?.symbol}
              </p>
            ) : null} */}

            {/* <p className="mt-4 text-sm font-medium text-gray-500">
              {formateDateDayjs(item?.createdAt as Date)}
            </p> */}

            <div className="flex mt-10 items-center">

              <button className="text-lg font-normal">
                <BiMoney />
              </button>
              <span className="ml-2 text-sm font-bold">
                {item?.priceDiscount} {item?.currency?.symbol}
              </span>

              {item?.enableDiscount ? (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  <del>{item?.price} {item?.currency?.symbol}</del>
                </span>
              ) : null}


              <button className="ml-2 text-lg font-normal">
                <AiOutlineCalendar />
              </button>
              <span className="ml-2 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>

            </div>
          </div>

          <div className="py-4 text-sm font-medium text-right text-gray-900">
            <Tooltip placement="bottomRight" title={"View"}>
              <button
                onClick={() => router.push(`/shop/${item?.id}/edit`)}
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineRemoveRedEye />
              </button>
            </Tooltip>

            <Tooltip placement="bottomRight" title={"Edit"}>
              <button
                onClick={() => router.push(`/shop/${item?.id}/edit`)}
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

export default ListProductsShop;
