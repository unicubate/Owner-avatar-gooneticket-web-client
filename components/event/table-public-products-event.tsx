/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { ProductModel } from '@/types/product';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListPublicProductsEvent } from './list-public-products-event';


const TablePublicProductsEvent = ({ organizationId }: { organizationId: string }) => {
  const { t, userStorage: user } = useInputState();
  const { search } = useInputState();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: dataProduct,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    search,
    take: 10,
    sort: 'DESC',
    modelIds: ['EVENT'],
    organizationId
  });


  const dataTableProducts = isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorProduct ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataProduct?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataProduct?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: ProductModel, index: number) => (
        <ListPublicProductsEvent item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">

        {dataTableProducts}

      </div>

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
