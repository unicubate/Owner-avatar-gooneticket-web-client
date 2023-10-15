import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { useAuth } from "@/components/util/context-user";
import { TableMemberships } from "@/components/membership/table-memberships";

const MembershipsLevels = () => {
  const { organizationId } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={"Memberships"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavMembership />

                <div className="flow-root">

                  {organizationId ? <TableMemberships organizationId={organizationId} /> : null}

                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevels);
