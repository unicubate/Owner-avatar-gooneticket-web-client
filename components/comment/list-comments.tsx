/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { formateDateDayjs } from "../../utils/formate-date-dayjs";
import Swal from "sweetalert2";
import { Avatar, Button, Image, Skeleton, Spin, Tooltip } from "antd";
import { ButtonInput } from "../templates/button-input";
import * as yup from "yup";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListCommentsPosts from "./list-comments-posts";
import { getCommentsAPI } from "@/api/comment";
import { CreateOrUpdateFormComment } from "./create-or-update-form-comment";

const schema = yup.object({
  description: yup.string().required(),
});

const ListComments: React.FC<{ postId: string }> = ({ postId }) => {
  const fetchData = async (pageParam: number) =>
    await getCommentsAPI({
      take: 2,
      page: pageParam,
      sort: "DESC",
      postId: postId,
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
    queryKey: ["comments", postId],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    keepPreviousData: true,
  });

  const dataTableComments = isLoadingComments ? (
    ""
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    <Skeleton loading={isLoadingComments} avatar paragraph={{ rows: 1 }} />
  ) : (
    dataComments.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsPosts item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <ul className="mt-4 divide-y divide-gray-200 -my-9">

        {dataTableComments}
        
      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-6 flex flex-col justify-between items-center">
            <ButtonInput
              onClick={() => fetchNextPage()}
              shape="default"
              type="button"
              size="medium"
              loading={isFetchingNextPage ? true : false}
              color={"indigo"}
              minW="fit"
            >
              Load More
            </ButtonInput>
          </div>
        </>
      ) : null}

      <CreateOrUpdateFormComment postId={postId} />
    </>
  );
};

export default ListComments;
