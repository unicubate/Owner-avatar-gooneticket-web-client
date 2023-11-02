import React, { useState } from "react";
import { ButtonInput } from "../ui/button-input";
import { CreatePaymentFormCardUser } from "./create-payment-form-card-user";
import { Skeleton } from "antd";
import { GetInfinitePaymentsAPI } from "@/api-site/payment";
import { ListPayments } from "../payment/list-payments";
import { PaymentItemModel } from "@/types/payment";

const PayoutFormUser: React.FC = () => {
  const [showCardModal, setShowCardModal] = useState(false);

  const {
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
    data: dataPayments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePaymentsAPI({
    take: 10,
    sort: "DESC",
  });

  const dataTablePayments = isLoadingPayments ? (
    <Skeleton
      className="mt-4"
      loading={isLoadingPayments}
      paragraph={{ rows: 1 }}
    />
  ) : isErrorPayments ? (
    <strong>Error find data please try again...</strong>
  ) : dataPayments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPayments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: PaymentItemModel, index: number) => (
        <ListPayments item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="overflow-hidden bg-white border border-gray-200">
        <div className="px-4 py-5">
          <div className="flex items-center mb-4 space-x-4">
            <ButtonInput
              onClick={() => setShowCardModal(true)}
              shape="default"
              type="button"
              size="normal"
              loading={false}
              color={"indigo"}
            >
              Add Payment
            </ButtonInput>
            <ButtonInput
              status="cancel"
              type="button"
              shape="default"
              size="normal"
              loading={false}
            >
              Add PayPal
            </ButtonInput>
          </div>

          <div className="flow-root mt-8">
            <div className="-my-5 divide-y divide-gray-100">
              {dataTablePayments}

              {hasNextPage ? (
                <>
                  <div className="mb-3 flex flex-col justify-between items-center">
                    {isFetchingNextPage ? null : (
                      <button
                        disabled={isFetchingNextPage ? true : false}
                        onClick={() => fetchNextPage()}
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      >
                        View more
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showCardModal ? (
        <CreatePaymentFormCardUser
          showModal={showCardModal}
          setShowModal={setShowCardModal}
        />
      ) : null}
    </>
  );
};

export { PayoutFormUser };
