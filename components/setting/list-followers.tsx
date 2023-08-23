/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { UseFormRegister } from "react-hook-form";
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
import { ButtonInput } from "../templates/button-input";
import { FollowModel } from "@/types/follow";
import { CreateOrDeleteOneFollowerAPI } from "@/api/follow";

type Props = {
  item?: FollowModel;
  index: number;
};

const ListFollowers: React.FC<Props> = ({ item, index }) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  // Create or Update data
  const saveMutation = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followingItem = async (item: any) => {

    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        followerId: item?.profile?.userId,
        action: 'CREATE'
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Followed successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }

  }

  return (
    <>
      <Fragment key={index}>
        <hr className="mt-4 border-gray-200" />
        <div className="py-5">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 cursor-pointer">
              <Avatar size="large" src={item?.profile?.image} alt={item?.profile?.firstName} />
            </div>

            <div className="flex-1 min-w-0 ml-4 cursor-pointer">
              <p className="text-sm font-bold text-gray-900">{item?.profile?.firstName} {item?.profile?.lastName}</p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {item?.profile?.username}
              </p>
            </div>

            <div className="flex items-center justify-end ml-auto space-x-8">
              <ButtonInput
                shape="default"
                type="submit"
                size="normal"
                loading={loading}
                color={"indigo"}
                onClick={() => followingItem(item)}
              >
                Follow back
              </ButtonInput>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ListFollowers;
