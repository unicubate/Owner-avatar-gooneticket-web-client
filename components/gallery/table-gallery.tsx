/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfinitePostsAPI } from '@/api-site/post';
import ListGallery from '@/components/gallery/list-gallery';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { EmptyData } from '@/components/ui-setting/ant/empty-data';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { UserVisitorModel } from '@/types/user.type';
import { queyParamsFunc } from '@/utils/generate-random';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiImage } from 'react-icons/bi';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks/use-input-state';
import { SearchInput } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';

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
      image={<BiImage className="size-10" />}
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
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="sm"
                    variant="info"
                    onClick={() =>
                      push(
                        `/posts/create?${queyParamsFunc({
                          type: 'gallery',
                          albumId,
                        })}`,
                      )
                    }
                    icon={<PlusIcon className="mr-2 size-4" />}
                  >
                    Add Image
                  </ButtonInput>
                </div>
                <div className="relative">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="sm"
                    variant="info"
                    onClick={() =>
                      push(`/posts/create?${queyParamsFunc({ type: 'album' })}`)
                    }
                    icon={<PlusIcon className="mr-2 size-4" />}
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
        <div className="mx-auto mt-4 justify-center text-center">
          <ButtonLoadMore
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};

export { TableGallery };
