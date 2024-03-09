/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteCommissionsAPI } from '@/api-site/commission';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListPublicCommissions } from './list-public-commissions';

type Props = {
  organizationId: string;
};

export function PublicCommissions(props: Props) {
  const { organizationId } = props;
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommissionsAPI({
    take: 10,
    sort: 'DESC',
    organizationId,
    status: 'ACTIVE',
    queryKey: ['commissions', 'infinite'],
  });

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

  const dataTableCommissions = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => <ListPublicCommissions item={item} key={index} />)
  );

  return (
    <>
      {dataTableCommissions}

      <div className="mx-auto mt-6 justify-center text-center">
        {hasNextPage && (
          <ButtonLoadMore
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
}
