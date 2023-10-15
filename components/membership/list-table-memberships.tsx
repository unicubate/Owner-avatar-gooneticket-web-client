/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Input } from "antd";
import { useRouter } from "next/router";
import { GetInfiniteMembershipsAPI } from "@/api-site/membership";
import { ButtonInput, EmptyData, LoadingFile } from "../ui";
import { ListMemberships } from "./list-memberships";
import { useInView } from "react-intersection-observer";

type Props = {
  organizationId: string;
};

const ListTableMemberships: React.FC<Props> = ({ organizationId }) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingMembership,
    isError: isErrorMembership,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteMembershipsAPI({
    organizationId: organizationId,
    take: 10,
    sort: "DESC",
    queryKey: ["memberships", "infinite"],
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

  const dataTableMemberships = isLoadingMembership ? (
    <LoadingFile />
  ) : isErrorMembership ? (
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
        <ListMemberships item={item} key={index} index={index} />
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
                  router.push(`${`/memberships/create`}`)
                }
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"indigo"}
              >
                Create level
              </ButtonInput>
            </div>
            <div className="mt-4 sm:mt-0">
              <Input placeholder="Search product" />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {dataTableMemberships}
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
export { ListTableMemberships };
