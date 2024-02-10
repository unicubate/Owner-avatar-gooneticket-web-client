/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteCommentsAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import { ModelType } from '@/utils/pagination-item';
import { Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListCommentTransactions } from '../comment/list-comments-transactions';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';

const RecentCommentTransactions: React.FC<{
  userReceiveId: string;
  modelIds: ModelType[];
  model: ModelType;
  organizationId: string;
}> = ({ modelIds, userReceiveId, organizationId, model }) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsAPI({
    take: 10,
    sort: 'DESC',
    modelIds: ['DONATION'],
    userReceiveId,
    organizationId,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTableTransactions = isLoadingComments ? (
    <Skeleton
      className="py-4"
      loading={isLoadingComments}
      avatar
      paragraph={{ rows: 1 }}
    />
  ) : isErrorComments ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ''
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
          organizationId={item?.organizationId}
        />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden bg-white shadow-xl dark:bg-[#121212]">
        <div className="p-6 sm:p-4">
          <div className="flex items-center">
            <p className="text-lg font-bold">Supporters</p>
          </div>

          <ul className="my-2 mt-4 divide-y divide-gray-200 dark:divide-gray-800">
            {dataTableTransactions}
          </ul>
        </div>
      </div>

      {hasNextPage ? (
        <>
          <div className="mx-auto mt-2 justify-center text-center">
            <ButtonLoadMore
              ref={ref}
              isFetchingNextPage={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export { RecentCommentTransactions };
