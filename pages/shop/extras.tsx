import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { useAuth } from "@/components/util/context-user";
import { EnableShop } from "@/components/shop/enable-shop";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import { GetInfiniteProductsAPI } from "@/api-site/product";
import { Fragment, useEffect, useState } from "react";
import { ButtonInput, EmptyData, LoadingFile } from "@/components/ui";
import { ListProductsShop } from "@/components/shop/list-products-shop";
import { Input } from "antd";
import { ProductModel } from "@/types/product";
import { ErrorFile } from "@/components/ui/error-file";
import { BiStoreAlt } from "react-icons/bi";

const ShopsExtras = () => {
  const { userStorage: user, profile } = useAuth() as any;
  const router = useRouter();
  const [dayCount, setDayCount] = useState(30);
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: dataProduct,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    organizationId: user?.organizationId,
    take: 10,
    sort: "DESC",
    queryKey: ["products", "infinite"],
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

  const dataTableProducts = isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorProduct ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataProduct?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiStoreAlt className="h-10 w-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataProduct?.pages.map((page, index) => (
      <Fragment key={index}>
        {page?.data?.value.map((item: ProductModel, index: number) => (
          <ListProductsShop item={item} key={index} index={index} />
        ))}
      </Fragment>
    ))
  );

  return (
    <>
      <LayoutDashboard title={"Shop"}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
            <HorizontalNavShop />

            {profile?.id ? <EnableShop profile={profile} /> : null}

            <div className="flow-root">
              <div className="mt-8 overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      <ButtonInput
                        onClick={() => router.push(`${`/shop/create`}`)}
                        shape="default"
                        type="button"
                        size="normal"
                        loading={false}
                        color={"indigo"}
                      >
                        Create product
                      </ButtonInput>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Input placeholder="Search product" className="dark:bg-black dark:text-white dark:placeholder-gray-500 dark:border-gray-800" />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableProducts}
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
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopsExtras);
