import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting';
import { TextPasswordInput } from '../ui-setting/shadcn';
import { useReactHookForm } from '../hooks/use-react-hook-form';

type Props = {
  userId: string;
  user: any;
};

const schema = yup.object({
  oldPassword: yup.string().required('old password required'),
  newPassword: yup.string().required('new password required'),
  confirmPassword: yup.string().required('confirm password required'),
});

const UpdateFormPassword: React.FC<Props> = ({ userId, user }) => {
  const {
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log('payload =======>', payload);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold"> Change password </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextPasswordInput
                  label="Old password"
                  control={control}
                  name="oldPassword"
                  placeholder="Old password"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextPasswordInput
                  label="New password"
                  control={control}
                  name="newPassword"
                  placeholder="New password"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextPasswordInput
                  label="Confirm password"
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  errors={errors}
                />
              </div>
            </div>

            <div className="mb-2 mt-4 flex items-center space-x-4">
              <ButtonInput
                size="lg"
                type="submit"
                variant="info"
                className="w-full"
                loading={loading}
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
