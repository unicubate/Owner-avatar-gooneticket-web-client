import { GetOneCartOrderAPI } from '@/api-site/cart';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { CartOrderFooterCart } from '@/components/cart/cart-order-footer-cart';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { PublicShop } from '@/components/shop/public-shop';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ShopUserPublic = () => {
  const { userStorage: userVisiter } = useInputState();
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  const {
    isPending: isPendingCartOrder,
    isError: isErrorCartOrder,
    data: cartOrder,
  } = GetOneCartOrderAPI({
    organizationSellerId: user?.organizationId,
  });

  useEffect(() => {
    if (user?.profile?.enableShop === false) {
      push(`${`/${username}`}`);
    }
  }, [user, username]);

  return (
    <>
      <LayoutUserPublicSite
        title={`Shop - ${user?.profile?.firstName ?? 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            <div className="mt-2 grid grid-cols-1 gap-6 py-2 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-3">
              {user?.id && user?.profile.enableShop ? (
                <PublicShop organizationId={user?.organizationId} />
              ) : null}
            </div>
          </div>
        </div>

        {userVisiter?.id && user?.id && cartOrder?.id ? (
          <CartOrderFooterCart user={user} cartOrder={cartOrder} />
        ) : null}
      </LayoutUserPublicSite>

      {status === 'pending' && isPendingCartOrder ? <LoadingFile /> : null}

      {status === 'error' && isErrorCartOrder ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
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
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
