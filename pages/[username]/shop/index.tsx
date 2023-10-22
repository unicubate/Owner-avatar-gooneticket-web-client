import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import PublicShop from "@/components/shop/public-shop";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";

const ShopUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username, userVisitorId: userVisiter?.id });


  const dataTableProducts = isLoadingUser ? (
    <LoadingFile />
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <>{user?.id ? <PublicShop organizationId={user?.organizationId} /> : null}</>
  );

  if (user?.profile?.enableShop === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`}
        user={user}>

        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}


          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">

                {dataTableProducts}

              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default ShopUserPublic;
