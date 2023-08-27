/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Skeleton } from "antd";
import { ButtonInput } from "../templates/button-input";
import { GetInfiniteCommentsAPI } from "@/api/comment";

import { useAuth } from "../util/session/context-user";
import { PlusOutlined } from "@ant-design/icons";
import {
  MdDeleteOutline,
  MdOutlineIosShare,
  MdOutlineModeEdit,
} from "react-icons/md";
import { CreateOrUpdateDiscount } from "./create-or-update-discount";
import { formateDMYHH } from "@/utils";

const ListDiscounts: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div key={index} className="py-5">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-bold text-gray-900">
              {item?.percent}% Off Commissions
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              {item?.code}
            </p>
          </div>

          <div className="ml-auto">
            <p className="mt-1 text-sm font-medium text-gray-500">
              {item?.isExpired
                ? `Ends Midnight ${formateDMYHH(item?.expiredAt)}`
                : `Never Expires `}
            </p>
          </div>

          <div className="ml-auto">
            <button
              title="Copy"
              className="text-lg ml-2 font-bold text-gray-600 transition-all duration-200 hover:text-gray-900"
            >
              <MdOutlineIosShare />
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

export default ListDiscounts;
