/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { Alert, Button, Checkbox, Input } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserRegisterFormModel } from '@/types/user.type';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { useRouter } from 'next/router';
import { resendCodeAPI, ValidCodeAPI } from '@/api-site/user';
import { useQuery } from '@tanstack/react-query';
import { PrivateComponent } from '@/components/util/private-component';
import { useAuth } from '@/components/util/context-user';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { LayoutSite } from '@/components/layout-site';
import { TextInput } from '@/components/ui-setting/shadcn';

const schema = yup.object({
  code: yup.string().max(8, 'Maximum 8 symbols').required(),
});

const ConfirmAccount = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  if (user?.nextStep === 'SETTING_PROFILE') {
    window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-profile`;
  } else if (user?.nextStep === 'SETTING_INTEREST') {
    window.location.href = `${process.env.NEXT_PUBLIC_SITE}/register/${user?.id}/setting-interest`;
  } else if (user?.nextStep === 'COMPLETE_REGISTRATION') {
    window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
  }

  const saveMutation = ValidCodeAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<{ code: string }> = async (payload: {
    code: string;
  }) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await saveMutation.mutateAsync({
        ...payload,
        nextStep: 'COMPLETE_REGISTRATION',
      });
      router.push(`${`/${user?.username}`}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  const resendCode = async () => {
    try {
      await resendCodeAPI({ userId: user?.id });
      AlertSuccessNotification({
        text: 'Code verification send successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
    } catch (error) {
      AlertDangerNotification({
        text: 'An error has occurred.',
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <LayoutSite title="Log In">
      <div className="m-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <div className="mx-auto flex justify-center">
          <img
            className="h-7 w-auto sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="mx-auto flex">
          <h6 className="mt-3 text-xl font-bold">{`Confirm your account`}</h6>
        </div>
        <div className="mx-auto flex">
          <p>
            We sent a verification code to:{' '}
            <span className="font-bold">{user?.email}</span>
          </p>
        </div>

        <div className="mx-auto flex">
          <p className="cursor-pointer text-sm font-medium text-blue-600 decoration-2">
            Check your inbox
          </p>
        </div>

        <div className="mx-auto flex">
          <span>Follow the link in the email, or enter the code bellow</span>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextInput
              control={control}
              label="Code"
              type="text"
              name="code"
              placeholder="Code"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ButtonInput
              size="lg"
              type="submit"
              variant="info"
              className="w-full"
              loading={loading}
            >
              Continue
            </ButtonInput>
          </div>
        </form>

        <div className="mx-auto flex">
          <p className="mt-3 text-sm">{`If you don't get email after a few minutes, tap below to resend`}</p>
        </div>
        <div className="mx-auto flex" onClick={() => resendCode()}>
          <p className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Resend code
          </p>
        </div>
      </div>
    </LayoutSite>
  );
};

export default PrivateComponent(ConfirmAccount);
