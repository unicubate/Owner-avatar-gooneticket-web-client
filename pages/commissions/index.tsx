import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavCommission } from "@/components/commission/horizontal-nav-commission";
import { useAuth } from "@/components/util/context-user";
import { EnableCommission } from "@/components/commission/enable-commission";
import { TableCommissions } from "@/components/commission/table-commissions";
import { GetStaticPropsContext } from "next";

const Commissions = () => {
  const { organizationId, profile } = useAuth() as any;



  return (
    <>
      <LayoutDashboard title={"Commissions"}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

            <HorizontalNavCommission />

            {profile?.id ? <EnableCommission profile={profile} /> : null}

            <div className="flow-root">

              {organizationId ? <TableCommissions organizationId={organizationId} /> : null}

            </div>
          </div>

        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Commissions);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    },
  };
}