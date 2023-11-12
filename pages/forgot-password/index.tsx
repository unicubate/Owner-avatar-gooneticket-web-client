/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserForgotPasswordFormModel } from "@/types/user.type";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { passwordResetUserAPI } from "../../api-site/user";
import { PublicComponent } from "@/components/util/public-component";
import { ButtonInput } from "@/components/ui/button-input";
import { LayoutSite } from "@/components/layout-site";
import { TextInput } from "@/components/ui/text-input";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForgotPasswordFormModel>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserForgotPasswordFormModel> = async (
    payload: UserForgotPasswordFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await passwordResetUserAPI(payload);
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Email send successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      reset();
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
    <div className="w-full max-w-sm py-12 p-6 m-auto mt-10 md:mt-16 mx-auto dark:bg-[#121212] rounded-lg shadow-md">
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="text-xl text-center font-bold">Forgot password?</h6>

        <div className="mt-4">
          <TextInput
            control={control}
            label="Email"
            type="text"
            name="email"
            placeholder="Email Address"
            errors={errors}
          />
        </div>

        <div className="mt-6">
          <ButtonInput
            shape="default"
            type="submit"
            size="large"
            loading={loading}
            color={"indigo"}
          >
            Request Password Reset
          </ButtonInput>
        </div>
      </form>

      <Link href="/login">
        <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
          Already have an account? Log in here
        </p>
      </Link>
    </div>
  );
};

export default PublicComponent(ForgotPassword);
