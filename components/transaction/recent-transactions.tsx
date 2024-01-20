/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { ButtonInput, EmptyData, LoadingFile } from "../ui-setting/ant";
import { GetInfiniteTransactionsAPI } from "@/api-site/transaction";
import { useInView } from "react-intersection-observer";
import { ListTransactions } from "./list-transactions";
import { GrTransaction } from "react-icons/gr";
import { ErrorFile } from "../ui-setting/ant/error-file";
import { BiTransfer } from "react-icons/bi";

type Props = {
  model?: string;
  days?: number;
  organizationId?: string;
};

const RecentTransactions: React.FC<Props> = ({
  model,
  organizationId,
  days,
}) => {
  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteTransactionsAPI({
    organizationId,
    model: model?.toLocaleUpperCase(),
    take: 10,
    sort: "DESC",
    queryKey: ["recent-transactions", "infinite"],
  });

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
      image={<BiTransfer className="size-10" />}
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
      <div className="mt-4 overflow-hidden rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-[#121212]">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <table className="mt-4 min-w-full lg:divide-y lg:divide-gray-200">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {dataTableTransactions}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { RecentTransactions };
