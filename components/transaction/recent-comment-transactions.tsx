/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Skeleton } from "antd";
import { CommentModel } from "@/types/comment";
import { GetInfiniteCommentsAPI } from "@/api-site/comment";
import { ListCommentTransactions } from "../comment/list-comments-transactions";
import { ModelType } from "@/utils/pagination-item";
import { ButtonInput } from "../ui";
import { ErrorFile } from "../ui/error-file";

const RecentCommentTransactions: React.FC<{
  userReceiveId: string;
  modelIds: ModelType[];
  model: ModelType;
}> = ({  modelIds, userReceiveId, model }) => {
  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: 10,
    sort: "DESC",
    modelIds: ["DONATION"],
    userReceiveId,
  });

  const dataTableTransactions = isLoadingComments ? (
    <Skeleton
      className="py-4"
      loading={isLoadingComments}
      avatar
      paragraph={{ rows: 1 }}
    />
  ) : isErrorComments ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: CommentModel, index: number) => (
        <ListCommentTransactions
          item={item}
          key={index}
          index={index}
          model={model}
          modelIds={modelIds}
          userReceiveId={userReceiveId}
        />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden bg-white dark:bg-black shadow-xl shadow-gray-600/15">
        <div className="p-6 sm:py-4 sm:px-4">
          <div className="flex items-center">
            <p className="text-lg font-bold">Supporters</p>
          </div>

          <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800 my-2">
            {dataTableTransactions}
          </ul>
        </div>
      </div>

      {hasNextPage ? (
        <>
          <div className="mt-2 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                shape="default"
                type="button"
                size="large"
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage ? true : false}
                color="indigo"
                minW="fit"
              >
                Load More
              </ButtonInput>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export { RecentCommentTransactions };
