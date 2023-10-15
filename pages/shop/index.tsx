import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavShop } from "@/components/shop/horizontal-nav-shop";
import { useAuth } from "@/components/util/context-user";
import { EnableShop } from "@/components/shop/enable-shop";
import { TableProductsShop } from "@/components/shop/table-products-shop";

const Shops = () => {
  const { organizationId, profile } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={"Shop"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavShop />

                {profile?.id ? <EnableShop profile={profile} /> : null}

                <div className="flow-root">

                  {organizationId ? <TableProductsShop organizationId={organizationId} /> : null}

                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Shops);
