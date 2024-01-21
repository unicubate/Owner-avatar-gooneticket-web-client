'use client';

import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { GetInfiniteFollowsPostsAPI } from '@/api-site/post';
import { ListFollowPosts } from '@/components/post/list-follow-posts';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useInView } from 'react-intersection-observer';
import { Suspense, useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { FloatButton } from 'antd';
import { ButtonLoadMore } from '@/components/ui-setting';

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
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
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

            <FloatButton onClick={() => console.log('onClick')} />
            {hasNextPage && (
              <div className="mx-auto mt-2 justify-center py-2 text-center">
                <ButtonLoadMore
                  ref={ref}
                  isFetchingNextPage={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                />
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Home);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
