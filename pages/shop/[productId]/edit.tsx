import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api-site/product";
import { useAuth } from "@/components/util/context-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { GetUploadsAPI } from "@/api-site/upload";

const ShopEdit = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = GetOneProductAPI({
    productId,
    organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    uploadType: "image",
    model: "product",
    organizationId: organizationId,
    uploadableId: productId,
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: dataFileUploads,
  } = GetUploadsAPI({
    uploadType: "file",
    model: "product",
    organizationId: organizationId,
    uploadableId: productId,
  });

  const dataTableProduct = isLoadingFileUploads || isLoadingImageUploads || isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorFileUploads || isErrorImageUploads || isErrorProduct ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <CreateOrUpdateFormShop
      uploadFiles={dataFileUploads}
      uploadImages={dataImageUploads}
      product={product}
    />
  );

  return (
    <>
      <LayoutDashboard title={`${product?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                {/* <HorizontalNavShop /> */}
                {dataTableProduct}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);
