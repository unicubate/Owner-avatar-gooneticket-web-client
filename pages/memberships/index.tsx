import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { useState } from "react";
import { Avatar, Button } from "antd";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { EmptyData } from "@/components/ui/empty-data";
import { useRouter } from "next/router";
import { arrayTransactions } from "@/components/mock";
import { formatePrice } from "@/utils";
import { BiDotsHorizontal } from "react-icons/bi";
import { RecentTransactions } from "@/components/transaction/recent-transactions";
import { useAuth } from "@/components/util/context-user";

const Memberships = () => {
  const { organizationId } = useAuth() as any;
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
                  <div className="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Supporter
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            1347829
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          Last 30 days
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-5 py-4">
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                          All-time
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xl font-bold text-gray-900">
                            2.780,00 EUR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {organizationId ? (
                    <RecentTransactions
                      model="MEMBERSHIP"
                      organizationId={organizationId}
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

export default PrivateComponent(Memberships);
