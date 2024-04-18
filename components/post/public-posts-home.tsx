import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostType } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { itemsNumberArray } from '@/utils/utils';
import { MenuSquareIcon } from 'lucide-react';
import { PostSkeleton } from '../skeleton/post-skeleton';
import { ButtonLoadMore } from '../ui-setting';
import { EmptyData } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListFollowPosts } from './list-follow-posts';

type Props = {
  userVisitor: UserVisitorModel;
  typeIds: PostType[];
};

const PublicPostsHome = ({ typeIds, userVisitor }: Props) => {
  const numberTake = 3;
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: numberTake,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: typeIds,
  });

  const dataTablePosts = isLoadingPosts ? (
    itemsNumberArray(numberTake).map((i, index) => (
      <PostSkeleton index={index} />
    ))
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : Number(dataPosts?.pages[0]?.data?.total) <= 0 ? (
    <div className="mt-4 overflow-hidden rounded-lg bg-white py-4 dark:bg-[#121212]">
      <EmptyData
        image={<MenuSquareIcon className="size-10" />}
        title="This creator hasn't published anything yet!"
        description={`When he does, his publications will appear here first.`}
      />
    </div>
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowPosts
          item={item}
          key={index}
          commentTake={2}
          userVisitor={userVisitor}
        />
      ))
  );

  return (
    <>
      {dataTablePosts}

      <div className="mx-auto my-4 mt-2 justify-center text-center">
        {hasNextPage && (
          <ButtonLoadMore
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
};
export { PublicPostsHome };
