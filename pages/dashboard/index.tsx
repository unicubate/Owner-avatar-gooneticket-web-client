import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useState } from "react";
import { Avatar, Button } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { arrayTransactions } from "@/components/mock";
import { formatePrice, getDays } from "@/utils";
import { BiCog, BiDotsHorizontal, BiLockOpen } from "react-icons/bi";
import { CiGift, CiShop, CiUnlock, CiWallet } from "react-icons/ci";
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";
import { useAuth } from "@/components/util/context-user";
import { capitalizeOneFirstLetter, truncateInput } from "@/utils/utils";
import { ReadMore } from "@/utils/read-more";
import Transactions from "../memberships/transactions";
import { RecentTransactions } from "@/components/transaction/recent-transactions";
import { AvatarComponent } from "@/components/ui/avatar-component";
import { SerialPrice } from "@/components/ui/serial-price";
import { GetStatisticsTransactionsAPI } from "@/api-site/transaction";
import { ButtonCancelInput } from "@/components/ui";

const Dashboard = () => {
  const [dayCount, setDayCount] = useState(30);
  const user = useAuth() as any;

  const {
    data: transactions,
    isError,
    isPending,
    error,
  } = GetStatisticsTransactionsAPI({
    queryKey: ["statistics-transactions"],
    days: dayCount,
  });

  if (isPending) {
    return "";
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const transactionDonation = transactions?.find(
    (item) => item.model === "DONATION"
  );
  const transactionMembership = transactions?.find(
    (item) => item.model === "MEMBERSHIP"
  );
  const transactionProduct = transactions?.find(
    (item) => item.model === "PRODUCT"
  );

  return (
    <>
      <LayoutDashboard title={"Dashboard"}>
        <div className="flex-1 dark:bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <div className="flow-root">
                  <div className="px-3 py-2 dark:bg-white border dark:border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 cursor-pointer">
                        <AvatarComponent size={60} profile={user?.profile} />
                      </div>

                      <div className="ml-4 cursor-pointer">
                        <p className="text-xl font-bold dark:text-gray-900">
                          {user?.profile?.firstName ?? ""}{" "}
                          {user?.profile?.lastName ?? ""}
                        </p>
                        <p className="mt-1 text-sm font-medium dark:text-gray-600">
                          {process.env.NEXT_PUBLIC_SITE}/{user?.username ?? ""}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <ButtonInput
                          minW="fit"
                          shape="default"
                          type="button"
                          size="normal"
                          loading={false}
                          color="red"
                        >
                          Withdraw
                        </ButtonInput>
                      </div>
                    </div>

                    <div className="flex items-center mt-3 dark:text-gray-900">
                      <Link href="/settings/subscribes">
                        <span className="text-lg font-bold">
                          {user?.totalSubscribe ?? 0}
                        </span>
                        <span className="ml-2 font-normal text-sm">
                          Subscribes
                        </span>
                      </Link>

                      <Link href="/settings/followers">
                        <span className="ml-4 text-lg font-bold">
                          {user?.totalFollower ?? 0}
                        </span>
                        <span className="ml-2 font-normal text-sm">
                          Followers
                        </span>
                      </Link>

                      <Link href="/settings/followings">
                        <span className="ml-4 text-lg font-bold">
                          {user?.totalFollowing ?? 0}
                        </span>
                        <span className="ml-2 font-normal text-sm">
                          Following
                        </span>
                      </Link>
                    </div>

                    <div className="flex items-center mt-3 dark:text-gray-900">
                      <SerialPrice
                        className="text-3xl font-bold"
                        value={Number(user?.wallet?.amount)}
                        currency={{
                          code: user?.profile?.currency?.code,
                          amount: String(user?.profile?.currency?.amount),
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="ml-auto">
                      <div className="flex items-center space-x-4">
                        {/* <Button shape="default" size="large" loading={false}>
                          <span className="font-bold text-gray-900">
                            Last {dayCount} days
                          </span>
                        </Button> */}
                        <ButtonCancelInput
                          shape="default"
                          size="normal"
                          loading={false}
                        >
                          Last {dayCount} days
                        </ButtonCancelInput>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 mt-4 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Membership
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900"
                            value={Number(
                              transactionMembership?.statistic?.amount
                            )}
                            currency={{
                              code: user?.profile?.currency?.code,
                              amount: String(user?.profile?.currency?.amount),
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Donations
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900"
                            value={Number(
                              transactionDonation?.statistic?.amount
                            )}
                            currency={{
                              code: user?.profile?.currency?.code,
                              amount: String(user?.profile?.currency?.amount),
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Shop
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <SerialPrice
                            className="text-xl font-bold text-gray-900"
                            value={Number(
                              transactionProduct?.statistic?.amount
                            )}
                            currency={{
                              code: user?.profile?.currency?.code,
                              amount: String(user?.profile?.currency?.amount),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.id ? <RecentTransactions days={dayCount} /> : null}

                  <div className="py-4 mt-4 bg-white sm:py-4 lg:py-10">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <div className="grid max-w-2xl grid-cols-1 mx-auto sm:grid-cols-2 xl:max-w-none xl:grid-cols-4 gap-x-8 gap-y-8 sm:gap-y-12">
                        <div className="flex items-center">
                          <CiWallet className="flex-shrink-0 text-gray-900 w-14 h-14" />
                          <div className="ml-4">
                            <h3 className="text-base font-bold text-gray-900">
                              Secured Payments
                            </h3>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                              Make payment with ease
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <CiShop className="flex-shrink-0 text-gray-900 w-14 h-14" />
                          <div className="ml-4">
                            <h3 className="text-base font-bold text-gray-900">
                              Shop for Anyone
                            </h3>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                              You can shop for any category
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <CiUnlock className="flex-shrink-0 text-gray-900 w-14 h-14" />
                          <div className="ml-4">
                            <h3 className="text-base font-bold text-gray-900">
                              Membership
                            </h3>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                              Monthly membership for your biggest fans.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <CiGift className="flex-shrink-0 text-gray-900 w-14 h-14" />
                          <div className="ml-4">
                            <h3 className="text-base font-bold text-gray-900">
                              Quality Products
                            </h3>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                              Made with highest care
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default PrivateComponent(Dashboard);
