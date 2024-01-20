import { NumberInput, TextInput } from "../ui-setting/ant";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonInput } from "../ui-setting/ant/button-input";
import { useEffect, useState } from "react";
import { TextareaReactQuillInput } from "../ui-setting";
import { useRouter } from "next/router";
import { Upload, UploadFile, UploadProps } from "antd";
import { CreateOrUpdateOneMembershipAPI } from "@/api-site/membership";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { MembershipFormModel } from "@/types/membership";
import { useAuth } from "../util/context-user";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { UpdateOneDonationAPI } from "@/api-site/donation";
import { DonationFormModel } from "@/types/donation";

const schema = yup.object({
  price: yup.number().min(1).required(),
});

const UpdateFormDonation: React.FC<{
  donationId?: any;
  donation?: any;
}> = ({ donation }) => {
  const { profile } = useAuth() as any;
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

  useEffect(() => {
    if (donation) {
      const fields = ["title", "messageWelcome", "price", "description"];
      fields?.forEach((field: any) => setValue(field, donation[field]));
    }
  }, [donation, setValue]);

  const { mutateAsync: saveMutation } = UpdateOneDonationAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<DonationFormModel> = async (
    data: DonationFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...data,
        donationId: donation?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Donation save successfully`,
        gravity: "top",
        className: "info",
        position: "center",
      });
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <div className="mt-2">
              <NumberInput
                control={control}
                label="Minimum price *"
                type="number"
                name="price"
                placeholder="Minimum price"
                errors={errors}
                required
                prefix={profile?.currency?.code}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Change the default price of a pot to an amount of your choice.`}
              </span>
            </div>

            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Thank you message"
                name="messageWelcome"
                placeholder="Thank you for the support! 🎉 "
                className="h-32"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`This will be visible after the payment and in the receipt email. Write a personable thank you message, and include any rewards if you like.`}
              </span>
            </div>

            <div className="my-4 flex items-center space-x-4">
              <ButtonInput
                minW="fit"
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Save
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormDonation };
