/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ButtonInput, EmptyData, LoadingFile } from "../ui";
import { GetInfiniteTransactionsAPI } from "@/api-site/transaction";
import { useInView } from "react-intersection-observer";
import { ListTransactions } from "./list-transactions";
import { ErrorFile } from "../ui/error-file";
import { BiTransfer } from "react-icons/bi";
import { ModelType } from "@/utils/pagination-item";
import { SearchInput } from "../ui/SearchInput";
import { useDebounce } from "@/utils";

type Props = {
  model?: ModelType;
  days?: number;
  organizationId?: string;
};

const TableTransactions: React.FC<Props> = ({
  model,
  organizationId,
  days,
}) => {
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState<string>('')

  const debounceFilter = useDebounce(filter, 500);
  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    search: debounceFilter,
    organizationId,
    model: model?.toLocaleUpperCase(),
    take: 10,
    sort: "DESC",
    queryKey: ["transactions", "infinite"],
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTableTransactions = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataTransaction?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiTransfer className="h-10 w-10" />}
      title="You don't have any transaction"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataTransaction?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListTransactions item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-4 px-4 py-4 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold">Recent transactions</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <SearchInput placeholder="Search by name or email"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <table className="min-w-full mt-4 lg:divide-y">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {dataTableTransactions}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="mt-2 text-center justify-center mx-auto">
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

      {/* <div className="flex items-center mt-2 mb-4 space-x-4">
        <ButtonInput
          status="cancel"
          type="button"
          shape="default"
          size="normal"
          loading={false}
        // onClick={() => back()}
        >
          Preview
        </ButtonInput>
        <ButtonInput
          status="cancel"
          type="button"
          shape="default"
          size="normal"
          loading={false}
        >
          Next
        </ButtonInput>
      </div> */}
    </>
  );
};

export { TableTransactions };
