import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavCreatePost } from '@/components/post/horizontal-nav-create-post';
import { useAuth } from '@/components/util/context-user';
import { ButtonInput, EmptyData, LoadingFile } from '@/components/ui';
import { ListPosts } from '@/components/post/list-posts';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostModel } from '@/types/post';
import { BiDetail } from 'react-icons/bi';
import { ErrorFile } from '@/components/ui/error-file';
import { GetStaticPropsContext } from 'next';
import { Input } from 'antd';
import { useInputState } from '@/components/hooks/use-input-state';

const Posts = () => {
  const { userStorage: user } = useAuth() as any;
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    data: dataPost,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    userVisitor: {
      id: user?.id,
      organizationId: user?.organizationId,
    },
    take: 10,
    sort: 'DESC',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    queryKey: ['posts', 'infinite'],
    search,
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
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

  const dataTablePosts = isLoadingPost ? (
    <LoadingFile />
  ) : isErrorPost ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataPost?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiDetail className="h-10 w-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataPost?.pages.map((page, index) => (
      <Fragment key={index}>
        {page?.data?.value.map((item: PostModel, index: number) => (
          <ListPosts item={item} key={index} index={index} />
        ))}
      </Fragment>
    ))
  );
  return (
    <>
      <LayoutDashboard title={'Posts'}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
            <HorizontalNavCreatePost />

            <div
              className={`mt-8 px-3 py-2 bg-white dark:bg-[#121212]  border border-gray-200 dark:border-gray-800 rounded-lg`}
            >
              <nav className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                >
                  {' '}
                  Publisher{' '}
                </a>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                >
                  {' '}
                  Drafter{' '}
                </a>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                >
                  {' '}
                  Scheduled{' '}
                </a>
              </nav>
            </div>

            <div className="flow-root">
              <div
                className={`mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg`}
              >
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      <p className="text-lg font-bold">Posts</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Input
                        placeholder="Search by email, name"
                        onChange={handleSetSearch}
                        className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTablePosts}
                  </div>
                </div>
              </div>

              {hasNextPage && (
                <div className="mt-4 text-center justify-center mx-auto">
                  <div className="mt-4 sm:mt-0">
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
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Posts);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
