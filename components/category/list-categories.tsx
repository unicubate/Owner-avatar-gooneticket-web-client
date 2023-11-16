/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { CreateOrUpdateCategory } from "./create-or-update-category";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from "@/utils";
import Swal from "sweetalert2";
import { DeleteOneCategoryAPI } from "@/api-site/category";
import { Tooltip } from "antd";
import { useRouter } from "next/router";

const ListCategories: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const { locale } = useRouter();
  const [showModal, setShowModal] = useState(false);

  const saveMutation = DeleteOneCategoryAPI({
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
          await saveMutation.mutateAsync({ categoryId: item?.id });
          AlertSuccessNotification({
            text: "Category deleted successfully",
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
          <p className="text-sm font-bold text-gray-900">{item?.name}</p>

          <div className="ml-auto">
            <p className="mt-1 text-sm font-medium text-gray-500">
              {formateDMYHH(item?.createdAt as Date, locale as string)}
            </p>
          </div>

          <div className="ml-auto">
            <Tooltip placement="bottomRight" title={"Edit"}>
              <button
                onClick={() => setShowModal(true)}
                title="Edit"
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

      {showModal ? (
        <CreateOrUpdateCategory
          showModal={showModal}
          setShowModal={setShowModal}
          category={item}
        />
      ) : null}
    </>
  );
};

export { ListCategories };
