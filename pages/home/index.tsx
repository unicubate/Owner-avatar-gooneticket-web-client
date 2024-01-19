"use client"

import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui-setting/ant/button-input";
import { GetInfiniteFollowsPostsAPI } from "@/api-site/post";
import { ListFollowPosts } from "@/components/post/list-follow-posts";
import { LoadingFile } from "@/components/ui-setting/ant/loading-file";
import { useAuth } from "@/components/util/context-user";
import { ErrorFile } from "@/components/ui-setting/ant/error-file";
import { useInView } from "react-intersection-observer";
import { Suspense, useEffect } from "react";
import { GetStaticPropsContext } from "next";
import { FloatButton } from "antd";

const Home = () => {
  const { ref, inView } = useInView();
  const { userStorage: userVisiter } = useAuth() as any;
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowsPostsAPI({
    take: 10,
    sort: "DESC",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTablePosts = isLoadingPosts ? (
    <LoadingFile />
  ) : isErrorPosts ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPosts?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowPosts
          item={item}
          key={index}
          commentTake={2}
          userVisitor={{
            id: userVisiter?.id,
            organizationId: userVisiter?.organizationId,
          }}
        />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Home"}>
        <div className="max-w-3xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

          {dataTablePosts}

          <FloatButton onClick={() => console.log('onClick')} />
            {hasNextPage && (
              <div className="mt-2 py-2 text-center justify-center mx-auto">
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
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Home);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}