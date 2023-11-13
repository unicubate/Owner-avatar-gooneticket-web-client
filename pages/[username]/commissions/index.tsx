import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { PublicCommissions } from "@/components/commission/public-commissions";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { useAuth } from "@/components/util/context-user";
import { ErrorFile } from "@/components/ui/error-file";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { GetStaticPropsContext } from "next";

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

  if (user?.profile?.enableCommission === false && !user?.commission?.count) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`Commissions - ${user?.profile?.firstName ?? ""} ${
          user?.profile?.lastName ?? ""
        }`}
        user={user}
      >
        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
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
        ...(await import(`/lang/${locale}.json`)).default,
      },
    },
  };
}
