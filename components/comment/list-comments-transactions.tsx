/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { CommentModel } from "@/types/comment";
import { AvatarCoffeeComponent, AvatarComponent } from "../ui";
import Link from "next/link";
import { formateFromNow } from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { BsReplyAll } from "react-icons/bs";
import { CreateOrUpdateFormCommentReply } from "../comment/create-or-update-form-comment-reply";
import { GetInfiniteCommentsRepliesAPI } from "@/api-site/comment";
import { Skeleton } from "antd";
import { ModelType } from "@/utils/pagination-item";
import { ListCommentsRepliesTransactions } from "./list-comments-replies-transactions";
import { useAuth } from "../util/context-user";
import { ErrorFile } from "../ui/error-file";
import { useRouter } from "next/router";

const ListCommentTransactions: React.FC<{
  item: CommentModel;
  model: ModelType;
  modelIds: ModelType[];
  index: number;
  userReceiveId?: string;
}> = ({ model, modelIds, item, userReceiveId, index }) => {
  const { locale } = useRouter();
  const { userStorage: userVisiter } = useAuth() as any;
  const [openModalReply, setOpenModalReply] = useState(false);

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsRepliesAPI({
    take: 3,
    sort: "DESC",
    modelIds: modelIds,
    commentId: String(item?.id),
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    <Skeleton loading={isLoadingComments} avatar paragraph={{ rows: 1 }} />
  ) : isErrorComments ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsRepliesTransactions
          model={model}
          item={item}
          key={index}
          index={index}
          userReceiveId={String(userReceiveId)}
        />
      ))
  );
  return (
    <>
      <li key={index} className="py-4">
        <div className="flex items-start">
          {item?.profile?.username ? (
            <AvatarComponent size={45} profile={item?.profile} />
          ) : (
            <AvatarCoffeeComponent
              size={45}
              color={item?.profile?.color ?? "indigo"}
            />
          )}

          <div className="ml-3">
            <div className="flex items-center space-x-px">
              <div className="flex items-center">
                {item?.profile?.username ? (
                  <Link
                    href={`/${item?.profile?.username}`}
                    className="text-sm font-bold text-black dark:text-white"
                  >
                    {item?.profile?.firstName} {item?.profile?.lastName}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-black dark:text-white">
                    {item?.fullName}
                  </span>
                )}

                <p className="ml-3.5 text-sm font-normal text-gray-500">
                  {formateFromNow(item?.createdAt as Date, locale as string)}
                </p>
              </div>
            </div>
            <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
              <HtmlParser html={String(item?.description ?? "")} />
            </p>

            <div className="flex items-center font-medium text-gray-600">
              {/* Replies comments */}
              {!openModalReply && userVisiter?.id === item?.userReceiveId ? (
                <>
                  <button
                    onClick={() => {
                      setOpenModalReply((lk) => !lk);
                    }}
                    className="ml-3.5 text-2xl hover:text-green-400 focus:ring-green-400"
                  >
                    <BsReplyAll />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Replies comments */}
        <div className="ml-16">
          {openModalReply ? (
            <CreateOrUpdateFormCommentReply
              model={model}
              parentId={String(item?.id)}
              openModalReply={openModalReply}
              setOpenModalReply={setOpenModalReply}
            />
          ) : null}

          {dataTableCommentsReplies}

          {hasNextPage ? (
            <>
              <div className="mt-6 flex flex-col justify-between items-center">
                {isFetchingNextPage ? null : (
                  <button
                    disabled={isFetchingNextPage ? true : false}
                    onClick={() => fetchNextPage()}
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                  >
                    View more response
                  </button>
                )}
              </div>
            </>
          ) : null}
        </div>
      </li>
    </>
  );
};

export { ListCommentTransactions };
