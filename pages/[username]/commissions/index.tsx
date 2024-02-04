import { GetOneUserPublicAPI } from '@/api-site/user';
import { PublicCommissions } from '@/components/commission/public-commissions';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { useAuth } from '@/components/util/context-user';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const CommissionsUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username, userVisitorId: userVisiter?.id });

  const publicCommissions = isLoadingUser ? (
    <LoadingFile />
  ) : isErrorUser ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : (
    <>
      {user?.id ? (
        <PublicCommissions organizationId={user?.organizationId} />
      ) : null}
    </>
  );

  if (user?.profile?.enableCommission === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`Commissions - ${user?.profile?.firstName ?? ''} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-full py-6">
              {/* {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null} */}

              <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    {publicCommissions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default CommissionsUserPublic;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
