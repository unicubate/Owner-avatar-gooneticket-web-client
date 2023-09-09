import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { GetUploadsAPI } from "@/api/upload";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/session/context-user";
import { LoadingFile } from "@/components/templates/loading-file";

const ShopEdit = () => {
  const user = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const { data: product, isError: isErrorProduct } = GetOneProductAPI({
    productId,
    userId: user?.id,
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: dataFileUploads,
  } = GetUploadsAPI({
    productId: productId,
    uploadType: 'file'
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    productId: productId,
    uploadType: 'image'
  });

  const dataTableProduct =
    isLoadingImageUploads ? (
      <LoadingFile />
    ) : isErrorFileUploads || isErrorImageUploads || isErrorProduct ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <CreateOrUpdateFormShop
        uploadFiles={dataFileUploads?.data}
        uploadImages={dataImageUploads?.data}
        product={product}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${product?.title ?? ""}`}>
        <div className="flex-1">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
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
