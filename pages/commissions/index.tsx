import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { Image, Input, Spin } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/templates/button-input";
import { useRouter } from "next/router";
import { HorizontalNavCommission } from "@/components/commission/horizontal-nav-commission";
import { LoadingOutlined } from "@ant-design/icons";
import { EmptyData } from "@/components/templates/empty-data";
import ListCommissions from "@/components/commission/list-commissions";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/components/util/session/context-user";
import { useEffect, useState } from "react";
import { GetInfiniteCommissionsAPI } from "@/api/commision";

const Commissions = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;
  const [openModal, setOpenModal] = useState(false);

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
        <ListCommissions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Commissions"}>
        <div className="flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              {/* <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Shops</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Sell digital or physical items with a Un-Pot Shop!
                  </p>
                </div>
              </div> */}

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <HorizontalNavCommission />

                <div className="mt-8 px-3 py-2 border-gray-200 border bg-white rounded-lg">
                  <div className="px-2 py-3 sm:p-2">
                    <div className="md:flex md:items-center md:justify-between">

                      <div className="flex-1 max-w-xs mt-4 md:mt-0">
                        <p className="text-base font-bold text-gray-600">
                          Commissions Open
                        </p>
                        {/* <p className="mt-1 text-sm font-medium text-gray-500">Commissions are currently active. Your fans can request them from your page.</p> */}
                        <p className="mt-1 text-sm font-medium text-gray-500">Your commissions are currently private and are not available for booking.</p>
                        
                      </div>

                      <div className="flex items-center justify-start mt-6 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
                        <ButtonInput
                          // onClick={() =>
                          //   router.push(`${`/commissions/create`}`)
                          // }
                          shape="default"
                          type="button"
                          size="large"
                          loading={false}
                          color={"indigo"}
                        >
                          Open
                        </ButtonInput>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flow-root">
                  <div className="mt-8 overflow-hidden bg-white border border-gray-200">
                    <div className="px-4 py-5">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            onClick={() =>
                              router.push(`${`/commissions/create`}`)
                            }
                            shape="default"
                            type="button"
                            size="large"
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
