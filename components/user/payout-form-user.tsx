import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { GetOneUserPrivateAPI } from "@/api-site/user";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
  userId: string;
};

const schema = yup.object({
  username: yup.string().required(),
});

const PayoutFormUser: React.FC<Props> = ({ userId }) => {
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
            <div className="flex items-center mb-4 space-x-4">
              <ButtonInput
                // onClick={() => setShowModal(true)}
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"indigo"}
              >
                Create payment card
              </ButtonInput>
              <ButtonInput
                status="cancel"
                type="button"
                shape="default"
                size="normal"
                loading={false}
              >
                Create payment PayPal
              </ButtonInput>
            </div>

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

export { PayoutFormUser };
