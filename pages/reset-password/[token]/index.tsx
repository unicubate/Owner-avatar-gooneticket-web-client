/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserResetPasswordFormModel } from '@/types/user.type';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { resetPasswordAPI } from '../../../api-site/user';
import { useRouter } from 'next/router';
import { PublicComponent } from '@/components/util/public-component';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { GetStaticPropsContext } from 'next';
import { TextInput } from '@/components/ui-setting/shadcn';

const schema = yup.object({
  newPassword: yup.string().min(8, 'Minimum 8 symbols').required(),
  passwordConfirm: yup
    .string()
    .min(8, 'Minimum 8 symbols')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

const ResetPassword = () => {
  const router = useRouter();
  const { query } = useRouter();
  const token = String(query?.token);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserResetPasswordFormModel>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserResetPasswordFormModel> = async (
    payload: UserResetPasswordFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await resetPasswordAPI({ ...payload, token });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Email send successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      reset();
      router.push(`${`/login`}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: 'An error has occurred.',
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-12 shadow-md dark:bg-[#121212] md:mt-16">
      <div className="mx-auto flex justify-center">
        <img
          className="h-7 w-auto sm:h-8"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </div>
      <div className="mx-auto flex justify-center">
        <h6 className="mt-3 text-xl font-bold">{`Reset password?`}</h6>
      </div>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            control={control}
            label="Password"
            type="password"
            name="newPassword"
            placeholder="Password"
            errors={errors}
          />
        </div>

        <div className="mb-4">
          <TextInput
            control={control}
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            errors={errors}
          />
        </div>

        <div className="mt-6">
          <ButtonInput
            type="submit"
            className="w-full"
            size="sm"
            variant="info"
            loading={loading}
          >
            Log In
          </ButtonInput>
        </div>
      </form>

      {/* <Link href="/login">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
            Already have an account? Log in here
          </p>
        </Link> */}
    </div>
  );
};

export default PublicComponent(ResetPassword);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
