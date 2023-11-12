import { Input } from "antd";
import { ButtonInput } from "@/components/ui/button-input";
import { useRouter } from "next/router";
import { EmptyData } from "@/components/ui/empty-data";
import { ListCommissions } from "@/components/commission/list-commissions";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { GetInfiniteCommissionsAPI } from "@/api-site/commission";
import { LoadingFile } from "@/components/ui/loading-file";
import { ErrorFile } from "../ui/error-file";
import { RiShakeHandsLine } from "react-icons/ri";

type Props = {
  organizationId: string;
};

const TableCommissions: React.FC<Props> = ({ organizationId }) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommissionsAPI({
    organizationId,
    take: 10,
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
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<RiShakeHandsLine className="h-10 w-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommissions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-2 sm:mt-0">
              <ButtonInput
                onClick={() => router.push(`${`/commissions/create`}`)}
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"indigo"}
              >
                Create Commission
              </ButtonInput>
            </div>
            <div className="mt-2 sm:mt-0">
              <Input placeholder="Search by title" className="dark:bg-[#121212] dark:text-white dark:placeholder-gray-500 dark:border-gray-800" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">{dataTableCommissions}</div>
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
export { TableCommissions };
