/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostModel } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { itemsNumberArray } from '@/utils/utils';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Skeleton } from '../ui/skeleton';
import { ListLastPosts } from './list-last-posts';

export const PublicLastPosts = ({
  userVisitor,
}: {
  userVisitor: UserVisitorModel;
}) => {
  const takeNumber = 4;
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: takeNumber,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO', 'GALLERY'],
  });

  const dataTablePosts = isLoadingPosts ? (
    <>
      {itemsNumberArray(takeNumber).map((i, index) => (
        <li key={index} className="flex items-center space-x-2 py-2">
          <Skeleton className="size-16 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </li>
      ))}
    </>
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataPosts?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    <>
      <div className="mt-8 flow-root">
        <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
          {dataPosts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: PostModel, index) => (
              <ListLastPosts item={item} key={index} />
            ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        {userVisitor?.organizationId && (
          <h3 className="font-bold dark:text-white">Latest Posts</h3>
        )}
        {dataTablePosts}
      </div>
    </>
  );
};
