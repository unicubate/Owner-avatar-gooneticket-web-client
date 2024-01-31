/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteCommentsAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import { ModelType } from '@/utils/pagination-item';
import React, { Fragment } from 'react';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreateOrUpdateFormComment } from './create-or-update-form-comment';
import ListCommentsPosts from './list-comments-posts';

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
  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: take,
    sort: 'DESC',
    modelIds,
    postId: postId ?? '',
    productId: productId ?? '',
    userVisitorId,
    organizationId,
  });

  const dataTableComments = isLoadingComments ? (
    <LoadingFile />
  ) : isErrorComments ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataComments?.pages.map((page, index) => (
      <Fragment key={index}>
        {page?.data?.value.map((item: CommentModel, index: number) => (
          <ListCommentsPosts
            item={item}
            key={index}
            model={model}
            index={index}
            organizationId={item?.organizationId}
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

      <ul className="my-2 mt-4 divide-y divide-gray-200 dark:divide-gray-800">
        {dataTableComments}
      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-4 flex flex-col items-center justify-between">
            {isFetchingNextPage ? null : (
              <button
                disabled={isFetchingNextPage ? true : false}
                onClick={() => fetchNextPage()}
                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
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

export { ListComments };
