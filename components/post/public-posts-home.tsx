import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostType } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ButtonInput } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListFollowPosts } from './list-follow-posts';

type Props = {
  userVisitor: UserVisitorModel;
  typeIds: PostType[];
};

const PublicPostsHome: React.FC<Props> = ({ userVisitor, typeIds }) => {
  const { push } = useRouter();
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 2,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: typeIds,
  });

  const dataTablePosts = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ''
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
          <ButtonInput
            type="button"
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => push(`${userVisitor.username}/posts`)}
          >
            View all posts
          </ButtonInput>
        )}
      </div>
    </>
  );
};

export { PublicPostsHome };
