import { PrivateComponent } from "@/components/util/private-component";
import { SubmitHandler } from "react-hook-form";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { useAuth } from "@/components/util/context-user";
import { UpdateFormProfile } from "@/components/user/update-form-profile";
import { UpdateFormPassword } from "@/components/user/update-form-password";
import { UpdateFormUser } from "@/components/user/update-form-user";
import { PayoutFormUser } from "@/components/user/payout-form-user";
import { GetStaticPropsContext } from 'next';

const SettingsPayout = () => {
  const user = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={"Settings"}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
            <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-1">
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
      }
    }
  }
}