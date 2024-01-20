/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BiCart } from "react-icons/bi";
import { ButtonInput } from "../ui-setting/ant";
import { UserModel } from "@/types/user.type";
import { GetCartsAPI, GetOneCartOrderAPI } from "@/api-site/cart";
import { ErrorFile } from "../ui-setting/ant/error-file";
import { CartOrderModel } from "@/types/cart";
import { useRouter } from "next/router";

const CartOrderFooterCart: React.FC<{
  user: UserModel;
  cartOrder: CartOrderModel;
}> = ({ user, cartOrder }) => {
  const { push } = useRouter();
  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: carts,
  } = GetCartsAPI({
    cartOrderId: cartOrder?.id,
    userId: cartOrder?.userId,
    organizationId: user?.organizationId,
  });

  return (
    <>
      {carts?.summary?.totalQuantity && (
        <div className="fixed bottom-0 z-20 mb-16 flex w-full items-center justify-center py-2">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg dark:bg-[#121212]">
            <div className="px-3 pb-4 pt-3">
              <div className="flex items-center justify-between">
                {carts?.cartItems.length > 0 ? (
                  <>
                    <div className="relative">
                      <button
                        type="button"
                        className="rounded-full bg-white text-gray-700 transition-all duration-200 hover:text-gray-900 dark:bg-[#121212] dark:hover:text-white"
                      >
                        <BiCart className="size-10 bg-white dark:bg-[#121212]" />
                      </button>
                      <span className="absolute -right-1 -top-px inline-flex items-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                      {carts?.summary?.totalQuantity}
                      </span>
                    </div>

                    <p className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                      {carts?.summary?.totalPrice} {user?.profile?.currency?.symbol}
                    </p>

                    <div className="ml-auto flex pl-8">
                      <ButtonInput
                        shape="default"
                        type="button"
                        size="large"
                        loading={false}
                        color="indigo"
                        minW="fit"
                        onClick={() => push(`/${user?.username}/summary/${cartOrder?.id}`) }
                      >
                        Checkout
                      </ButtonInput>
                    </div>
                  </>
                ) : null}

                {isErrorCart ? (
                  <ErrorFile
                    status="error"
                    title="404"
                    description="Error find data please try again"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { CartOrderFooterCart };
