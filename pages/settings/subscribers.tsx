import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { Input, Skeleton } from 'antd';
import { ButtonInput } from '@/components/ui-setting/ant/button-input';
import { useEffect, useState } from 'react';
import { GetInfiniteFollowersAPI } from '@/api-site/follow';
import ListFollowers from '@/components/setting/list-followers';
import { useInView } from 'react-intersection-observer';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetStaticPropsContext } from 'next';
import { LoadingFile } from '@/components/ui-setting/ant';
import { useInputState } from '@/components/hooks/use-input-state';

const Subscribers = () => {
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
    data: dataFollowers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowersAPI({
    take: 10,
    sort: 'DESC',
    search,
  });

  const dataTableSubscribers = isLoadingFollowers ? (
    <LoadingFile />
  ) : isErrorFollowers ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataFollowers?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataFollowers?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowers item={item} key={index} index={index} />
      ))
  );

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <LayoutDashboard title={'Subscribers'}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
              <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">Subscribers</div>
                    <div className="mt-4 sm:mt-0">
                      <Input
                        placeholder="Search by email, name"
                        onChange={handleSetSearch}
                        className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableSubscribers}
                  </div>
                </div>

                {hasNextPage && (
                  <div className="mt-4 text-center justify-center mx-auto">
                    <div className="sm:mt-0">
                      <ButtonInput
                        ref={ref}
                        onClick={() => fetchNextPage()}
                        shape="default"
                        type="button"
                        size="large"
                        loading={isFetchingNextPage ? true : false}
                        color={'indigo'}
                        minW="fit"
                      >
                        Load More
                      </ButtonInput>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Subscribers);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
