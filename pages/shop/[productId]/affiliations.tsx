import { GetOneProductAPI } from '@/api-site/product';
import { TableAffiliations } from '@/components/affiliation/table-affiliations';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ButtonInput } from '@/components/ui-setting';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/router';

const Affiliates = () => {
  const { push, query } = useRouter();
  const { userStorage } = useInputState();
  const productId = String(query?.productId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
    refetch,
  } = GetOneProductAPI({
    productId,
    organizationId: userStorage?.organizationId,
  });

  return (
    <>
      <LayoutDashboard title={'Affiliates'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="sm:flex sm:items-center sm:justify-between">
                <ButtonInput
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => push(`/shop/extras`)}
                  icon={<MoveLeft className="size-4" />}
                />
              </div>
              {product?.id ? (
                <TableAffiliations
                  product={product}
                  organizationId={userStorage?.organizationId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Affiliates);
