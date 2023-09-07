/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Button, Image, Spin } from "antd";
import { GetInfinitePostsAPI } from "@/api/post";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ButtonInput } from "../templates/button-input";
import { useInView } from "react-intersection-observer";
import ListPublicShop from "./list-public-shop";

type Props = {
  userId: string;
};

const PublicShop: React.FC<Props> = ({ userId }) => {
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
    sort: "DESC",
    userId: userId,
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    queryKey: ['posts', "infinite"]
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

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableProducts = isLoadingPosts ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorPosts ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPosts.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListPublicShop item={item} key={index} commentTake={2} />
      ))
  );

  return (
    <>
      {dataTableProducts}

      <div className="mt-6 text-center justify-center mx-auto">
        {hasNextPage && (
          <div className="sm:mt-0">
            <ButtonInput
              ref={ref}
              onClick={() => fetchNextPage()}
              shape="default"
              type="button"
              size="large"
              loading={isFetchingNextPage ? true : false}
              color={"indigo"}
              minW="fit"
            >
              Load More
            </ButtonInput>
          </div>
        )}
      </div>
    </>
  );
};

export default PublicShop;
