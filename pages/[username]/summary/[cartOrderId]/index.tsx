"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { GetCartsAPI, GetOneCartOrderAPI } from "@/api-site/cart";
import { useAuth } from "@/components/util/context-user";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { formatePrice } from "@/utils";
import { PrivateComponent } from "@/components/util/private-component";
import {LoadingFile } from "@/components/ui-setting/ant";
import { ListMiniCats } from "@/components/cart/list-mini-carts";
import { ErrorFile } from "@/components/ui-setting/ant/error-file";
import { CreatePaymentPayPal } from "@/components/payment/create-payment-paypal";
import { CreatePaymentStripe } from "@/components/payment/stripe/create-payment-stripe";
import { useState } from "react";
import { GetStaticPropsContext } from "next";
import { ButtonInput } from "@/components/ui-setting";

const Summary = () => {
  const [isCardPay, setIsCardPay] = useState<boolean>(false);
  const { userStorage: userVisitor } = useAuth() as any;
  const { query, push } = useRouter();
  const cartOrderId = String(query?.cartOrderId);
  const username = String(query?.username);

  const { status: statusUser, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisitor?.id,
  });

  const { status, data: cartOrder } = GetOneCartOrderAPI({
    organizationId: user?.organizationId,
  });

  const {
    isLoading: isLoadingCart,
    isError: isErrorCart,
    data: carts,
  } = GetCartsAPI({
    cartOrderId: cartOrderId,
    userId: cartOrder?.userId,
    organizationId: user?.organizationId,
  });

  const dataTableCarts = isLoadingCart ? (
    <LoadingFile />
  ) : isErrorCart ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
  ) : (
    carts?.cartItems.map((item, index: number) => (
      <ListMiniCats item={item as any} key={index} index={index} />
    ))
  );

  const newAmount = {
    currency: carts?.cartItems[0]?.product?.currency?.code,
    value: carts?.summary?.totalPrice,
  };

  if (Number(carts?.summary?.totalPrice) <= 0) {
    push(`${`/${username}/shop`}`);
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex items-center justify-center">
          <h1 className="text-2xl font-bold dark:text-white">
            Shopping Cart
          </h1>
          <span className="ml-4 rounded-full bg-gray-400 px-2 py-1 text-xs font-bold uppercase tracking-widest text-gray-50 dark:bg-gray-800">
            {carts?.summary?.totalQuantity ?? 0} products
          </span>
        </div>

        <div className="mx-auto mt-10 max-w-xl md:mt-12">
          <div className="mt-2 flex items-center justify-between py-2">
            <label className="mb-2 block text-sm dark:text-white"></label>
            <Link
              className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
              href={`/${username}/shop`}
            >
              Continue Shopping
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-[#121212]">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                  {dataTableCarts}
                </ul>
              </div>

              <hr className="border-gray-200 dark:border-gray-800" />
              <div className="mt-6 flex items-center justify-between">
                <p className="text-3xl font-bold dark:text-white">
                  Total
                </p>
                {newAmount?.value ? (
                  <>
                    <p className="ml-auto text-xl font-bold dark:text-white">
                      {formatePrice({
                        value: Number(newAmount?.value),
                        isDivide: false,
                      }) ?? ""}
                    </p>
                    <p className="ml-1 text-xl font-bold dark:text-white">
                      {newAmount?.currency}
                    </p>
                  </>
                ) : null}
              </div>

              <>
                {isCardPay ? (
                  <>
                    <CreatePaymentStripe
                      paymentModel="STRIPE-SHOP"
                      data={{
                        cartOrderId,
                        amount: newAmount,
                        userReceiveId: cartOrder?.userId,
                        userSendId: userVisitor?.id,
                        organizationId: cartOrder?.organizationId,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="mt-2">
                      <ButtonInput
                        onClick={() => setIsCardPay(true)}
                        type="button"
                        size="lg"
                        className="w-full"
                        variant="info"
                      >
                        Card Pay
                      </ButtonInput>
                    </div>
                  </>
                )}

                <CreatePaymentPayPal
                  paymentModel="PAYPAL-SHOP"
                  data={{
                    cartOrderId,
                    amount: newAmount,
                    userReceiveId: cartOrder?.userId,
                    userSendId: userVisitor?.id,
                    organizationId: cartOrder?.organizationId,
                  }}
                />
              </>
              {/* <div className="mt-2 text-center">
                <ButtonInput
                    minW="fit"
                    shape="default"
                    type="button"
                    size="large"
                    loading={false}
                    color={"indigo"}
                  >
                    Continue to Payment
                  </ButtonInput>

                <p className="mt-4 text-sm font-normal text-gray-500">
                  All the taxes will be calculated while checkout
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateComponent(Summary);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      }
    }
  }
}