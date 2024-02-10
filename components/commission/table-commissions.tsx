import { GetInfiniteCommissionsAPI } from '@/api-site/commission';
import { ListCommissions } from '@/components/commission/list-commissions';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { EmptyData } from '@/components/ui-setting/ant/empty-data';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RiShakeHandsLine } from 'react-icons/ri';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks/use-input-state';
import { ErrorFile } from '../ui-setting/ant/error-file';

type Props = {
  organizationId: string;
};

const TableCommissions: React.FC<Props> = ({ organizationId }) => {
  const { search, handleSetSearch } = useInputState();
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommissionsAPI({
    organizationId,
    take: 10,
    sort: 'DESC',
    search,
    queryKey: ['commissions', 'infinite'],
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

  const dataTableCommissions = isLoadingGallery ? (
    <LoadingFile />
  ) : isErrorGallery ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<RiShakeHandsLine className="size-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommissions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-2 sm:mt-0">
              <ButtonInput
                type="button"
                className="w-full"
                size="sm"
                variant="info"
                onClick={() => router.push(`${`/commissions/create`}`)}
                icon={<PlusIcon className="mr-2 size-4" />}
              >
                Create Commission
              </ButtonInput>
            </div>
            <div className="mt-2 sm:mt-0">
              <SearchInput
                placeholder="Search by title"
                onChange={handleSetSearch}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">{dataTableCommissions}</div>
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
    </>
  );
};
export { TableCommissions };
