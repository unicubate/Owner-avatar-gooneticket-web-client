import { GetAllCategoriesAPI } from '@/api-site/category';
import { GetOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI } from '@/api-site/upload';
import { CreateOrUpdateFormEvent } from '@/components/event/create-or-update-form-event';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';

const ShopEdit = () => {
  const { locale, userStorage } = useInputState();
  const { query } = useRouter();
  const productId = String(query?.productId);

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'FALSE',
    organizationId: userStorage?.organizationId,
    sort: 'DESC',
    take: 100,
  });

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
    refetch,
  } = GetOneProductAPI({
    productId,
    organizationId: userStorage?.organizationId,
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId: userStorage?.organizationId,
    model: 'EVENT',
    uploadableId: productId,
    uploadType: 'image',
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: uploadsFiles,
  } = GetUploadsAPI({
    organizationId: userStorage?.organizationId,
    model: 'EVENT',
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
        {userStorage?.organizationId && product?.id ? (
          <CreateOrUpdateFormEvent
            uploadFiles={uploadsFiles}
            uploadImages={uploadImages}
            product={product}
            refetch={refetch}
            categories={categories}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`Edit ${product?.title || 'Event'}`}>
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
