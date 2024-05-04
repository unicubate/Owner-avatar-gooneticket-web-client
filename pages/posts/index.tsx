import { GetInfinitePostsAPI } from '@/api-site/post';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ListPosts } from '@/components/post/list-posts';
import { ButtonLoadMore } from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { PostModel } from '@/types/post';
import { MenuSquareIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SearchInput } from '../../components/ui-setting/search-input';

const Posts = () => {
  const { search, handleSetSearch, userStorage: user } = useInputState();
  const { ref, inView } = useInView();

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
    take: 6,
    sort: 'DESC',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    search,
  });

  // useEffect(() => {
  //   let fetching = false;
  //   if (inView) {
  //     fetchNextPage();
  //   }
  //   const onScroll = async (event: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener('scroll', onScroll);
  //   return () => {
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, [fetchNextPage, hasNextPage, inView]);

  const dataTablePosts = isLoadingPost ? (
    <LoadingFile />
  ) : isErrorPost ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataPost?.pages[0]?.data?.total) <= 0 ? (
    <EmptyData
      image={<MenuSquareIcon className="size-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataPost?.pages
      .flatMap((page: any) => page?.data?.value)
      .map(
        (item: PostModel, index: number) =>
          user?.organizationId && (
            <ListPosts item={item} key={index} index={index} />
          ),
      )
  );
  return (
    <>
      <LayoutDashboard title={'Posts'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* <div
              className={`mt-8 rounded-lg border border-gray-200 bg-white  px-3 py-2 dark:border-gray-800 dark:bg-[#121212]`}
            >
              <nav className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="group inline-flex items-center whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  {' '}
                  Publisher{' '}
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  {' '}
                  Drafter{' '}
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                >
                  {' '}
                  Scheduled{' '}
                </a>
              </nav>
            </div> */}

            <div className="flow-root">
              <div
                className={`mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]`}
              >
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      <p className="text-lg font-bold">Posts</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <SearchInput
                        placeholder="Search by title"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTablePosts}
                  </div>
                </div>
              </div>

              {hasNextPage && (
                <div className="mx-auto mt-4 justify-center text-center">
                  <ButtonLoadMore
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
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
