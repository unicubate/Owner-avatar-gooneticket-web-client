/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { Alert, Button, Checkbox, Input } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, TextInputPassword } from "@/components/ui";
import { UserRegisterFormModel } from "@/types/user.type";
import {
  loginUserAPI,
  registerGoogleUserAPI,
  registerUserAPI,
} from "../../api-site/user";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { PublicComponent } from "@/components/util/public-component";
import { ButtonInput } from "@/components/ui/button-input";
import { LayoutSite } from "@/components/layout-site";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  password: yup.string().min(8, "Minimum 8 symbols").required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  confirm: yup
    .boolean()
    .oneOf([true], "Please check the box to deactivate your account")
    .required(),
});

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    false
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormModel>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserRegisterFormModel> = async (
    payload: UserRegisterFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      const { data: user } = await registerUserAPI({
        ...payload,
        nextStep: "SETTING_PROFILE",
      });
      setHasErrors(false);
      setLoading(false);
      // localStorage.setItem(
      //   String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
      //   JSON.stringify(user?.accessToken)
      // );
      router.push(`${`/login`}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <LayoutSite title="Log In">
      <div className="w-full max-w-md p-6 m-auto mt-10 md:mt-16 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex justify-center mx-auto">
          <h6 className="mt-3 text-xl text-center font-bold">
            {`Sign up. It's free!`}
          </h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <div className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
              {hasErrors}
            </div>
          )}

          <div className="mb-4">
            <TextInput
              control={control}
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Full Name"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Full Name"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Email"
              type="text"
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
          </div>

          <div className="mb-4">
            <Controller
              name="confirm"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <div className="flex items-center">
                    <div className="flex">
                      <Checkbox checked={value} onChange={onChange} />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-700 font-bold"
                      >
                        I accept the{" "}
                        <Link
                          className="text-sm text-blue-600 hover:underline"
                          href="/forgot-password"
                        >
                          terms
                        </Link>{" "}
                        &{" "}
                        <Link
                          className="text-sm text-blue-600 hover:underline"
                          href="/forgot-password"
                        >
                          privacy policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </>
              )}
            />
            {errors?.confirm && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.confirm?.message}
              </span>
            )}
          </div>

          <div className="mt-6">
            <ButtonInput
              shape="default"
              type="submit"
              size="large"
              loading={loading}
              color={"indigo"}
            >
              Create account
            </ButtonInput>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            or login with Social Media
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <GoogleLogin
            size="large"
            width={400}
            useOneTap
            onSuccess={async (credentialResponse) => {
              try {
                await registerGoogleUserAPI({
                  token: String(credentialResponse.credential),
                });
                setHasErrors(false);
                router.push(`${`/login`}`);
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

        <Link href="/login">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
            {" "}
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </LayoutSite>
  );
};
export default PublicComponent(Register);
