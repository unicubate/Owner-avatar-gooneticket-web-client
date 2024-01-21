/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { ButtonInput } from '../ui-setting/button-input';
import { useInView } from 'react-intersection-observer';
import ListPublicShop from './list-public-shop';
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ButtonLoadMore } from '../ui-setting';

type Props = {
  organizationId: string;
};

const PublicShop: React.FC<Props> = ({ organizationId }) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    take: 10,
    sort: 'DESC',
    organizationId,
    status: 'ACTIVE',
    queryKey: ['products', 'infinite'],
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

  const dataTableProducts = isLoadingPosts ? (
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
      .map((item, index) => <ListPublicShop item={item} key={index} />)
  );

  return (
    <>
      {dataTableProducts}

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

export default PublicShop;
