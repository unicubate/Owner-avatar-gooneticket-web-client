/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonInput } from '@/components/ui-setting/ant/button-input';
import { useEffect, useState } from 'react';
import { EmptyData } from '@/components/ui-setting/ant/empty-data';
import ListGallery from '@/components/gallery/list-gallery';
import { GetInfinitePostsAPI } from '@/api-site/post';
import { useInView } from 'react-intersection-observer';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useRouter } from 'next/router';
import { UserVisitorModel } from '@/types/user.type';
import { BiImage } from 'react-icons/bi';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { queyParamsFunc } from '@/utils/generate-random';
import { useInputState } from '../hooks/use-input-state';
import { SearchInput } from '../ui-setting/ant/search-input';

type Props = {
  albumId?: string;
  userVisitor: UserVisitorModel;
};

const TableGallery: React.FC<Props> = ({ userVisitor, albumId }) => {
  const { push, back } = useRouter();
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    search,
    albumId,
    userVisitor,
    take: 10,
    sort: 'DESC',
    typeIds: ['GALLERY'],
    queryKey: ['posts', 'infinite'],
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

  const dataTableGallery = isLoadingGallery ? (
    <LoadingFile />
  ) : isErrorGallery ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiImage className="h-10 w-10" />}
      title="Add your first file gallery"
      description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListGallery item={item} key={index} index={index} />
      ))
  );
  return (
    <>
      <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ButtonInput
                    minW="fit"
                    shape="default"
                    type="button"
                    size="normal"
                    loading={false}
                    color="indigo"
                    onClick={() =>
                      push(
                        `/posts/create?${queyParamsFunc({
                          type: 'gallery',
                          albumId,
                        })}`,
                      )
                    }
                  >
                    Add Image
                  </ButtonInput>
                </div>
                <div className="relative">
                  <ButtonInput
                    status="cancel"
                    type="button"
                    shape="default"
                    size="normal"
                    loading={false}
                    onClick={() =>
                      push(`/posts/create?${queyParamsFunc({ type: 'album' })}`)
                    }
                  >
                    New Album
                  </ButtonInput>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <SearchInput
                placeholder="Search by title"
                onChange={handleSetSearch}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {dataTableGallery}
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
    </>
  );
};

export { TableGallery };
