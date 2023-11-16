/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineMailLock,
  MdOutlineModeEdit,
} from "react-icons/md";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from "@/utils";
import Swal from "sweetalert2";
import { DeleteOneDiscountAPI } from "@/api-site/discount";
import { Button, Tag } from "antd";
import { PaymentItemModel } from "@/types/payment";
import { GoCreditCard } from "react-icons/go";
import { FcSmartphoneTablet } from "react-icons/fc";
import { truncateInputCard } from "@/utils/utils";
import { useRouter } from "next/router";

const ListPayments: React.FC<{ item: PaymentItemModel; index: number }> = ({
  item,
  index,
}) => {
  const { locale } = useRouter();
  // const saveMutation = DeleteOneDiscountAPI({
  //   onSuccess: () => {},
  //   onError: (error?: any) => {},
  // });

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
          // await saveMutation.mutateAsync({ discountId: item?.id });
          // AlertSuccessNotification({
          //   text: "Discount deleted successfully",
          //   className: "info",
          //   gravity: "top",
          //   position: "center",
          // });
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
          {item?.type === "CARD" ? (
            <>
              <button className="text-3xl font-bold">
                <GoCreditCard />
              </button>
              <p className="ml-2 text-lg font-bold text-gray-900">
                {truncateInputCard(item?.cardNumber, 8)}
              </p>
              {/* <p className="ml-2 text-sm font-medium text-gray-900 hidden sm:table-cell">
                {item?.cardExpMonth}/{item?.cardExpYear}
              </p> */}
            </>
          ) : null}

          {item?.type === "PAYPAL" ? (
            <>
              <button className="text-3xl font-bold">
                <MdOutlineMailLock />
              </button>
              <p className="ml-2 text-lg font-bold text-gray-900">
                {item?.email}
              </p>
            </>
          ) : null}

          {item?.type === "PHONE" ? (
            <>
              <button className="text-3xl font-bold">
                <FcSmartphoneTablet />
              </button>
              <p className="ml-2 text-lg font-bold text-gray-900">
                {item?.phone}
              </p>
            </>
          ) : null}

          {/* <div className="ml-auto">
            <p className="mt-1 text-sm font-medium text-gray-500">
              {item?.type}
            </p>
          </div> */}

          <div className="ml-auto">
            <button className="text-lg ml-2 font-bold transition-all duration-200">
              <Tag
                bordered={false}
                className="ml-2"
                color={`${
                  Number(item.cardExpYear) >= new Date().getFullYear()
                    ? "success"
                    : "error"
                }`}
              >
                {Number(item.cardExpYear) >= new Date().getFullYear()
                  ? "Valid"
                  : "Invalid"}
              </Tag>
            </button>
            <button className="text-sm font-medium text-gray-500">
              {item?.action}
            </button>
            <button
              title="Delete"
              onClick={() => {
                deleteItem(item);
              }}
              className="text-lg ml-4 font-bold text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>

      {/* <tr key={index}>
        <td className="py-4 text-sm font-bold text-gray-900">
          <div className="flex items-center flex-1 min-w-0">
            {item?.type === "CARD" ? (
              <>
                <button className="text-3xl font-bold">
                  <GoCreditCard />
                </button>
                <p className="ml-2 text-lg font-bold text-gray-900">
                  {item?.cardNumber}
                </p>
              </>
            ) : null}
          </div>

          <div className="flex items-center flex-1 min-w-0">
          <div className="ml-auto">
            <button
              title="Delete"
              className="text-lg ml-2 font-bold text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              <MdDeleteOutline />
            </button>
          </div>
          </div>
        </td>
      </tr> */}
    </>
  );
};

export { ListPayments };
