import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormMembership } from '@/components/membership/create-or-update-form-membership';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';

const MembershipsLevelCreate = () => {
  return (
    <>
      <LayoutDashboard title={'Membership create'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
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
      },
    },
  };
}
