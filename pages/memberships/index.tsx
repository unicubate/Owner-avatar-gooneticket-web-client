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
import { GetInfiniteMembershipsAPI } from "@/api-site/membership";
import { arrayDonation, arrayTransactions } from "@/components/mock";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatePrice } from "@/utils";
import { BiDotsHorizontal } from "react-icons/bi";

const Memberships = () => {
  const router = useRouter();
  const [donationsArrays] = useState(arrayTransactions || []);

  return (
    <>
      <LayoutDashboard title={"Memberships"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavMembership />

                <div className="flow-root">
                  <div className="mt-8 px-4 py-4 overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <p className="text-lg font-bold">Recent transactions</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                      
                      {donationsArrays.length > 0 ? (
                        <table className="min-w-full mt-4 lg:divide-y lg:divide-gray-200">
                          {/* <thead className="hidden lg:table-header-group">
                            <tr>
                              <th className="py-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center"></div>
                              </th>

                              <th className="py-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center"></div>
                              </th>

                              <th className="py-4 text-left text-sm font-medium text-gray-500">
                                <div className="flex items-center"></div>
                              </th>

                              <th className="relative py-4 pl-3 pr-4 sm:pr-6 md:pr-0"></th>
                            </tr>
                          </thead> */}

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
                                    icon={<BiDotsHorizontal className="w-5 h-5" />}
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

export default PrivateComponent(Memberships);
