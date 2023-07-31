/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import Link from "next/link";
import {
  Button,
  Checkbox,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, TextInputPassword } from "@/components/util/form";
import { UserForgotPasswordFormModel } from "@/types/user.type";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { passwordResetUserAPI } from "../api/user";
import { PublicComponent } from "@/components/util/session/public-component";

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
    <Layout title="Forgot you password">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <h6 className="text-xl text-center font-bold">Forgot password?</h6>

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

          <div className="mt-6">
            {loading ? (
              <Button type="primary" size="large" loading block>
                Please wait...
              </Button>
            ) : (
              <Button type="primary" size="large" block htmlType="submit">
                Request Password Reset
              </Button>
            )}
          </div>
        </form>

        <Link href="/login">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </Layout>
  );
};

export default PublicComponent(ForgotPassword);
