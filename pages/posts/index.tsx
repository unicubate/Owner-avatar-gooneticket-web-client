import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { LoadingOutlined } from "@ant-design/icons";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { Spin } from "antd";
import { GetInfinitePostsAPI } from "@/api/post";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/util/session/context-user";
import { useEffect, useState } from "react";
import { EmptyData } from "@/components/templates/empty-data";
import ListPosts from "@/components/post/list-posts";
import { ButtonInput } from "@/components/templates/button-input";

const Posts = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    userId: userStorage?.id,
    take: 2,
    sort: "DESC",
    queryKey: ["posts", "infinite"],
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

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTablePosts = isLoadingGallery ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorGallery ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListPosts item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Posts"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Articles</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Post public post or make exclusive to you supporters or
                    members
                  </p>
                </div>
              </div>

              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <HorizontalNavCreatePost />

                <div className="mt-4 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                  <nav className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Publisher{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Drafter{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Scheduled{" "}
                    </a>
                  </nav>
                </div>


                <div className="flow-root">
                  <div className="mt-4 overflow-hidden bg-white border border-gray-200">
                    <div className="px-4 py-8">
                      <div className="divide-y divide-gray-200">

                        {dataTablePosts}

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
                          color={"indigo"}
                          minW="fit"
                        >
                          Load More
                        </ButtonInput>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Posts);
