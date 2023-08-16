/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { UseFormRegister } from "react-hook-form";
import { GalleryModel } from "@/types/gallery";
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
import { DeleteOneGalleryAPI, getOneFileGalleryAPI } from "@/api/gallery";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { ButtonInput } from "../templates/button-input";
import { FollowModel } from "@/types/follow";

type Props = {
  item?: FollowModel;
  index: number;
};

const ListFollowers: React.FC<Props> = ({ item, index }) => {
  // const [openModal, setOpenModal] = useState<boolean>(false)

  // const saveMutation = DeleteOneGalleryAPI({
  //     onSuccess: () => { },
  //     onError: (error?: any) => { },
  // });

  // const deleteItem = (item: any) => {

  //     Swal.fire({
  //         title: 'Delete?',
  //         text: 'Are you sure you want to delete this?',
  //         confirmButtonText: 'Yes, Deleted',
  //         cancelButtonText: 'No, Cancel',
  //         confirmButtonColor: '#573DDB',
  //         cancelButtonColor: '#BEC1C5',
  //         showCancelButton: true,
  //         reverseButtons: true,
  //     }).then(async (result) => {
  //         if (result.value) {
  //             //Envoyer la requet au serve
  //             try {
  //                 await saveMutation.mutateAsync({ galleryId: item?.id });
  //                 AlertSuccessNotification({
  //                     text: "Image deleted successfully",
  //                     className: "info",
  //                     gravity: "top",
  //                     position: "center",
  //                 });
  //             } catch (error: any) {
  //                 AlertDangerNotification({
  //                     text: `${error.response.data.message}`,
  //                     gravity: "top",
  //                     className: "info",
  //                     position: "center",
  //                 });
  //             }
  //         }
  //     });

  // }

  return (
    <>
      <Fragment key={index}>
        <hr className="mt-1 border-gray-200" />
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
                loading={false}
                color={"indigo"}
              >
                Following
              </ButtonInput>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ListFollowers;
