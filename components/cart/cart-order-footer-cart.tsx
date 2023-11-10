/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BiCart } from "react-icons/bi";
import { ButtonInput } from "../ui";
import { UserModel } from "@/types/user.type";
import { GetCartsAPI, GetOneCartOrderAPI } from "@/api-site/cart";
import { ErrorFile } from "../ui/error-file";
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
        <div className="flex fixed bottom-0 w-full items-center justify-center mb-16 py-2 z-20">
          <div className="relative w-full max-w-md overflow-hidden bg-white dark:bg-black rounded-lg shadow-lg">
            <div className="px-3 pt-3 pb-4">
              <div className="flex items-center justify-between">
                {carts?.cartItems.length > 0 ? (
                  <>
                    <div className="relative">
                      <button
                        type="button"
                        className="text-gray-700 transition-all duration-200 bg-white dark:bg-black rounded-full hover:text-gray-900 dark:hover:text-white"
                      >
                        <BiCart className="h-10 w-10 bg-white dark:bg-black" />
                      </button>
                      <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white">
                      {carts?.summary?.totalQuantity}
                      </span>
                    </div>

                    <p className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                      {carts?.summary?.totalPrice} {user?.profile?.currency?.symbol}
                    </p>

                    <div className="flex pl-8 ml-auto">
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
