/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserLoginFormModel } from "@/types/user.type";
import { loginGoogleUserAPI, loginUserAPI } from "../../api-site/user";
import { AlertDangerNotification } from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { PublicComponent } from "@/components/util/public-component";
import { LayoutSite } from "@/components/layout-site";
import { TextInput, TextInputPassword, ButtonInput } from "@/components/ui";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useReactHookForm } from "@/components/hooks/use-react-hook-form";
import { GetStaticPropsContext } from "next";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  password: yup.string().min(8, "Minimum 8 symbols").required(),
});

const Login = () => {
  const router = useRouter();
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });
      // if (user?.nextStep === "SETTING_PROFILE") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-profile`;
      // } else if (user?.nextStep === "SETTING_INTEREST") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-interest`;
      // } else if (user?.nextStep === "CONFIRM_EMAIL") {
      //   await resendCodeAPI({ userId: user?.id });
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/confirm-account`;
      // } else if (user?.nextStep === "COMPLETE_REGISTRATION") {
      //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
      // }
      localStorage.setItem(
        String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
        JSON.stringify(user?.accessToken)
      );
      setHasErrors(false);
      setLoading(false);
      window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: "An error has occurred.",
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <div className="w-full max-w-sm py-12 p-6 m-auto mt-10 md:mt-16 mx-auto dark:bg-[#121212] rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex justify-center mx-auto">
          <h6 className="mt-3 text-xl text-center font-bold">
            {`Log in to your account`}
          </h6>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <div className="relative mb-4 block w-full rounded-lg dark:bg-red-500 p-4 text-base leading-5 dark:text-white opacity-100">
              {hasErrors}
            </div>
          )}

          <div className="mb-4">
            <TextInput
              control={control}
              label="Email"
              type="email"
              name="email"
              placeholder="Email Address"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInputPassword
              control={control}
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              errors={errors}
            />
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm mb-2 dark:dark:text-white"
              ></label>
              <Link
                className="text-sm dark:text-blue-600 decoration-2 hover:underline font-medium"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <ButtonInput
              shape="default"
              type="submit"
              size="large"
              loading={loading}
              color={"indigo"}
            >
              Log In
            </ButtonInput>
          </div>
        </form>
        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <p className="text-xs text-center dark:text-gray-500 uppercase dark:dark:text-gray-400">
            or login with Social Media
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <GoogleLogin
            size="large"
            width={330}
            useOneTap
            onSuccess={async (credentialResponse) => {
              try {
                const { data: user } = await loginGoogleUserAPI({
                  token: String(credentialResponse.credential),
                });
                localStorage.setItem(
                  String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
                  JSON.stringify(user?.accessToken)
                );
                setHasErrors(false);
                window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
              } catch (error: any) {
                setHasErrors(true);
                setHasErrors(error.response.data.message);
                AlertDangerNotification({
                  text: "An error has occurred.",
                  gravity: "top",
                  className: "info",
                  position: "center",
                });
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>

        <Link href="/register">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer dark:hover:text-blue-600">
            {" "}
            New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
          </p>
        </Link>
      </div>
    </>
  );
};

export default PublicComponent(Login);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}.json`)).default,
      }
    }
  }
}