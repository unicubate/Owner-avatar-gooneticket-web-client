import {
  GetAllCountiesAPI,
  GetAllCurrenciesAPI,
  GetOneProfileAPI,
} from '@/api-site/profile';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { DeleteOneUser } from '@/components/user/delete-one-user';
import { UpdateFormPassword } from '@/components/user/update-form-password';
import { UpdateFormProfile } from '@/components/user/update-form-profile';
import { PrivateComponent } from '@/components/util/private-component';

const Settings = () => {
  const { userStorage: user } = useInputState();

  const { data: profile, status } = GetOneProfileAPI({
    profileId: user?.profileId,
  });

  const { data: currencies } = GetAllCurrenciesAPI();

  const { data: countries } = GetAllCountiesAPI();

  return (
    <>
      <LayoutDashboard title={'Settings'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">


            <div className="flow-root">
              <div className="border-gray-200 pt-6 lg:order-1 lg:col-span-1">
                {profile?.id ? (
                  <UpdateFormProfile
                    profile={profile}
                    currencies={currencies}
                    countries={countries}
                    user={user}
                  />
                ) : null}

                {user?.provider === 'DEFAULT' ? <UpdateFormPassword /> : null}

                {user?.id ? <DeleteOneUser user={user} /> : null}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Settings);
