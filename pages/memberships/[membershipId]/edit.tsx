import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui-setting/ant/loading-file";
import { GetOneMembershipAPI } from "@/api-site/membership";
import { CreateOrUpdateFormMembership } from "@/components/membership/create-or-update-form-membership";
import { GetUploadsAPI } from "@/api-site/upload";
import { ErrorFile } from "@/components/ui-setting/ant/error-file";
import { GetStaticPropsContext } from "next";

const ShopEdit = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const membershipId = String(query?.membershipId);

  const {
    data: membership,
    isError: isErrorMembership,
    isLoading: isLoadingMembership,
  } = GetOneMembershipAPI({
    membershipId,
    organizationId: organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "membership",
    organizationId: organizationId,
    uploadableId: membershipId,
  });

  const dataTableMembership =
    isLoadingImageUploads || isLoadingMembership ? (
      <LoadingFile />
    ) : isErrorImageUploads || isErrorMembership ? (
      <ErrorFile
        status="error"
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <CreateOrUpdateFormMembership
        membership={membership}
        uploadImages={dataImageUploads}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${membership?.title || "Membership"}`}>
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
    fallback: true
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}