import { GetOneProductAPI } from '@/api-site/product';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const MessageEdit = () => {
  const { userStorage: user } = useInputState();
  const { query } = useRouter();
  const productId = String(query?.commissionId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = GetOneProductAPI({
    productId,
    organizationId: user?.organizationId,
  });

  const dataTableCommission = isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorProduct ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : (
    <>null</>
  );

  return (
    <>
      <LayoutDashboard title={`${product?.title || 'Commission'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {dataTableCommission}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MessageEdit);

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
