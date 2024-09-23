import { GetOneTransactionAPI } from '@/api-site/transaction';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ButtonInput, SerialPrice } from '@/components/ui-setting';
import { AvatarComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { formatDateDDMMYYToUtc, formateDate } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import { DownloadIcon, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const TransactionsView = () => {
  const { query, push, back } = useRouter();
  const { t, locale } = useInputState();
  const transactionId = String(query?.id);
  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: item,
  } = GetOneTransactionAPI({
    transactionId,
  });
  const sumTax = item?.amount
    ? Number(item?.amount) - Number(item?.amountInTaxes)
    : null;
  return (
    <>
      <LayoutDashboard title={`Transaction #${item?.order?.orderNumber ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flex items-center">
              <div className="sm:mt-0">
                <ButtonInput
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    back();
                  }}
                  icon={<MoveLeftIcon className="size-4" />}
                >
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                  </span>
                </ButtonInput>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <ButtonInput
                  type="submit"
                  size="sm"
                  variant="ghost"
                  //loading={loading}
                  icon={<DownloadIcon className="size-6" />}
                  //onClick={() => handleDownloadRows()}
                >
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Download
                  </span>
                </ButtonInput>
              </div>
            </div>

            <div className="mt-2 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background">
              <div className="p-8 sm:px-8 sm:py-7">
                {isLoadingTransaction ? (
                  <LoadingFile />
                ) : isErrorTransaction ? (
                  <ErrorFile
                    title="404"
                    description="Error find data please try again"
                  />
                ) : (
                  <>
                    <div className="flex items-center">
                      <div
                        onClick={() => push(`/${item?.profileSend?.username}`)}
                        className="relative shrink-0 cursor-pointer"
                      >
                        <AvatarComponent
                          className="size-12"
                          profile={item?.profileSend}
                        />
                      </div>

                      <div
                        onClick={() => push(`/${item?.profileSend?.username}`)}
                        className="ml-2 cursor-pointer"
                      >
                        <p className="text-sm font-bold">
                          {capitalizeFirstLetter(
                            item?.profileSend?.firstName ?? '',
                          )}{' '}
                          {capitalizeFirstLetter(
                            item?.profileSend?.lastName ?? '',
                          )}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {formateDate(item?.createdAt as Date, locale)}
                        </p>
                      </div>

                      <div className={`ml-auto font-bold`}>
                        {Number(item?.amount) > 0 ? (
                          <>
                            <SerialPrice
                              className="text-lg"
                              value={Number(item?.amount)}
                              currency={{
                                code: String(item?.currency),
                              }}
                            />
                          </>
                        ) : (
                          'Free'
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col rounded-xl">
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <h3 className="font-semibold">Bill to:</h3>
                          <h3 className="font-semibold text-gray-500">
                            {item?.order?.address?.fullName}
                          </h3>
                          <span className="mt-2 text-gray-500">
                            {item?.order?.address?.city},{' '}
                            {item?.order?.address?.address}
                            <br />
                            {item?.order?.address?.country}
                          </span>
                          <span className="mt-2 text-gray-500">
                            {item?.order?.address?.email}
                          </span>
                        </div>

                        <div className="space-y-2 sm:text-end">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                            <dl className="grid gap-x-3 sm:grid-cols-5">
                              <dt className="col-span-3 font-semibold">
                                Invoice date:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                {formatDateDDMMYYToUtc(
                                  item?.createdAt as Date,
                                  locale,
                                )}
                              </dd>
                            </dl>
                            {/* <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold">
                            Due date:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            03/11/2018
                          </dd>
                        </dl> */}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        {/* <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-input"> */}
                        <div className="space-y-4 border-gray-200 dark:border-input">
                          <div className="hidden sm:grid sm:grid-cols-5">
                            <div className="text-xs font-medium uppercase sm:col-span-2">
                              Item
                            </div>
                            <div className="text-start text-xs font-medium uppercase">
                              Qty
                            </div>
                            <div className="text-start text-xs font-medium uppercase">
                              Rate
                            </div>
                            <div className="text-end text-xs font-medium uppercase">
                              Amount
                            </div>
                          </div>

                          <div className="hidden border-b border-gray-200 dark:border-input sm:block"></div>

                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                            <div className="col-span-full sm:col-span-2">
                              <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                Item
                              </h5>
                              <p className="text-sm font-medium">
                                {item?.description}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                Qty
                              </h5>
                              <p className="text-sm">{item?.order?.quantity}</p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                Rate
                              </h5>
                              <p className="text-sm">
                                #{item?.order?.orderNumber}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                Amount
                              </h5>
                              <p className="text-sm sm:text-end">
                                {Number(item?.order?.amountTotal) > 0 ? (
                                  <>
                                    <SerialPrice
                                      className="text-sm"
                                      value={Number(item?.order?.amountTotal)}
                                      currency={{
                                        code: String(item?.order?.currency),
                                      }}
                                    />
                                  </>
                                ) : (
                                  'Free'
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="border-b border-gray-200 dark:border-input"></div>
                        </div>
                      </div>

                      <div className="mt-4 flex sm:justify-end">
                        <div className="w-full max-w-2xl space-y-2 sm:text-end">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                            {/* <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold">
                            Subtotal:
                          </dt>
                          <dd className="col-span-2 text-sm font-bold">
                            $2750.00
                          </dd>
                        </dl> */}

                            <dl className="grid gap-x-3 sm:grid-cols-5">
                              <dt className="col-span-3 text-lg font-semibold">
                                Total:
                              </dt>
                              <dd className="col-span-2 font-bold">
                                {Number(item?.amount) > 0 ? (
                                  <>
                                    <SerialPrice
                                      className="text-lg"
                                      value={Number(item?.order?.amountTotal)}
                                      currency={{
                                        code: String(item?.order?.currency),
                                      }}
                                    />
                                  </>
                                ) : (
                                  'Free'
                                )}
                              </dd>
                            </dl>

                            {/* <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800">
                            Due balance:
                          </dt>
                          <dd className="col-span-2 text-gray-500">$0.00</dd>
                        </dl> */}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 text-center sm:mt-12">
                        <h4 className="text-lg font-semibold">Thank you!</h4>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            If you have any questions concerning this invoice,
                            use the following contact information:
                          </p>
                          <p className="block text-sm font-medium text-gray-500">
                            contact@gooneticket.com
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-center text-sm text-gray-500">
                        © 2024 - {new Date().getFullYear()}{' '}
                        {process.env.NEXT_PUBLIC_NAME_SITE}.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(TransactionsView);
