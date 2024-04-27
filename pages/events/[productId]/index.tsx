import { GetOneProductAPI } from '@/api-site/product';
import { GetOneUserPublicAPI } from '@/api-site/user';
import { PublicLastProductsEvent } from '@/components/event/public-last-products-event';
import { ViewProductsEvent } from '@/components/event/view-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { ProductSkeleton } from '@/components/skeleton/product-skeleton';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Skeleton } from '@/components/ui/skeleton';
import { itemsNumberArray } from '@/utils/utils';
import { useRouter } from 'next/router';

const ShopUserPublic = () => {
  const { query, push } = useRouter();
  const { userStorage: userBayer } = useInputState();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: product,
  } = GetOneProductAPI({
    enableVisibility: 'TRUE',
    productSlug: String(query?.productId),
  });

  const {
    isPending: isPendingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({
    username: product?.profile?.username,
    userVisitorId: userBayer?.id,
  });


  const dataItemProduct = isLoadingProduct ? (
    <ProductSkeleton index={0} />
  ) : isErrorProduct ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : (
    <ViewProductsEvent item={product} />
  );
  return (
    <>
      <LayoutUserPublicSite title={`${product?.title || 'Event'}`} user={user}>
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              <>
                <div className="my-4 border-gray-200 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">{dataItemProduct}</div>
                </div>

                <div className="my-4 lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                  <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                    <div className="flow-root">
                      {product?.id ? (
                        <PublicLastProductsEvent
                          userVisitor={{
                            id: user?.id,
                            organizationId: user?.organizationId,
                          }}
                        />
                      ) : (
                        itemsNumberArray(4).map((i, index) => (
                          <li key={index} className="ml-4 flex items-center space-x-2 py-2">
                            <Skeleton className="size-16 rounded-md" />
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </li>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>


      </LayoutUserPublicSite>

    </>
  );
};

export default ShopUserPublic;
