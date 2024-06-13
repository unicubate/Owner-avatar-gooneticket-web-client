/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { ProductModel } from '@/types/product';
import { UserVisitorModel } from '@/types/user';
import { itemsNumberArray } from '@/utils/utils';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Skeleton } from '../ui/skeleton';
import { ListLastProductsEvent } from './list-last-products-event';

export function PublicLastProductsEvent({
  userVisitor,
}: {
  userVisitor: UserVisitorModel;
}) {
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    data: dataProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    take: 6,
    sort: 'DESC',
    organizationId: userVisitor?.organizationId,
    status: 'ACTIVE',
    expired: 'FALSE',
    modelIds: ['EVENT'],
  });

  const dataTable = isLoadingProducts ? (
    <>
      {itemsNumberArray(4).map((i, index) => (
        <li key={index} className="flex items-center space-x-2 py-2">
          <Skeleton className="size-16 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </li>
      ))}
    </>
  ) : isErrorProducts ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataProducts?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    <>
      <div className="mt-8 flow-root">
        <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
          {dataProducts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: ProductModel, index) => (
              <ListLastProductsEvent item={item} key={index} />
            ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        {userVisitor?.organizationId && (
          <h3 className="font-bold dark:text-white">More events</h3>
        )}
        {dataTable}

        <div className="mx-auto mt-4 justify-center text-center">
          {hasNextPage && (
            <ButtonLoadMore
              isFetchingNextPage={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          )}
        </div>
      </div>
    </>
  );
}
