/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListPublicCommissions } from './list-public-commissions';

type Props = {
  organizationId: string;
};

const PublicCommissions = ({ organizationId }: Props) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    data: dataProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    take: 10,
    sort: 'DESC',
    organizationId,
    status: 'ACTIVE',
    enableVisibility: 'TRUE',
    modelIds: ['COMMISSION'],
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

  const dataTableCommissions = isLoadingProducts ? (
    <LoadingFile />
  ) : isErrorProducts ? (
    <strong>Error find data please try again...</strong>
  ) : dataProducts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataProducts?.pages
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
};
export { PublicCommissions };
