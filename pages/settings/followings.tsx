import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Input, Skeleton } from "antd";
import { useInView } from "react-intersection-observer";
import { ButtonInput } from "@/components/ui/button-input";
import { GetInfiniteFollowingsAPI } from "@/api-site/follow";
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
    dataFollowings?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowings item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Followings"}>

        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
              <div className="mt-8 overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="px-4 py-8">

                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      Followings
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Input placeholder="Search by email, name" className="dark:bg-black dark:text-white dark:placeholder-gray-500 dark:border-gray-800" />
                    </div>
                  </div>


                  <div className="divide-y divide-gray-200 dark:divide-gray-800">

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
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Followings);
