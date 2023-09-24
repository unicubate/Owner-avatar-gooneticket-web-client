import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useEffect, useState } from "react";
import { Avatar, Button, Input } from "antd";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { LoadingFile } from "@/components/ui/loading-file";
import { ListMemberships } from "@/components/membership/list-memberships";
import { useAuth } from "@/components/util/context-user";
import { useInView } from "react-intersection-observer";
import { GetInfiniteMembershipsAPI } from "@/api/membership";
import { arrayDonation, arrayTransactions } from "@/components/mock";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatePrice } from "@/utils";
import { BiCog, BiDotsHorizontal } from "react-icons/bi";
import Link from "next/link";
import { IoShareOutline } from "react-icons/io5";

const Dashboard = () => {
  const router = useRouter();
  const [donationsArrays] = useState(arrayTransactions || []);

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
                          alt="Boclair Temgoua"
                        />
                      </div>

                      <div className="ml-4 cursor-pointer">
                        <p className="text-xl font-bold text-gray-900">
                          Boclair Temgoua
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {process.env.NEXT_PUBLIC_SITE}/bokino
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
                        <span className="text-lg font-bold">10</span>
                        <span className="ml-2 font-normal text-sm">
                          Subscribes
                        </span>
                      </Link>

                      <Link href="/settings/followers">
                        <span className="ml-4 text-lg font-bold">500</span>
                        <span className="ml-2 font-normal text-sm">
                          Followers
                        </span>
                      </Link>

                      <Link href="/settings/followings">
                        <span className="ml-4 text-lg font-bold">10</span>
                        <span className="ml-2 font-normal text-sm">
                          Following
                        </span>
                      </Link>
                    </div>

                    <div className="flex items-center mt-3">
                      <p className="text-3xl font-bold">0,00 $</p>
                    </div>
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

                <div className="flow-root">
                  <div className="grid grid-cols-1 gap-5 mt-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Membership
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            1.780,00 $
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
                            23.780,00 $
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
                            234.780,00 $
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
                            102.780,00 $
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flow-root">
                  <div className="mt-4 px-4 py-4 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <p className="text-lg font-bold">Recent transactions</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {donationsArrays.length > 0 ? (
                        <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
                          <tbody className="divide-y divide-gray-200">
                            {donationsArrays.map((item: any, index) => (
                              <tr key={index}>
                                <td className="py-4 text-sm font-bold text-gray-900">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <Avatar
                                      size={50}
                                      src={item?.image}
                                      alt=""
                                    />
                                    <div className="flex-1 min-w-0 ml-4">
                                      <p className="text-sm font-bold text-gray-900">
                                        {item?.name}
                                      </p>
                                      <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                                        {item?.email}
                                      </p>
                                      <p className="lg:hidden mt-1 text-sm font-medium text-gray-500 truncate">
                                        {item?.createdAt}
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div className="inline-flex items-center">
                                    {donation?.title}
                                  </div>
                                  <div className="space-y-1 pt-2">
                                    <p className="text-sm font-medium text-gray-500">
                                      temgoua2013@gmail.com
                                    </p>
                                  </div> */}
                                </td>

                                {/* <td className="py-4 text-sm font-bold text-right text-gray-900 lg:table-cell">
                                  {item?.amount}&nbsp;€ 
                                </td>

                                <td className="py-8 text-sm font-medium text-right text-gray-900 lg:table-cell">
                                  18 sept. 2023
                                </td> */}

                                <td className="hidden text-sm text-right font-bold text-gray-900 lg:table-cell">
                                  {formatePrice({
                                    value: item?.amount || 0,
                                    isDivide: false,
                                  })}
                                  &nbsp;Fcfa
                                </td>

                                <td className="hidden text-sm text-right font-medium text-gray-600 lg:table-cell">
                                  {item?.createdAt}
                                </td>

                                <td className="py-4 text-sm font-medium text-right text-gray-400">
                                  <Button
                                    type="text"
                                    shape="circle"
                                    icon={
                                      <BiDotsHorizontal className="w-5 h-5" />
                                    }
                                    size="small"
                                  />
                                  <div className="mt-1 lg:hidden pt-1">
                                    <p className="inline-flex text-sm font-bold text-gray-900">
                                      {item?.amount}&nbsp;Fcfa
                                    </p>
                                    {/* <div className="inline-flex items-center justify-end mt-1">
                                      07 January, 2022
                                    </div> */}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <EmptyData
                          title="Add your first donation to get started"
                          description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
                        />
                      )}
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
