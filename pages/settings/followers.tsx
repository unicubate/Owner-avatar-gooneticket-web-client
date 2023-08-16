import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Skeleton } from "antd";
import Image from "next/image";
import { ButtonInput } from "@/components/templates/button-input";
import { Fragment, useState } from "react";
import { arrayPeoples } from "@/components/mock";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowersAPI } from "@/api/follow";
import { EmptyData } from "@/components/templates/empty-data";
import ListFollowers from "@/components/setting/list-followers";

const Followers = () => {
  const fetchData = async (pageParam: number) =>
    await getFollowersAPI({
      take: 10,
      page: pageParam,
      sort: "DESC",
    });
  const {
    status,
    error,
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
    data: dataFollowers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["followers"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    keepPreviousData: true,
  });

  const dataTableFollowers = isLoadingFollowers ? (
    <Skeleton loading={isLoadingFollowers} avatar paragraph={{ rows: 1 }} />
  ) : isErrorFollowers ? (
    <strong>Error find data please try again...</strong>
  ) : dataFollowers?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataFollowers.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowers item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Followers"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Followers</h1>
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
                            Followers
                          </p>
                        </div>

                        {dataTableFollowers}
                      </div>
                    </div>

                    {hasNextPage && (
                      <div className="mt-4 text-center justify-center mx-auto">
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

                    {/* </div> */}
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

export default PrivateComponent(Followers);
