import { GetAllCurrenciesAPI, GetOneProfileAPI } from '@/api-site/profile';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ErrorFile, LoadingFile } from '@/components/ui-setting';
import { DeleteOneUser } from '@/components/user/delete-one-user';
import { UpdateFormPassword } from '@/components/user/update-form-password';
import { UpdateFormProfile } from '@/components/user/update-form-profile';
import { PrivateComponent } from '@/components/util/private-component';

const Settings = () => {
  const { user } = useInputState();

  const {
    isLoading,
    isError,
    data: profile,
  } = GetOneProfileAPI({
    profileId: user?.profileId,
  });

  const { data: currencies } = GetAllCurrenciesAPI();

  return (
    <>
      <LayoutDashboard title={'Settings'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-input dark:bg-background">
                <div className="px-4 py-5">
                  {isLoading ? (
                    <LoadingFile />
                  ) : isError ? (
                    <ErrorFile
                      title="404"
                      description="Error find data please try again..."
                    />
                  ) : (
                    <UpdateFormProfile
                      profile={profile}
                      user={user}
                      currencies={currencies}
                    />
                  )}
                </div>
              </div>

              {user?.provider === 'DEFAULT' ? <UpdateFormPassword /> : null}

              {user?.id ? <DeleteOneUser user={user} /> : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Settings);
