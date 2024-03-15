/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostModel } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { itemsNumberArray } from '@/utils/utils';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Skeleton } from '../ui/skeleton';
import { ListLastPosts } from './list-last-posts';

export const PublicLastPosts = (props: { userVisitor: UserVisitorModel }) => {
  const { userVisitor } = props;
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 4,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
  });

  const dataTablePosts = isLoadingPosts ? (
    <>
      {itemsNumberArray(4).map((i, index) => (
        <li key={index} className="flex py-2 items-center space-x-2">
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
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
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
