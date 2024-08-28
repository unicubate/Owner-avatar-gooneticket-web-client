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
  eventId?: string;
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
    eventId,
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
    eventId,
    postId,
    productId,
    userVisitorId,
    organizationId,
  });

  return (
    <>
      <CreateOrUpdateFormComment
        postId={postId}
        organizationId={organizationId}
        productId={productId}
        eventId={eventId}
        model={model}
      />

      <ul className="my-2 mt-4 divide-y divide-gray-200 dark:divide-gray-800">
        {isLoadingComments ? (
          <LoadingFile />
        ) : isErrorComments ? (
          <ErrorFile
            title="404"
            description="Error find data please try again"
          />
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
        )}
      </ul>

      {hasNextPage ? (
        <>
          <div className="mt-4 flex flex-col items-center justify-between">
            {isFetchingNextPage ? null : (
              <button
                disabled={!hasNextPage || isFetchingNextPage ? true : false}
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
