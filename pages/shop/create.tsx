import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { CreateOrUpdateFormShop } from "@/components/shop/create-or-update-form-shop";

const ShopCreate = () => {
  return (
    <>
      <LayoutDashboard title={"New product"}>
        <div className="max-w-4xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

            <CreateOrUpdateFormShop />

          </div>

        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopCreate);
