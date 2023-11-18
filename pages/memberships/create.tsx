import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { CreateOrUpdateFormMembership } from "@/components/membership/create-or-update-form-membership";
import { useAuth } from "@/components/util/context-user";
import { GetStaticPropsContext } from "next";


const MembershipsLevelCreate = () => {
  return (
    <>
      <LayoutDashboard title={"Membership create"}>
        <div className="max-w-4xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <CreateOrUpdateFormMembership />
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevelCreate);


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}