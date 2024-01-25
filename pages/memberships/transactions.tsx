import { HorizontalNavDonation } from '@/components/donation/horizontal-nav-donation';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { SubmitHandler } from 'react-hook-form';

const TransactionsDonations = () => {
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log('payload =======>', payload);
  };

  return (
    <>
      <LayoutDashboard title={'Donations'}>
        <div className="flex flex-1 flex-col">
          <main>
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Donations</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Creer pluser donation et partager avec vos contact
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <HorizontalNavDonation />

                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Subscription Plan:{' '}
                      <span className="text-indigo-600">Standard</span>
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Monthly Plan
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                <hr className="mt-6 border-gray-200" />

                {/* <div className="mt-4 sm:flex sm:items-center sm:justify-between">
                                    <p className="text-sm font-medium text-gray-900">Your next payment is <span className="font-bold">$59.00 USD</span>, to be charged on <span className="font-bold">April 08, 2022</span></p>

                                    <p className="mt-2 text-sm font-medium text-gray-500 sm:mt-0">Your payment will be automatically renewed each month</p>
                                </div>

                                <div className="mt-8 bg-white border border-gray-200 rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-24 gap-y-8">
                                            <div className="lg:col-span-2">
                                                <p className="text-base font-bold text-gray-900">Payment Method</p>
                                                <p className="mt-2 text-sm font-medium text-gray-500">Choose your preferred payment method for making future payments</p>
                                            </div>

                                            <div className="lg:col-span-3">
                                                <div className="space-y-5">
                                                    <div className="relative overflow-hidden border border-indigo-600 rounded-xl bg-indigo-50">
                                                        <div className="absolute top-4 right-4">
                                                            <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>

                                                        <div className="relative px-4 py-5">
                                                            <div className="flex items-start">
                                                                <img className="flex-shrink-0 w-auto h-6 rounded-md" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png" alt="" />

                                                                <div className="ml-4">
                                                                    <p className="text-sm font-bold text-gray-900">Visa ending 4331</p>
                                                                    <p className="mt-1 text-sm font-medium text-gray-500">Expiry 09/2024</p>

                                                                    <div className="flex items-center mt-4 space-x-6">
                                                                        <a href="#" title="" className="text-sm font-semibold text-gray-400 transition-all duration-200 rounded-md cursor-not-allowed pointer-events-none hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                                                                            Primary Card
                                                                        </a>

                                                                        <a href="#" title="" className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"> Edit </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
                                                        <div className="absolute top-4 right-4">
                                                            <svg className="w-6 h-6 text-indigo-600 opacity-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>

                                                        <div className="relative px-4 py-5">
                                                            <div className="flex items-start">
                                                                <img className="flex-shrink-0 w-auto h-6 rounded-md" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png" alt="" />

                                                                <div className="ml-4">
                                                                    <p className="text-sm font-bold text-gray-900">Visa ending 5442</p>
                                                                    <p className="mt-1 text-sm font-medium text-gray-500">Expiry 08/2023</p>

                                                                    <div className="flex items-center mt-4 space-x-6">
                                                                        <a href="#" title="" className="text-sm font-semibold text-gray-600 transition-all duration-200 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"> Set as Primary </a>

                                                                        <a href="#" title="" className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"> Edit </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <button type="button" className="inline-flex items-center justify-center text-sm font-medium leading-5 text-gray-600 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:text-gray-900">
                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                        Add New Payment Method
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                <div className="mt-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="flex-1 text-base font-bold text-gray-900">
                      Latest Transactions
                    </p>

                    <div className="mt-4 sm:mt-0">
                      <div className="flex items-center justify-start space-x-5 sm:justify-end">
                        <div className="flex items-center space-x-1">
                          <label className="shrink-0 text-sm font-medium text-gray-900">
                            {' '}
                            Sort by:{' '}
                          </label>
                          <select
                            name=""
                            id=""
                            className="block w-full rounded-lg border-none bg-transparent py-0 pl-0 pr-10 text-base focus:outline-none focus:ring-0 sm:text-sm"
                          >
                            <option>Recent</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          <svg
                            className="-ml-1 mr-1 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Export to CSV
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl ring-1 ring-gray-300">
                    <table className="min-w-full lg:divide-y lg:divide-gray-200">
                      <thead className="hidden lg:table-header-group">
                        <tr>
                          <td
                            width="50%"
                            className="whitespace-normal px-6 py-4 text-sm font-medium text-gray-400"
                          >
                            Invoice
                          </td>

                          <td className="whitespace-normal px-6 py-4 text-sm font-medium text-gray-400">
                            Date
                          </td>

                          <td className="whitespace-normal px-6 py-4 text-sm font-medium text-gray-400">
                            Amount
                          </td>

                          <td className="whitespace-normal px-6 py-4 text-sm font-medium text-gray-400">
                            Status
                          </td>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td
                            width="50%"
                            className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900"
                          >
                            Standard Plan - Feb 2022
                            <div className="mt-1 lg:hidden">
                              <p className="font-medium text-gray-500">
                                07 February, 2022
                              </p>
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            07 February, 2022
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900 lg:text-left">
                            $59.00
                            <div className="mt-1 flex items-center justify-end font-medium lg:hidden">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            <div className="inline-flex items-center">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td
                            width="50%"
                            className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900"
                          >
                            Standard Plan - Jan 2022
                            <div className="mt-1 lg:hidden">
                              <p className="font-medium text-gray-500">
                                09 January, 2022
                              </p>
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            09 January, 2022
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900 lg:text-left">
                            $59.00
                            <div className="mt-1 flex items-center justify-end font-medium lg:hidden">
                              <svg
                                className="mr-1.5 size-2.5 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Canceled
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            <div className="inline-flex items-center">
                              <svg
                                className="mr-1.5 size-2.5 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Canceled
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td
                            width="50%"
                            className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900"
                          >
                            Basic Plan - Dec 2021
                            <div className="mt-1 lg:hidden">
                              <p className="font-medium text-gray-500">
                                15 December, 2021
                              </p>
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            15 December, 2021
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900 lg:text-left">
                            $29.00
                            <div className="mt-1 flex items-center justify-end font-medium lg:hidden">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            <div className="inline-flex items-center">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td
                            width="50%"
                            className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900"
                          >
                            Basic Plan - Nov 2021
                            <div className="mt-1 lg:hidden">
                              <p className="font-medium text-gray-500">
                                14 November, 2021
                              </p>
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            14 November, 2021
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900 lg:text-left">
                            $29.00
                            <div className="mt-1 flex items-center justify-end font-medium lg:hidden">
                              <svg
                                className="mr-1.5 size-2.5 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Pending
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            <div className="inline-flex items-center">
                              <svg
                                className="mr-1.5 size-2.5 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Pending
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td
                            width="50%"
                            className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900"
                          >
                            Basic Plan - Oct 2021
                            <div className="mt-1 lg:hidden">
                              <p className="font-medium text-gray-500">
                                15 October, 2021
                              </p>
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            15 October, 2021
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900 lg:text-left">
                            $29.00
                            <div className="mt-1 flex items-center justify-end font-medium lg:hidden">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>

                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell">
                            <div className="inline-flex items-center">
                              <svg
                                className="mr-1.5 size-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx="4" cy="4" r="3"></circle>
                              </svg>
                              Complete
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default PrivateComponent(TransactionsDonations);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
