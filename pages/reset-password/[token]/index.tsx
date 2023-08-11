/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { Button } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInputPassword } from "@/components/util/form";
import { UserResetPasswordFormModel } from "@/types/user.type";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { resetPasswordAPI } from "../../../api/user";
import { useRouter } from "next/router";
import { PublicComponent } from "@/components/util/session/public-component";
import { ButtonInput } from "@/components/templates/button-input";

const schema = yup.object({
  newPassword: yup.string().min(8, "Minimum 8 symbols").required(),
  passwordConfirm: yup
    .string()
    .min(8, "Minimum 8 symbols")
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

const ResetPassword = () => {
  const router = useRouter();
  const { query } = useRouter();
  const token = String(query?.token);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserResetPasswordFormModel>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserResetPasswordFormModel> = async (
    payload: UserResetPasswordFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await resetPasswordAPI({ ...payload, token });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Email send successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      reset();
      router.push(`${`/login`}`);
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
    <Layout title="Forgot you password">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex justify-center mx-auto">
          <h6 className="mt-3 text-xl font-bold">{`Reset password?`}</h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInputPassword
              control={control}
              label="Password"
              type="password"
              name="newPassword"
              placeholder="Password"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInputPassword
              control={control}
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ButtonInput shape="default" type="submit" size="normal" loading={loading} color={loading ? 'gray' : 'indigo'}>
              Log In
            </ButtonInput>
          </div>
        </form>

        {/* <Link href="/login">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
            Already have an account? Log in here
          </p>
        </Link> */}
      </div>
    </Layout>
  );
};

export default PublicComponent(ResetPassword);
