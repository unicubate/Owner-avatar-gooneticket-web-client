'use client';

import { GetInfiniteFollowsPostsAPI } from '@/api-site/post';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ListFollowPosts } from '@/components/post/list-follow-posts';
import { PostSkeleton } from '@/components/skeleton/post-skeleton';
import { ButtonLoadMore } from '@/components/ui-setting';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { itemsNumberArray } from '@/utils/utils';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { ref, inView } = useInView();
  const { userStorage: userVisiter } = useAuth() as any;
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowsPostsAPI({
    take: 10,
    sort: 'DESC',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTablePosts = isLoadingPosts ? (
    itemsNumberArray(4).map((i, index) => <PostSkeleton index={index} />)
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : Number(dataPosts?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowPosts
          item={item}
          key={index}
          commentTake={2}
          userVisitor={{
            id: userVisiter?.id,
            organizationId: userVisiter?.organizationId,
          }}
        />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Home'}>
        <div className="mx-auto max-w-3xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {dataTablePosts}

            {/* <FloatButton onClick={() => console.log('onClick')} /> */}
            <div className="mx-auto my-4 mt-2 justify-center py-2 text-center">
              {hasNextPage && (
                <ButtonLoadMore
                  ref={ref}
                  isFetchingNextPage={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                />
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Home);
