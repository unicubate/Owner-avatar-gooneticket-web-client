import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { GetOneUserPrivateAPI } from "@/api-site/user";

type Props = {
  userId: string;
};

const schema = yup.object({
  username: yup.string().required(),
});

const UpdateFormUser: React.FC<Props> = ({ userId }) => {
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

  const { data: user } = GetOneUserPrivateAPI({ userId });

  useEffect(() => {
    if (user) {
      const fields = ["username"];
      fields?.forEach((field: any) => setValue(field, user[field]));
    }
  }, [user, userId, setValue]);

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
        <div className="overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900">
              {" "}
              Personal Info{" "}
            </h2>

            <div className="grid grid-cols-1 mt-4 sm:grid-cols-1 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="username"
                  errors={errors}
                  prefix={`${process.env.NEXT_PUBLIC_SITE}/`}
                />
              </div>
            </div>

            <div className="sm:flex flex-col sm:items-end sm:justify-between">
              <div className="mt-4">
                <ButtonInput
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color={user?.profile?.color}
                >
                  Save changes
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormUser };
