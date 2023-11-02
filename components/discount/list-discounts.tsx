/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { CreateOrUpdateDiscount } from "./create-or-update-discount";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from "@/utils";
import Swal from "sweetalert2";
import { DeleteOneDiscountAPI } from "@/api-site/discount";
import { Tag } from "antd";

const ListDiscounts: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);

  const saveMutation = DeleteOneDiscountAPI({
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
          await saveMutation.mutateAsync({ discountId: item?.id });
          AlertSuccessNotification({
            text: "Discount deleted successfully",
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
      <div key={index} className="py-4">
        <div className="flex items-center">
          <>
            <p className="text-sm font-bold text-gray-900">
              {item?.percent}% Off Commissions
            </p>
            <p className="mt-1 ml-2 text-sm font-medium text-gray-500">
              {item?.code}
            </p>
          </>

          <div className="ml-auto">
            <p className="mt-1 text-sm font-medium text-gray-500">
              {item?.enableExpiredAt
                ? `Ends Midnight ${formateDMYHH(item?.expiredAt)}`
                : `Never Expires `}
            </p>
          </div>

          <div className="ml-auto">
            <button className="text-lg ml-2 font-bold transition-all duration-200">
              <Tag
                bordered={false}
                className="ml-2"
                color={`${item.isValid ? "success" : "error"}`}
              >
                {item.isValid ? "Valid" : "Invalid"}
              </Tag>
            </button>

            <button
              onClick={() => setShowModal(true)}
              title="Edit"
              className="text-lg ml-2 font-bold text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              <MdOutlineModeEdit />
            </button>
            <button
              title="Delete"
              onClick={() => {
                deleteItem(item);
              }}
              className="text-lg ml-2 font-bold text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>

      {showModal ? (
        <CreateOrUpdateDiscount
          showModal={showModal}
          setShowModal={setShowModal}
          discount={item}
        />
      ) : null}
    </>
  );
};

export { ListDiscounts };
