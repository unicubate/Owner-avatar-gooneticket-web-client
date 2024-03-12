/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteMembershipsAPI } from '@/api-site/membership';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListPublicMemberships } from './list-public-memberships';

type Props = {
  organizationId: string;
};

export const PublicMemberships = ({ organizationId }: Props) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteMembershipsAPI({
    take: 10,
    sort: 'DESC',
    organizationId,
    status: 'ACTIVE',
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

  const dataTableMemberships = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => <ListPublicMemberships item={item} key={index} />)
  );

  return (
    <>
      {dataTableMemberships}

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
