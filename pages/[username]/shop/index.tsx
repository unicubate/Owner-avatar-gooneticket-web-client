import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import PublicShop from "@/components/shop/public-shop";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { ErrorFile } from "@/components/ui/error-file";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { GetOneCartOrderAPI } from "@/api-site/cart";
import { CartOrderFooterCart } from "@/components/cart/cart-order-footer-cart";
import { GetStaticPropsContext } from "next";

const ShopUserPublic = () => {
  const { userStorage: userVisitor } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status: statusUser, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisitor?.id,
  });

  const { status, data: cartOrder } = GetOneCartOrderAPI({
    organizationId: user?.organizationId,
  });

  if (user?.profile?.enableShop === false) {
    push(`${`/${username}`}`);
  }

  return (
    <>
      <LayoutUserPublicSite
        title={`Shop - ${user?.profile?.firstName ?? ""} ${
          user?.profile?.lastName ?? ""
        }`}
        user={user}
      >
        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                {user?.id && user?.profile.enableShop ? (
                  <PublicShop organizationId={user?.organizationId} />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {user?.id && cartOrder?.id ? (
          <CartOrderFooterCart user={user} cartOrder={cartOrder} />
        ) : null}
      </LayoutUserPublicSite>

      {statusUser === "pending" ? <LoadingFile /> : null}

      {statusUser === "error" ? (
        <ErrorFile
          status="error"
          title="404"
          description="Error find data please try again"
        />
      ) : null}
    </>
  );
};

export default ShopUserPublic;

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
      },
    },
  };
}
