import { NumberInput, TextAreaInput, TextInput } from "../util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { ButtonInput } from "../templates/button-input";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { useState } from "react";
import { TextareaReactQuillInput } from "../util/form/textarea-react-quill-input";
import { useRouter } from "next/router";

const schema = yup.object({
  amount: yup.number().required(),
  title: yup.string().optional(),
  description: yup.string().optional(),
});

const CreateOrUpdateFormDonation: React.FC<{
  membership: any;
}> = ({ membership }) => {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
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

  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900">
              Create a new membership
            </h2>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Title"
                  type="text"
                  name="title"
                  required
                  placeholder="Title levels"
                  errors={errors}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mb-2">
                <NumberInput
                  control={control}
                  label="Price"
                  type="number"
                  name="price"
                  placeholder="Price product"
                  errors={errors}
                  required
                  prefix={"€"}
                />
              </div>
            </div>



            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Description"
                name="description"
                placeholder="Write description"
                className="h-40"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`This will help your audience decide whether to join your membership. Describe in your own words what you're offering them`}
              </span>
            </div>
            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Welcome note"
                name="messageWelcome"
                placeholder="Write description"
                className="h-40"
                defaultValue={
                  "Thank you for the support! 🎉 "
                }
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`This will be visible after the payment and in the welcome email. Make it personal, and include any links to rewards you'd like to share with them`}
              </span>
            </div>



            <div className="flex items-center mt-4 mb-4 space-x-4">
              <ButtonCancelInput shape="default" size="large"
                loading={loading}
                onClick={() => back()}>
                Cancel
              </ButtonCancelInput>
              <ButtonInput
                minW="fit"
                shape="default"
                type="submit"
                size="large"
                loading={false}
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

export { CreateOrUpdateFormDonation };
