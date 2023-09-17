import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormMembership } from "@/components/membership/create-or-update-form-membership";
import { useAuth } from "@/components/util/session/context-user";


const MembershipsLevelCreate = () => {
  return (
    <>
      <LayoutDashboard title={"Membership create"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <CreateOrUpdateFormMembership  />
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevelCreate);
