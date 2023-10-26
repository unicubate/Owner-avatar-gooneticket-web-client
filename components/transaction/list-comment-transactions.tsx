/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { Skeleton } from "antd";
import { CommentModel } from "@/types/comment";
import { GetInfiniteTransactionsAPI } from "@/api-site/transaction";
import { AvatarCoffeeComponent, AvatarComponent } from "../ui";
import Link from "next/link";
import { formateFromNow } from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { GetInfiniteCommentsAPI } from "@/api-site/comment";

const ListCommentTransactions: React.FC<{
  model?: string;
  organizationId?: string;
}> = ({ model, organizationId }) => {
  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: 6,
    sort: "DESC",
    modelIds: ["DONATION"],
    organizationId,
  });

  const dataTableTransactions = isLoadingComments ? (
    <Skeleton
      className="py-4"
      loading={isLoadingComments}
      avatar
      paragraph={{ rows: 1 }}
    />
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages.map((page, index) => (
      <Fragment key={index}>
        {page?.data?.value.map((item: CommentModel, index: number) => (
          <li key={index} className="py-4">
            <div className="flex items-start">
              {item?.profile?.username ? (
                <AvatarComponent size={50} profile={item?.profile} />
              ) : (
                <AvatarCoffeeComponent size={50} color={item?.color} />
              )}

              <div className="ml-3">
                <div className="flex items-center space-x-px">
                  <div className="flex items-center">
                    {item?.profile?.username ? (
                      <Link
                        href={`/${item?.profile?.username}`}
                        className="text-sm font-bold text-gray-900"
                      >
                        {item?.profile?.firstName} {item?.profile?.lastName}
                      </Link>
                    ) : (
                      <span className="text-sm font-bold text-gray-900">
                        {item?.fullName}
                      </span>
                    )}

                    <p className="ml-3.5 text-sm font-normal text-gray-500">
                      {formateFromNow(item?.createdAt as Date)}
                    </p>
                  </div>
                </div>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  <HtmlParser html={String(item?.description ?? "")} />
                </p>
              </div>
            </div>
          </li>
        ))}
      </Fragment>
    ))
  );

  return (
    <>
      <div className="flex items-center">
        <p className="text-lg font-bold">Supporters</p>
      </div>

      <ul className="mt-4 divide-y divide-gray-200 my-2">
        {dataTableTransactions}
      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-4 flex flex-col justify-between items-center">
            {isFetchingNextPage ? null : (
              <button
                disabled={isFetchingNextPage ? true : false}
                onClick={() => fetchNextPage()}
                className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
              >
                View more
              </button>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export { ListCommentTransactions };
