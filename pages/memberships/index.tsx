import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
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
  const user = useAuth() as any;
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
                  {user?.organizationId ? (
                    <RecentTransactions
                      model="MEMBERSHIP"
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

export default PrivateComponent(Memberships);
