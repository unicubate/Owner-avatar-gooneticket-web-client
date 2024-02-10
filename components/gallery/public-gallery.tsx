/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfinitePostsAPI } from '@/api-site/post';
import { UserVisitorModel } from '@/types/user.type';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListPublicGallery } from './list-public-gallery';

type Props = {
  userVisitor: UserVisitorModel;
};

const PublicGallery: React.FC<Props> = ({ userVisitor }) => {
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 10,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: ['GALLERY'],
    queryKey: ['gallery-posts', 'infinite'],
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

  const dataTablePosts = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <>
          <ListPublicGallery
            userVisitor={userVisitor}
            item={item}
            key={index}
          />
        </>
      ))
  );

  return (
    <>
      {dataTablePosts}

      <div className="mx-auto mt-4 justify-center text-center">
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

export { PublicGallery };
