import { GetOneUserPublicAPI } from '@/api-site/user';
import { PublicCommissions } from '@/components/commission/public-commissions';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CommissionsUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  useEffect(() => {
    if (user?.profile?.enableCommission === false) {
      push(`${`/${username}`}`);
    }
  }, [user, push, username]);

  return (
    <>
      <LayoutUserPublicSite
        title={`Commissions - ${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        {/* <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            <div className="grid grid-cols-1 gap-6 py-2 sm:mt-12 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-2">
              {user?.id ? (
                <PublicCommissions organizationId={user?.organizationId} />
              ) : null}
            </div>
          </div>
        </div> */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
              <div className="flow-root">
                <div className="mx-auto sm:px-6 md:px-8">
                  {user?.id ? (
                    <PublicCommissions organizationId={user?.organizationId} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : null}
    </>
  );
};

export default CommissionsUserPublic;
