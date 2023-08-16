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

                        <div className="py-12 bg-white sm:py-16 lg:py-20">
                          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <h2 className="text-xl font-semibold text-gray-900">
                              Button Status
                            </h2>

                            <div className="flex flex-wrap gap-5 mt-8">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 hover:bg-indigo-500"
                              >
                                Primary
                              </button>

                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                              >
                                Secondary
                              </button>

                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 hover:bg-red-700"
                              >
                                Danger
                              </button>

                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-300 border border-transparent rounded-md cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-400"
                                disabled
                              >
                                Disabled
                              </button>

                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              >
                                Stroke
                              </button>
                            </div>
                          </div>
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
