/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { ProductModel } from '@/types/product';
import { itemsNumberArray } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks';
import { ProductEventSkeleton } from '../skeleton/product-event-skeleton';
import { ButtonLoadMore } from '../ui-setting';
import { EmptyData } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListPublicProductsEvent } from './list-public-products-event';

const TablePublicProductsEvent = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { t, userStorage: user } = useInputState();
  const { search } = useInputState();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    data: dataProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    search,
    take: 10,
    sort: 'DESC',
    modelIds: ['EVENT'],
    organizationId,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingProducts ? (
          itemsNumberArray(3).map((i, index) => (
            <ProductEventSkeleton key={i} index={index} />
          ))
        ) : isErrorProducts ? (
          <ErrorFile
            title="404"
            description="Error find data please try again..."
          />
        ) : Number(dataProducts?.pages[0]?.data?.total) <= 0 ? (
          ''
        ) : (
          dataProducts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: ProductModel, index: number) => (
              <ListPublicProductsEvent item={item} key={index} index={index} />
            ))
        )}
      </div>

      {Number(dataProducts?.pages[0]?.data?.total) <= 0 ? (
        <EmptyData
          image={<TicketIcon className="size-10" />}
          title="This creator hasn't published anything yet!"
          description={`When he does, his publications will appear here first.`}
        />
      ) : null}

      {hasNextPage && (
        <div className="mx-auto justify-center text-center">
          <ButtonLoadMore
            className="w-[240px]"
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};
export { TablePublicProductsEvent };
