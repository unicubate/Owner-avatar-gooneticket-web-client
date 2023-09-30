import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { Input, Spin } from "antd";
import { ButtonInput } from "@/components/ui/button-input";
import { useRouter } from "next/router";
import { HorizontalNavCommission } from "@/components/commission/horizontal-nav-commission";
import { LoadingOutlined } from "@ant-design/icons";
import { EmptyData } from "@/components/ui/empty-data";
import { ListCommissions } from "@/components/commission/list-commissions";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/util/context-user";
import { useEffect, useState } from "react";
import { GetInfiniteCommissionsAPI } from "@/api-site/commission";
import { EnableCommission } from "@/components/commission/enable-commission";
import { LoadingFile } from "@/components/ui/loading-file";

const Commissions = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage, profile } = useAuth() as any;

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommissionsAPI({
    userId: userStorage?.id,
    take: 6,
    sort: "DESC",
    queryKey: ["commissions", "infinite"],
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

  const dataTableCommissions = isLoadingGallery ? (
    <LoadingFile />
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
        <ListCommissions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Commissions"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">


              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

                <HorizontalNavCommission />

                {profile?.id ? <EnableCommission profile={profile} /> : null}

                <div className="flow-root">
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="px-4 py-8">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            onClick={() =>
                              router.push(`${`/commissions/create`}`)
                            }
                            shape="default"
                            type="button"
                            size="normal"
                            loading={false}
                            color={"indigo"}
                          >
                            Create Commission
                          </ButtonInput>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Input placeholder="Search commission" />
                        </div>
                      </div>

                      <div className="divide-y divide-gray-200">
                        {dataTableCommissions}
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

export default PrivateComponent(Commissions);
