/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Button, Image, Skeleton, Tooltip } from "antd";
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
import { DeleteOneCommentAPI, getCommentsRepliesAPI } from "@/api/comment";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListCommentsRepliesPosts from "./list-comments-replies-posts";

type Props = {
  item?: CommentModel;
  index?: number;
};

const schema = yup.object({
  description: yup.string().required(),
});

const ListCommentsPosts: React.FC<Props> = ({ item, index }) => {
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

  const fetchData = async (pageParam: number) =>
    await getCommentsRepliesAPI({
      take: 2,
      page: pageParam,
      sort: "DESC",
      commentId: String(item?.id),
    });
  const {
    status,
    error,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments-replies", item?.id],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    keepPreviousData: true,
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    ""
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    <Skeleton loading={isLoadingComments} avatar paragraph={{ rows: 1 }} />
  ) : (
    dataComments.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsRepliesPosts item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <li key={index} className="py-4">
        <div className="flex items-start">
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
                  {/* {item?.createdAt} */}
                </p>
              </div>
            </div>
            <p className="mt-2 text-base font-normal leading-7 text-gray-900">
              {item?.description}
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

            {/* Replies comments */}

            {dataTableCommentsReplies}

          </div>
        </div>
      </li>
    </>
  );
};

export default ListCommentsPosts;
