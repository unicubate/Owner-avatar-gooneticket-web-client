import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { PublicMemberships } from "@/components/membership/public-memberships";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";

const MembershipsUserPublic = () => {
  const { query, push } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  const publicMemberships = isLoadingUser ? (
    <LoadingFile />
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <>{user?.id ? <PublicMemberships organizationId={user?.organizationId} /> : null}</>
  );

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`}
        user={user}>
        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}


          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-2 sm:mt-12 sm:grid-cols-2 lg:grid-cols-2">

                {publicMemberships}

              </div>
            </div>
          </div>

        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default MembershipsUserPublic;
