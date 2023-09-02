import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Skeleton } from "antd";
import { useInView } from "react-intersection-observer";
import { ButtonInput } from "@/components/templates/button-input";
import { GetInfiniteFollowingsAPI } from "@/api/follow";
import ListFollowings from "../../components/setting/list-followings";
import { useEffect } from "react";

const Followings = () => {
  const { ref, inView } = useInView();
  const {
    isLoading: isLoadingFollowings,
    isError: isErrorFollowings,
    data: dataFollowings,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowingsAPI({
    take: 10,
    sort: "DESC",
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

  const dataTableFollowings = isLoadingFollowings ? (
    <Skeleton loading={isLoadingFollowings} avatar paragraph={{ rows: 1 }} />
  ) : isErrorFollowings ? (
    <strong>Error find data please try again...</strong>
  ) : dataFollowings?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataFollowings.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowings item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Followings"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">
                    Followings
                  </h1>
                </div>
              </div>

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <HorizontalNavSetting />

                <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">
                  <div className="flow-root">
                    <div className="overflow-hidden bg-white border border-gray-200">
                      <div className="px-4 py-5">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <p className="text-base font-bold text-gray-900">
                            Followings
                          </p>
                        </div>

                        {dataTableFollowings}
                      </div>
                    </div>
                    {hasNextPage && (
                      <div className=" mt-4 text-center justify-center mx-auto">
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
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Followings);
