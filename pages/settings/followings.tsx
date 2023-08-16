import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Skeleton } from "antd";
import Image from "next/image";
import { ButtonInput } from "@/components/templates/button-input";
import { getFollowingsAPI } from "@/api/follow";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListFollowings from "../../components/setting/list-followings";

const Followings = () => {
  const fetchData = async (pageParam: number) =>
    await getFollowingsAPI({
      take: 10,
      page: pageParam,
      sort: "DESC",
    });
  const {
    status,
    error,
    isLoading: isLoadingFollowings,
    isError: isErrorFollowings,
    data: dataFollowings,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["followings"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    keepPreviousData: true,
  });

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
            <div className="py-6">
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
