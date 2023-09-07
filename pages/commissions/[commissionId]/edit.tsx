import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useRouter } from "next/router";
import { GetOneProductAPI } from "@/api/product";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/components/util/session/context-user";
import { CreateOrUpdateFormCommission } from "@/components/commission/create-or-update-form-commission";

const ShopEdit = () => {
  const user = useAuth() as any;
  const { query } = useRouter();
  const productId = String(query?.productId);

  const { data: commission, isError: isErrorCommission, isLoading: isLoadingCommission } = GetOneProductAPI({
    productId,
    userId: user?.id,
  });

  const dataTableCommission =
    isLoadingCommission ? (
      <Spin
        tip="Loading"
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        size="large"
      >
        <div className="content" />
      </Spin>
    ) : isErrorCommission ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <CreateOrUpdateFormCommission
        commission={commission}
      />
    );

  return (
    <>
      <LayoutDashboard title={`${commission?.title ?? ""}`}>
        <div className="flex-1">
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
