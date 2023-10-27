import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { useState } from "react";
import { arrayDonation } from "@/components/mock";
import Swal from "sweetalert2";
import { RecentTransactions } from "@/components/transaction/recent-transactions";
import { useAuth } from "@/components/util/context-user";
import { getDays } from "@/utils";
import { SerialPrice } from "@/components/ui/serial-price";
import { GetStatisticsTransactionsAPI } from "@/api-site/transaction";
import { LoadingFile } from "@/components/ui";

const Donations = () => {
  const user = useAuth() as any;
  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({ queryKey: ["statistics-transactions"] })

  if (isPending) {
    return <LoadingFile />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const transaction = transactions?.find((item) => item.model === "DONATION")
  console.log('transaction ==========>', transaction)
  return (
    <>
      <LayoutDashboard title={"Donations"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavDonation />

                <div className="flow-root">
                  <div className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">

                    {user?.organizationId ?
                      <div className="bg-white border border-gray-200 rounded-xl">
                        <div className="px-5 py-4">
                          <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                            This Month
                            {/* Last {getDays(new Date())} days */}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xl font-bold text-gray-900">
                              <SerialPrice
                                className="text-xl font-bold text-gray-900"
                                value={Number(user?.donation?.amount)}
                                currency={{
                                  code: user?.profile?.currency?.code,
                                  amount: String(user?.profile?.currency?.amount)
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      </div> : null}

                    {transaction?.organizationId ?
                      <>
                        <div className="bg-white border border-gray-200 rounded-xl">
                          <div className="px-5 py-4">
                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                              All-time
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <SerialPrice
                                className="text-xl font-bold text-gray-900"
                                value={Number(transaction?.statistic?.amount)}
                                currency={{
                                  code: user?.profile?.currency?.code,
                                  amount: String(user?.profile?.currency?.amount)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl">
                          <div className="px-5 py-4">
                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                              Supporter
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <p className="text-xl font-bold text-gray-900">
                                {transaction?.statistic?.count ?? 0}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                      : null}
                  </div>

                  {user?.organizationId ? (
                    <RecentTransactions
                      model="DONATION"
                      organizationId={user?.organizationId}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Donations);
