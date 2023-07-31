/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { Alert, Button, Checkbox, Input } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DateInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  TextInputPassword,
} from "@/components/util/form";
import { UserRegisterFormModel } from "@/types/user.type";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { getOneUserAPI, resendCodeAPI, validCodeAPI } from "@/pages/api/user";
import { useQuery } from "@tanstack/react-query";
import { PrivateComponent } from "@/components/util/session/private-component";
import { useAuth } from "@/components/util/session/context-user";

const schema = yup.object({
  code: yup.string().max(8, "Maximum 8 symbols").required(),
});

const ConfirmAccount = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  
  if (user?.nextStep === "COMPLETE_REGISTRATION") {
    router.push(`${`/profile`}`);
  }

  const onSubmit: SubmitHandler<{ code: string }> = async (payload: {
    code: string;
  }) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await validCodeAPI({ ...payload, nextStep: "COMPLETE_REGISTRATION" });
      setHasErrors(false);
      setLoading(false);
      router.push(`${`/profile`}`);
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

  const resendCode = async () => {
    try {
      await resendCodeAPI({ userId: user?.id });
      AlertSuccessNotification({
        text: "Code verification send successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
    } catch (error) {
      AlertDangerNotification({
        text: "An error has occurred.",
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <Layout title="Log In">
      <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex mx-auto">
          <h6 className="mt-3 text-xl font-bold">{`Confirm your account`}</h6>
        </div>
        <div className="flex mx-auto">
          <p>
            We sent a verification code to:{" "}
            <span className="font-bold">{user?.email}</span>
          </p>
        </div>

        <div className="flex mx-auto">
          <p className="text-sm text-blue-600 decoration-2 font-medium cursor-pointer">
            Check your inbox
          </p>
        </div>

        <div className="flex mx-auto">
          <span>Follow the link in the email, or enter the code bellow</span>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              control={control}
              label="Code"
              type="text"
              name="code"
              placeholder="Code"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            {loading ? (
              <Button type="primary" size="large" loading block>
                Please wait...
              </Button>
            ) : (
              <Button type="primary" size="large" block htmlType="submit">
                Continue
              </Button>
            )}
          </div>
        </form>

        <div className="flex mx-auto">
          <p className="mt-3 text-sm">{`If you don't get email after a few minutes, tap below to resend`}</p>
        </div>
        <div className="flex mx-auto" onClick={() => resendCode()}>
          <p className="text-sm text-blue-600 hover:underline font-medium cursor-pointer">
            Resend code
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivateComponent(ConfirmAccount);
