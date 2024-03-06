import { GetOneMembershipAPI } from '@/api-site/membership';
import { GetUploadsAPI } from '@/api-site/upload';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormMembership } from '@/components/membership/create-or-update-form-membership';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const ShopEdit = () => {
  const { userStorage: user } = useInputState();
  const { query } = useRouter();
  const membershipId = String(query?.membershipId);

  const {
    data: membership,
    isError: isErrorMembership,
    isLoading: isLoadingMembership,
    refetch,
  } = GetOneMembershipAPI({
    membershipId,
    organizationId: user?.organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: 'image',
    model: 'membership',
    organizationId: user?.organizationId,
    uploadableId: membershipId,
  });

  const dataTableMembership =
    isLoadingImageUploads || isLoadingMembership ? (
      <LoadingFile />
    ) : isErrorImageUploads || isErrorMembership ? (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <CreateOrUpdateFormMembership
        membership={membership}
        uploadImages={dataImageUploads}
        refetch={refetch}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${membership?.title || 'Membership'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {dataTableMembership}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);

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
