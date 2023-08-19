/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Button, Image, Tooltip } from "antd";
import { PostModel } from "@/types/post";
import Link from "next/link";
import { ButtonInput } from "../templates/button-input";
import { TextAreaInput } from "../util/form";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePathname } from "next/navigation";
import { arrayComments } from "../mock";
import { BiComment } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdEdit,
  MdEditNote,
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineModeEdit,
} from "react-icons/md";
import { CommentModel } from "@/types/comment";
import { DeleteOneCommentAPI } from "@/api/comment";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";

type Props = {
  item?: CommentModel;
  index?: number;
};

const schema = yup.object({
  description: yup.string().required(),
});

const ListCommentsRepliesPosts: React.FC<Props> = ({ item, index }) => {
  const [comments] = useState(arrayComments);
  const pathname = usePathname();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const saveMutation = DeleteOneCommentAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes, Deleted",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#573DDB",
      cancelButtonColor: "#BEC1C5",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation.mutateAsync({ commentId: item?.id });
          AlertSuccessNotification({
            text: "Comment deleted successfully",
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
      <div className="flex items-start mt-4">
        <Avatar
          size={40}
          className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
          src={item?.profile?.image}
          alt={`${item?.profile?.firstName} ${item?.profile?.lastName}`}
        />

        <div className="ml-6">
          <div className="flex items-center space-x-px">
            <div className="flex items-center">
              <p className="text-sm font-bold text-gray-900">
                {" "}
                {item?.profile?.firstName} {item?.profile?.lastName}{" "}
              </p>
              <p className="ml-3.5 text-sm font-normal text-gray-500">
                {" "}
                {/* {item?.createdAt} */}
              </p>
            </div>
          </div>
          <p className="mt-2 text-base font-normal leading-7 text-gray-900">
            {" "}
            {item?.description}{" "}
          </p>

          <div className="flex mt-2 items-center">
            {/* <button className="font-bold text-red-400">
                <MdFavorite />
              </button> */}
            <button className="font-bold">
              <MdFavoriteBorder />
            </button>
            <button className="ml-3.5 font-bold">
              <BiComment />
            </button>
            <button className="ml-3.5 text-sm">Reply</button>
            <button className="ml-3.5 font-bold">
              <MdOutlineModeEdit />
            </button>
            <button
              onClick={() => deleteItem(item)}
              className="ml-3.5 font-bold text-red-600"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>

      <form action="#" method="POST">
        <div className="mt-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end">
          <div className="flex items-start">
            <Avatar
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
              src="https://picsum.photos/seed/NLHCIy/640/480"
              alt=""
            />
          </div>
          <TextAreaInput
            row={1}
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
          />

          <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <ButtonInput
              shape="default"
              type="submit"
              size="large"
              loading={false}
              color={"indigo"}
            >
              Save
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
};

export default ListCommentsRepliesPosts;
