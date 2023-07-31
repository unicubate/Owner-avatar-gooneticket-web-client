/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/components/layout";
import { Alert, Button, Checkbox, Input, Upload, UploadFile } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DateInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "@/components/util/form";
import { AlertDangerNotification } from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/session/context-user";
import { PrivateComponent } from "@/components/util/session/private-component";
import { updateOneProfileNextStepAPI } from "@/pages/api/profile";
import { NextStepProfileFormModel } from "@/types/profile.type";
import { UploadOutlined } from "@ant-design/icons";

const schema = yup.object({
  username: yup.string().required(),
});

const SettingInterest = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (user?.nextStep === "CONFIRM_EMAIL") {
    router.push(`${`/register/${userId}/confirm-account`}`);
  }

  const onSubmit: SubmitHandler<NextStepProfileFormModel> = async (
    payload: NextStepProfileFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await updateOneProfileNextStepAPI({
        ...payload,
        nextStep: "CONFIRM_EMAIL",
        userId: userId,
      });
      setHasErrors(false);
      setLoading(false);
      router.push(`${`/register/${userId}/confirm-account`}`);
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
    <Layout title="Log In">
      <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex justify-center mx-auto">
          <h6 className="mt-3 text-xl text-center font-bold">
            {`Complete your profile`}
          </h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              name="attachment"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <div className="text-center justify-center mx-auto">
                    <Upload
                      //action=""
                      name="attachment"
                      listType="picture"
                      maxCount={1}
                      className="upload-list-inline"
                      onChange={onChange}
                      defaultFileList={[...fileList]}
                    >
                      {fileList.length > 0 ? null : (
                        <Button
                          size="small"
                          style={{ width: "100%" }}
                          icon={<UploadOutlined />}
                          className="text-center"
                        >
                          Choose Image
                        </Button>
                      )}
                    </Upload>
                  </div>
                  {/* <div className="flex items-center">
                    <div className="flex">
                      <Checkbox checked={value} onChange={onChange} />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-700 font-bold"
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                </>
              )}
            />

            {/* <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={1}
              defaultFileList={[...fileList]}
              className="upload-list-inline"
            >
              <Button
                size="large"
                style={{ width: "100%" }}
                icon={<UploadOutlined />}
                className="text-center"
              >
                Upload
              </Button>
            </Upload> */}
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
      </div>
    </Layout>
  );
};

export default PrivateComponent(SettingInterest);
