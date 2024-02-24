/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfinitePostsAPI } from '@/api-site/post';
import { PostType } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import React from 'react';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { LoadingFile } from '../ui-setting/ant/loading-file';
import { ListFollowPosts } from './list-follow-posts';

type Props = {
  userVisitor: UserVisitorModel;
  typeIds: PostType[];
};

const PublicPosts: React.FC<Props> = ({ userVisitor, typeIds }) => {
  // const { ref, inView } = useInView();

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 20,
    sort: 'DESC',
    userVisitor,
    status: 'ACTIVE',
    typeIds: typeIds, //['ARTICLE', 'AUDIO', 'VIDEO'],
  });

  // useEffect(() => {
  //   let fetching = false;
  //   if (inView && hasNextPage) {
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

  //   document.addEventListener("scroll", onScroll);
  //   return () => {
  //     document.removeEventListener("scroll", onScroll);
  //   };
  // }, [fetchNextPage, hasNextPage, inView]);

  const dataTablePosts = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowPosts
          item={item}
          key={index}
          commentTake={2}
          userVisitor={userVisitor}
        />
      ))
  );

  return (
    <>
      {dataTablePosts}

      <div className="mx-auto my-4 mt-6 justify-center text-center">
        {hasNextPage && (
          <ButtonLoadMore
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
};

export { PublicPosts };
