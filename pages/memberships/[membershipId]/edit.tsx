import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/session/context-user";
import { LoadingFile } from "@/components/templates/loading-file";
import { GetOneMembershipAPI } from "@/api/membership";
import { CreateOrUpdateFormMembership } from "@/components/membership/create-or-update-form-membership";
import { GetUploadsAPI } from "@/api/upload";

const ShopEdit = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const membershipId = String(query?.membershipId);

  const {
    data: membership,
    isError: isErrorMembership,
    isLoading: isLoadingMembership,
  } = GetOneMembershipAPI({
    membershipId,
    userId: userStorage?.id,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "membership",
    userId: userStorage?.id,
    uploadableId: membershipId,
  });

  const dataTableMembership = isLoadingImageUploads || isLoadingMembership ? (
    <LoadingFile />
  ) : isErrorImageUploads || isErrorMembership ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <CreateOrUpdateFormMembership
      membership={membership}
      uploadImages={dataImageUploads?.data}
    />
  );

  return (
    <>
      <LayoutDashboard title={`${membership?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTableMembership}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);
