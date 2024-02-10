import { GetInfinitePaymentsAPI } from '@/api-site/payment';
import { PaymentItemModel } from '@/types/payment';
import React, { useState } from 'react';
import { ListPayments } from '../payment/list-payments';
import { ButtonInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreatePaymentFormCardUser } from './create-payment-form-card-user';
import { CreatePaymentPhoneFormCardUser } from './create-payment-phone-form-card-user';

const PayoutFormUser: React.FC = () => {
  const [showPhoneFormModal, setShowPhoneFormModal] = useState(false);
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
    sort: 'DESC',
  });

  const dataTablePayments = isLoadingPayments ? (
    <LoadingFile />
  ) : isErrorPayments ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataPayments?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataPayments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: PaymentItemModel, index: number) => (
        <ListPayments item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 py-5">
          <div className="mb-4 flex items-center space-x-2">
            <ButtonInput
              type="button"
              variant="default"
              loading={false}
              onClick={() => setShowPhoneFormModal(true)}
            >
              Add Phone
            </ButtonInput>
            <ButtonInput
              type="button"
              variant="outline"
              loading={false}
              onClick={() => setShowCardModal(true)}
            >
              Add Card
            </ButtonInput>
            <ButtonInput type="button" variant="info">
              Add PayPal
            </ButtonInput>
          </div>

          <div className="mt-8 flow-root">
            <div className="-my-5 divide-y divide-gray-100 dark:divide-gray-900">
              {dataTablePayments}

              {hasNextPage ? (
                <>
                  <div className="mb-3 flex flex-col items-center justify-between">
                    {isFetchingNextPage ? null : (
                      <button
                        disabled={isFetchingNextPage ? true : false}
                        onClick={() => fetchNextPage()}
                        className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
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

      {showPhoneFormModal ? (
        <CreatePaymentPhoneFormCardUser
          showModal={showPhoneFormModal}
          setShowModal={setShowPhoneFormModal}
        />
      ) : null}
    </>
  );
};

export { PayoutFormUser };
