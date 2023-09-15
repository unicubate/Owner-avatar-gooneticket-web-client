import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { useAuth } from "@/components/util/session/context-user";
import { LoadingFile } from "@/components/templates/loading-file";

const ShopEdit = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = GetOneProductAPI({
    productId,
    userId: userStorage?.id,
  });

  const dataTableProduct = isLoadingProduct ? (
      <LoadingFile />
    ) : isErrorProduct ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <CreateOrUpdateFormShop
        uploadFiles={product?.uploadsFile}
        uploadImages={product?.uploadsImage }
        product={product}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${product?.title ?? ""}`}>
        <div className="flex-1 bg-gray-100">
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
