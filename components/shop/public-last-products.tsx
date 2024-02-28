/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteProductsAPI } from '@/api-site/product';
import { ProductModel } from '@/types/product';
import { UserVisitorModel } from '@/types/user.type';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ButtonLoadMore } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ListLastProducts } from './list-last-products';

export function PublicLastProducts(props: { userVisitor: UserVisitorModel }) {
  const { userVisitor } = props;
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
  });

  const dataTable = isLoadingProducts ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorProducts ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataProducts?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    <>
      <div className="mt-8 flow-root">
        <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
          {dataProducts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: ProductModel, index) => (
              <ListLastProducts item={item} key={index} />
            ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        <h3 className="font-bold dark:text-white">More from Shop</h3>
        {dataTable}
        <div className="mt-4 mx-auto justify-center text-center">
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
