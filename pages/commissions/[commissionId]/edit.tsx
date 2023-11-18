import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/context-user";
import { CreateOrUpdateFormCommission } from "@/components/commission/create-or-update-form-commission";
import { GetOneCommissionAPI } from "@/api-site/commission";
import { GetUploadsAPI } from "@/api-site/upload";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetStaticPropsContext } from "next";

const ShopEdit = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const commissionId = String(query?.commissionId);

  const {
    data: commission,
    isError: isErrorCommission,
    isLoading: isLoadingCommission,
  } = GetOneCommissionAPI({
    commissionId,
    organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "commission",
    organizationId,
    uploadableId: commissionId,
  });

  const dataTableCommission =
    isLoadingImageUploads || isErrorCommission ? (
      <LoadingFile />
    ) : isErrorImageUploads ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <CreateOrUpdateFormCommission
        commission={commission}
        uploadImages={dataImageUploads}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${commission?.title || "Commission"}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTableCommission}
              </div>
            </div>
          </main>
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