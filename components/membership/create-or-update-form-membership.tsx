import { NumberInput, TextInput } from "../util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonInput } from "../templates/button-input";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { useEffect, useState } from "react";
import { TextareaReactQuillInput } from "../util/form/textarea-react-quill-input";
import { useRouter } from "next/router";
import { Upload, UploadFile, UploadProps } from "antd";
import { CreateOrUpdateOneMembershipAPI } from "@/api/membership";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { MembershipFormModel } from "@/types/membership";

const schema = yup.object({
  pricePerYearly: yup.number().min(1).required(),
  pricePerMonthly: yup.number().min(1).required(),
  title: yup.string().required(),
  description: yup.string().min(10).required(),
});

const CreateOrUpdateFormMembership: React.FC<{
  membership?: any;
  uploadImages?: any;
}> = ({ membership, uploadImages }) => {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (membership) {
      const fields = [
        "title",
        "messageWelcome",
        "pricePerMonthly",
        "pricePerYearly",
        "description",
      ];
      fields?.forEach((field: any) => setValue(field, membership[field]));
    }
  }, [membership, setValue]);

  const saveMutation = CreateOrUpdateOneMembershipAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<MembershipFormModel> = async (
    data: MembershipFormModel
  ) => {
    let newImageLists: any = [];
    setLoading(true);
    setHasErrors(undefined);
    try {
      imageList
        .filter((file: any) => file?.status === "success")
        .forEach((file: any) => {
          newImageLists.push(file);
        });

      const payload = {
        ...data,
        newImageLists,
        imageList,
      };

      await saveMutation.mutateAsync({
        ...payload,
        membershipId: membership?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Membership save successfully`,
        gravity: "top",
        className: "info",
        position: "center",
      });
      push(`/memberships`);
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

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900">
              Create a new membership
            </h2>

            <div className="mt-2">
              <TextInput
                control={control}
                label="Title*"
                type="text"
                name="title"
                required
                placeholder="Title"
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <NumberInput
                  control={control}
                  label="Price per month*"
                  type="number"
                  name="pricePerMonthly"
                  placeholder="Price per month"
                  errors={errors}
                  required
                  prefix={"€"}
                />
                <span className="text-sm font-medium text-gray-400">
                  {`Set your minimum price per month. Supporters can choose to pay more`}
                </span>
              </div>
              <div className="mt-2">
                <NumberInput
                  control={control}
                  label="Price per year(optional)"
                  type="number"
                  name="pricePerYearly"
                  placeholder="Price per year"
                  errors={errors}
                  required
                  prefix={"€"}
                />
              </div>
            </div>

            <div className="mt-2">
              <Controller
                name="attachmentImages"
                control={control}
                render={({}) => (
                  <>
                    <div className="text-center justify-center mx-auto">
                      <Upload
                        name="attachmentImages"
                        listType="picture-card"
                        fileList={imageList}
                        onChange={handleImageChange}
                        accept=".png,.jpg,.jpeg"
                        maxCount={1}
                      >
                        {imageList.length >= 1 ? null : (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload cover</div>
                          </div>
                        )}
                      </Upload>
                    </div>
                  </>
                )}
              />
            </div>

            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Description*"
                name="description"
                placeholder="This will help your audience decide whether to join your membership. Describe in your own words what you're offering them"
                className="h-40"
                errors={errors}
              />
            </div>
            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Welcome note"
                name="messageWelcome"
                placeholder="Write description"
                className="h-32"
                defaultValue={"Thank you for the support! 🎉 "}
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`This will be visible after the payment and in the welcome email. Make it personal, and include any links to rewards you'd like to share with them`}
              </span>
            </div>

            <div className="flex items-center mt-4 mb-4 space-x-4">
              <ButtonCancelInput
                shape="default"
                size="large"
                loading={loading}
                onClick={() => back()}
              >
                Cancel
              </ButtonCancelInput>
              <ButtonInput
                minW="fit"
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Save and Publish
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormMembership };
