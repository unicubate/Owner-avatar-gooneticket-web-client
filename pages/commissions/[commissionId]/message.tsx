import { GetOneCommissionAPI } from '@/api-site/commission';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const MessageEdit = () => {
  const { userStorage: user } = useAuth() as any;
  const { query } = useRouter();
  const commissionId = String(query?.commissionId);

  const {
    data: commission,
    isError: isErrorCommission,
    isLoading: isLoadingCommission,
  } = GetOneCommissionAPI({
    commissionId,
    organizationId: user?.organizationId,
  });

  // const {
  //   isError: isErrorImages,
  //   isLoading: isLoadingImages,
  //   data: uploadImages,
  // } = GetUploadsAPI({
  //   organizationId: commission?.organizationId,
  //   model: 'COMMISSION',
  //   uploadableId: commissionId,
  //   uploadType: 'image',
  // });

  const dataTableCommission = isLoadingCommission ? (
    <LoadingFile />
  ) : isErrorCommission ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : (
    <>null</>
  );

  return (
    <>
      <LayoutDashboard title={`${commission?.title || 'Commission'}`}>
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
