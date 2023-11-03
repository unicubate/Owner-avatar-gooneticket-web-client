import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import PublicShop from "@/components/shop/public-shop";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { ErrorFile } from "@/components/ui/error-file";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { Badge } from "antd";
import { BiCart } from "react-icons/bi";
import { ButtonInput } from "@/components/ui";

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
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : (
    <>
      {user?.id ? <PublicShop organizationId={user?.organizationId} /> : null}
    </>
  );

  if (user?.profile?.enableShop === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""
          }`}
        user={user}
      >
        <div className="flex flex-col flex-1 bg-gray-100">
          <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-full mx-auto py-6">

                {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}


                <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                  {dataTableProducts}
                </div>

              </div>
            </div>
          </div>
        </div>


        <div className="flex fixed bottom-0 w-full items-center justify-center mb-16 py-2 z-20">
          <div className="relative w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="px-3 pt-3 pb-4">
              <div className="flex items-center justify-between">
                <Badge count={5}>
                  <BiCart className="h-10 w-10" />
                </Badge>
                <p className="ml-3 text-xl font-bold dark:text-gray-900">10 EUR</p>

                <div className="flex pl-8 ml-auto">
                  <ButtonInput
                    shape="default"
                    type="button"
                    size="large"
                    loading={false}
                    color="indigo"
                    minW="fit"
                  >
                    Checkout
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </div>

      </LayoutUserPublicSite>
    </>
  );
};

export default ShopUserPublic;
