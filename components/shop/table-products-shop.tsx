import { Input } from "antd";
import { ButtonInput } from "@/components/ui/button-input";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { GetInfiniteProductsAPI } from "@/api-site/product";
import { EmptyData } from "@/components/ui/empty-data";
import { LoadingFile } from "@/components/ui/loading-file";
import { ListProductsShop } from "./list-products-shop";

type Props = {
  organizationId: string;
};

const TableProductsShop: React.FC<Props> = ({ organizationId }) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    organizationId,
    take: 6,
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

  const dataTableProducts = isLoadingGallery ? (
    <LoadingFile />
  ) : isErrorGallery ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListProductsShop item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
        <div className="px-4 py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 sm:mt-0">
              <ButtonInput
                onClick={() =>
                  router.push(`${`/shop/create`}`)
                }
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
              <Input placeholder="Search product" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
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
    </>
  );
};

export { TableProductsShop };
