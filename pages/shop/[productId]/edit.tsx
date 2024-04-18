import { GetOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI } from '@/api-site/upload';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormShop } from '@/components/shop/create-or-update-form-shop';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const ShopEdit = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
    refetch,
  } = GetOneProductAPI({
    productId,
    organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId,
    model: 'PRODUCT',
    uploadableId: productId,
    uploadType: 'image',
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: uploadsFiles,
  } = GetUploadsAPI({
    organizationId,
    model: 'PRODUCT',
    uploadableId: productId,
    uploadType: 'file',
  });

  const dataTableProduct =
    isLoadingProduct || isLoadingFileUploads || isLoadingImageUploads ? (
      <LoadingFile />
    ) : isErrorProduct || isErrorFileUploads || isErrorImageUploads ? (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <>
        {organizationId && product?.id ? (
          <CreateOrUpdateFormShop
            uploadFiles={uploadsFiles}
            uploadImages={uploadImages}
            product={product}
            refetch={refetch}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${product?.title || 'Shop'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {/* <HorizontalNavShop /> */}
            {dataTableProduct}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);
