/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteCommentsAPI } from '@/api-site/comment';
import { ModelType } from '@/utils/paginations';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreateOrUpdateFormComment } from './create-or-update-form-comment';
import { ListCommentsPosts } from './list-comments-posts';

type Props = {
  take: number;
  model: ModelType;
  organizationId: string;
  modelIds: ModelType[];
  postId?: string;
  productId?: string;
  userVisitorId: string;
};

export function ListComments(props: Props) {
  const {
    take,
    model,
    modelIds,
    organizationId,
    postId,
    productId,
    userVisitorId,
  } = props;

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
    <ErrorFile title="404" description="Error find data please try again" />
  ) : Number(dataComments?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsPosts
          item={item}
          key={index}
          model={model}
          index={index}
          organizationId={item?.organizationId}
          userVisitorId={userVisitorId}
          modelIds={modelIds}
        />
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
}
