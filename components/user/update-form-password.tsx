import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInputPassword } from "../ui";
import { ButtonInput } from "../ui/button-input";

type Props = {
  userId: string;
  user: any;
};

const schema = yup.object({
  oldPassword: yup.string().optional(),
  newPassword: yup.string().optional(),
  confirmPassword: yup.string().optional(),
});

const UpdateFormPassword: React.FC<Props> = ({ userId, user }) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
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
      <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold">
              {" "}
              Change password{" "}
            </h2>

            <div className="grid grid-cols-1 mt-4 sm:grid-cols-3 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInputPassword
                  label="Old password"
                  control={control}
                  type="password"
                  name="oldPassword"
                  placeholder="Old password"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInputPassword
                  label="New password"
                  control={control}
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextInputPassword
                  label="Confirm password"
                  control={control}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex items-center mt-4 mb-2 space-x-4">
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormPassword };
