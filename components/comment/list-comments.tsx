/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import { Skeleton } from "antd";
import ListCommentsPosts from "./list-comments-posts";
import { GetInfiniteCommentsAPI } from "@/api-site/comment";
import { CreateOrUpdateFormComment } from "./create-or-update-form-comment";
import { CommentModel } from "@/types/comment";
import { ModelType } from "@/utils/pagination-item";
import { ErrorFile } from "../ui/error-file";
import { useInView } from "react-intersection-observer";

const ListComments: React.FC<{
  take: number;
  model: ModelType;
  organizationId: string;
  modelIds: ModelType[];
  postId?: string;
  productId?: string;
  userVisitorId: string;
}> = ({
  take,
  model,
  modelIds,
  organizationId,
  postId,
  productId,
  userVisitorId,
}) => {
    const { ref, inView } = useInView();
    const {
      isLoading: isLoadingComments,
      isError: isErrorComments,
      data: dataComments,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    } = GetInfiniteCommentsAPI({
      take: take,
      sort: "DESC",
      modelIds,
      postId: postId ?? "",
      productId: productId ?? "",
      userVisitorId,
    });

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage, hasNextPage]);

    const dataTableComments = isLoadingComments ? (
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
        description="Error find data please try again"
      />
    ) : dataComments?.pages[0]?.data?.total <= 0 ? (
      ""
    ) : (
      dataComments?.pages.map((page, index) => (
        <Fragment key={index}>
          {page?.data?.value.map((item: CommentModel, index: number) => (
            <ListCommentsPosts
              item={item}
              key={index}
              model={model}
              index={index}
              organizationId={organizationId}
              userVisitorId={userVisitorId}
              modelIds={modelIds}
            />
          ))}
        </Fragment>
      ))
    );

    return (
      <>
        <CreateOrUpdateFormComment
          postId={postId}
          organizationId={organizationId}
          productId={productId}
          model={model}
        />

        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800 my-2">
          {dataTableComments}
        </ul>

        {hasNextPage ? (
          <>
            <div className="mt-4 flex flex-col justify-between items-center">
              {isFetchingNextPage ? null : (
                <button
                  ref={ref}
                  disabled={isFetchingNextPage ? true : false}
                  onClick={() => fetchNextPage()}
                  className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                >
                  View more comments
                </button>
              )}
            </div>
          </>
        ) : null}
      </>
    );
  };

export default ListComments;
