import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useState } from "react";
import { Avatar, Button } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { arrayTransactions } from "@/components/mock";
import { formatePrice } from "@/utils";
import { BiCog, BiDotsHorizontal } from "react-icons/bi";
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";
import { useAuth } from "@/components/util/context-user";
import { truncateInput } from "@/utils/utils";
import { ReadMore } from "@/utils/read-more";
import Transactions from "../memberships/transactions";
import { RecentTransactions } from "@/components/transaction/recent-transactions";

const Dashboard = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const [donationsArrays] = useState(arrayTransactions || []);

  console.log("user ========>", user);

  return (
    <>
      <LayoutDashboard title={"Dashboard"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <div className="flow-root">
                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0 cursor-pointer">
                        <Avatar
                          size={60}
                          className="object-cover w-10 h-10 rounded-full"
                          src="https://picsum.photos/seed/6JySCJv/640/480"
                          alt={`${user?.profile?.firstName ?? ""} ${
                            user?.profile?.lastName ?? ""
                          }`}
                        />
                      </div>

                      <div className="ml-4 cursor-pointer">
                        <p className="text-xl font-bold text-gray-900">
                          {user?.profile?.firstName ?? ""}{" "}
                          {user?.profile?.lastName ?? ""}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-600">
                          {process.env.NEXT_PUBLIC_SITE}/{user?.username ?? ""}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <button
                          title="Share"
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                        >
                          <IoShareOutline className="w-5 h-5" />
                        </button>
                        <button
                          title="Download"
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                        >
                          <BiCog className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center mt-3">
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

                    <div className="flex items-center mt-3">
                      <p className="text-3xl font-bold">
                        {formatePrice({
                          value: Number(
                            Number(user?.wallet?.amount ?? 0) *
                              Number(user?.profile?.currency?.amount ?? 0)
                          ),
                          isDivide: true,
                        }) ?? ""}{" "}
                        {user?.profile?.currency?.code ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="ml-auto">
                      <div className="flex items-center space-x-4">
                        <Button shape="default" size="large" loading={false}>
                          <span className="font-bold text-gray-900">
                            Last 30 days
                          </span>
                        </Button>
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
                  </div>

                  <div className="grid grid-cols-1 gap-5 mt-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Membership
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            1.780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Commissions
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            23.780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Donations
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            234.780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Shop
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            102.780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.id ? <RecentTransactions userId={user?.profile?.userId} /> : null}

                  <div className="py-4 mt-4 bg-white sm:py-4 lg:py-10">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 mt-6 text-center border border-gray-200 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative transition-all duration-300 bg-white hover:shadow-xl hover:z-10">
                          <div className="px-4 py-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-gray-400 rounded-full">
                              <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                                />
                              </svg>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mt-7">
                              Membership
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                              Monthly membership for your biggest fans.
                            </p>
                          </div>
                        </div>

                        <div className="relative transition-all duration-300 bg-white border-t border-gray-200 sm:border-t-0 sm:border-l hover:shadow-xl hover:z-10">
                          <div className="px-4 py-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-gray-400 rounded-full">
                              <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                />
                              </svg>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mt-7">
                              Send Gifts Easily
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipis
                              elit. Sit enim nec proin.
                            </p>
                          </div>
                        </div>

                        <div className="relative transition-all duration-300 bg-white border-t border-gray-200 lg:border-l lg:border-t-0 hover:shadow-xl hover:z-10">
                          <div className="px-4 py-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-gray-400 rounded-full">
                              <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mt-7">
                              Secured Payments
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipis
                              elit. Sit enim nec proin.
                            </p>
                          </div>
                        </div>

                        <div className="relative transition-all duration-300 bg-white border-t border-gray-200 sm:border-l lg:border-t-0 hover:shadow-xl hover:z-10">
                          <div className="px-4 py-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-gray-400 rounded-full">
                              <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mt-7">
                              High Quality Materials
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipis
                              elit. Sit enim nec proin.
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
