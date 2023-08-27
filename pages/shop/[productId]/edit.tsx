import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { Image, Input } from "antd";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { ButtonInput } from "@/components/templates/button-input";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { GetUploadsProductsAPI } from "@/api/upload";
import { Alert, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/session/context-user";

const ShopEdit = () => {
  const user = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const { data: dataProduct, isError: isErrorProduct } = GetOneProductAPI({
    productId,
    userId: user?.id,
  });
  const product: any = dataProduct?.data;

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: dataFileUploads,
  } = GetUploadsProductsAPI({
    productId: product?.id,
    uploadType: 'file'
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsProductsAPI({
    productId: product?.id,
    uploadType: 'image'
  });

  const dataTableProduct =
    isLoadingImageUploads ? (
      <Spin
        tip="Loading"
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        size="large"
      >
        <div className="content" />
      </Spin>
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
