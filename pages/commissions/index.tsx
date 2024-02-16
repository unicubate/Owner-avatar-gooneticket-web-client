import { EnableCommission } from '@/components/commission/enable-commission';
import { HorizontalNavCommission } from '@/components/commission/horizontal-nav-commission';
import { TableCommissions } from '@/components/commission/table-commissions';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';

const Commissions = () => {
  const { organizationId, profile } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Commissions'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavCommission />

            {profile?.id ? <EnableCommission profile={profile} /> : null}

            <div className="flow-root">
              <TableCommissions organizationId={organizationId} />
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
      },
    },
  };
}
