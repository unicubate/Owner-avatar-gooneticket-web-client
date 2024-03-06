import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { PayoutFormUser } from '@/components/user/payout-form-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';

const SettingsPayout = () => {
  const { userStorage: user } = useInputState();

  return (
    <>
      <LayoutDashboard title={'Settings'}>
        <div className="mx-auto max-w-5xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
              <div className="border-gray-200 pt-6 lg:order-1 lg:col-span-1">
                {user?.id ? <PayoutFormUser /> : null}

                {/* {user?.profileId ? (
                      <UpdateFormProfile
                        profileId={user?.profileId}
                        user={user}
                      />
                    ) : null}

                    {user?.profileId ? (
                      <UpdateFormPassword userId={user?.id} user={user} />
                    ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(SettingsPayout);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
