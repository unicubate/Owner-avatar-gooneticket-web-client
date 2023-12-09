/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  MdDeleteOutline,
  MdOutlineMailLock,
  MdOutlineModeEdit,
} from "react-icons/md";
import { FcAbout } from "react-icons/fc";
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
import { CreateValidationFormCodePhoneUser } from "../user/create-validation-form-code-phone-user";
import { CreateOnPaymentPI } from "@/api-site/payment";

const ListPayments: React.FC<{ item: PaymentItemModel; index: number }> = ({
  item,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { locale } = useRouter();
  // const saveMutation = DeleteOneDiscountAPI({
  //   onSuccess: () => {},
  //   onError: (error?: any) => {},
  // });

  const { mutateAsync } = CreateOnPaymentPI({
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

  const resendItem = async (item: any) => {
    try {
      await mutateAsync({
        data: { phone: item?.phone, organizationId: item?.organizationId },
        paymentModel: 'RESEND-VERIFY-CODE-PHONE',
      });
      AlertSuccessNotification({
        text: "Your authentication code has been sent",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setShowModal(true)
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
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
              <p className="ml-2 text-lg font-bold dark:text-white">
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
              <p className="ml-2 text-lg font-bold dark:text-white">
                {item?.email}
              </p>
            </>
          ) : null}

          {item?.type === "PHONE" ? (
            <>
              <button className="text-3xl font-bold">
                <FcSmartphoneTablet />
              </button>
              <p className="ml-2 text-lg font-bold dark:text-white">
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
              {["PHONE"].includes(item?.type) && (
                <Tag
                  bordered={false}
                  className="ml-2"
                  color={`${item.status === 'ACTIVE'
                    ? "success"
                    : "error"
                    }`}
                  title="Resend code validation"
                  onClick={() => {
                    item.status === 'ACTIVE' ? console.log('Phone number valid') : resendItem(item);
                  }}

                >
                  {item.status === 'ACTIVE'
                    ? "PHONE VALID"
                    : "CONFIRM YOUR PHONE NUMBER"}
                </Tag>

              )}
              {["CARD"].includes(item?.type) && (
                <Tag
                  bordered={false}
                  className="ml-2"
                  color={`${Number(item.cardExpYear) >= new Date().getFullYear()
                    ? "success"
                    : "error"
                    }`}
                  title="Card status"
                  onClick={() => {
                    item.status === 'ACTIVE' ? console.log('Phone number valid') : resendItem(item);
                  }}

                >
                  {Number(item.cardExpYear) >= new Date().getFullYear()
                    ? "CARD VALID"
                    : "CARD INVALID"}
                </Tag>

              )}
            </button>

            {/* <button className="text-lg ml-2 font-bold transition-all duration-200">
              {["CARD", "PHONE"].includes(item?.type) && (
                <Tag
                  bordered={false}
                  className="ml-2"
                  color={`${Number(item.cardExpYear) >= new Date().getFullYear() || item.status === 'ACTIVE'
                    ? "success"
                    : "error"
                    }`}
                >
                  {Number(item.cardExpYear) >= new Date().getFullYear() || item.status === 'ACTIVE'
                    ? "Valid"
                    : "Invalid"}
                </Tag>

              )}
            </button> */}
            <button className="text-sm font-medium dark:text-white">
              {item?.action}
            </button>

            <button
              title="Delete"
              onClick={() => {
                deleteItem(item);
              }}
              className="ml-2 text-lg text-gray-600 hover:text-red-600"            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>

      <CreateValidationFormCodePhoneUser
        item={item}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export { ListPayments };
