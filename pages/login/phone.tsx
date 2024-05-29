/* eslint-disable @next/next/no-img-element */
import { GoogleAuthLogin } from '@/components/auth/google-auth-login';
import { useDecrementTimer, useInputState } from '@/components/hooks';
import { useReactHookForm } from '@/components/hooks/use-react-hook-form';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput, PhoneNumberInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginPhoneFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import {
  loginCheckEmailOrPhoneUserAPI,
  loginPhoneUserAPI,
  sendCodePhoneUserAPI,
} from '../../api-site/user';

const schema = yup.object({
  phone: yup.string().required(),
  code: yup.string().required(),
});

const LoginPhone = () => {
  const defaultTimer = 60;
  const [isSuccessCheckPhone, setIsSuccessCheckPhone] = useState(false);
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);
  const [isResend, setIsResend] = useState(false);

  const { ipLocation } = useInputState();
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    hasSuccess,
    setHasSuccess,
  } = useReactHookForm({ schema });
  const watchCode = watch('code', '');
  const watchPhone = watch('phone', '');

  const onSubmit: SubmitHandler<UserLoginPhoneFormModel> = async (
    payload: UserLoginPhoneFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { code, phone } = payload;

    try {
      const { data: user } = await loginPhoneUserAPI({ code, phone });
      setHasErrors(false);
      setLoading(false);
      window.location.href = `${redirect ? redirect : `${user?.url}/orders`}`;
    } catch (error: any) {
      setLoading(false);
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  const checkEmailOrPhoneItem = async () => {
    setLoading(true);
    setHasSuccess(false);
    setHasErrors(undefined);
    try {
      setIsSuccessCheckPhone(false);

      await loginCheckEmailOrPhoneUserAPI({ phone: watchPhone });

      setLoading(false);
      setHasSuccess(true);
      setIsSuccessCheckPhone(true);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const resendCodeItem = async () => {
    setHasSuccess(false);
    setHasErrors(undefined);
    setIsResend(true);
    try {
      await sendCodePhoneUserAPI({ phone: watchPhone });
      setIsResend(false);
      setIsRunning(true);
      setHasSuccess(true);
    } catch (error: any) {
      setIsResend(false);
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <LayoutAuth title="Login">
        <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto mt-4 flex justify-center">
            <h6 className="text-center text-xl font-bold">{`Log in`}</h6>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-600 text-center"
              >
                <AlertDescription className="text-white">
                  {hasErrors}
                </AlertDescription>
              </Alert>
            )}

            {hasSuccess && (
              <div className="rounded-lg bg-indigo-200 text-center">
                <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
                  <p className="p-3 text-sm font-medium text-indigo-800">
                    We sent a verification code to{' '}
                    <strong className="text-blue-600 underline">
                      {watchPhone}
                    </strong>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4">
              <PhoneNumberInput
                defaultCountry={ipLocation?.countryCode ?? 'IT'}
                control={control}
                name="phone"
                label="Phone"
                placeholder="Phone number"
                errors={errors}
                required
                labelHelp={
                  <Link
                    href={`/login${redirect ? `?redirect=${redirect}` : ''}`}
                  >
                    <p className="cursor-pointer text-xs font-bold text-blue-600 hover:underline dark:hover:text-blue-600">
                      Log in with email
                    </p>
                  </Link>
                }
              />
            </div>

            {isSuccessCheckPhone ? (
              <div className="mt-4">
                <div className="max-w-auto relative flex w-full">
                  <TextInput
                    control={control}
                    name="code"
                    placeholder="Enter 6-digit code"
                    errors={errors}
                    required
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />

                  <ButtonInput
                    type="button"
                    variant="outline"
                    size="sm"
                    className="!absolute right-1 top-1 rounded"
                    loading={isResend}
                    onClick={() => resendCodeItem()}
                    disabled={!watchPhone || isRunning ? true : false}
                  >
                    {timer} Resend code
                  </ButtonInput>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                  disabled={!watchPhone.length}
                  onClick={() => checkEmailOrPhoneItem()}
                >
                  Continue with phone
                </ButtonInput>
              </div>
            )}

            {watchCode.length === 6 && (
              <div className="mt-4">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                  disabled={watchCode.length !== 6 && true}
                >
                  Log In
                </ButtonInput>
              </div>
            )}
          </form>

          <div className="my-4 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <p className="text-center text-xs uppercase text-gray-500 dark:text-gray-400">
              or login with Social Media
            </p>

            <span className="w-1/5 border-b border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="mx-auto mt-4 max-w-max">
            <GoogleAuthLogin />
          </div>

          <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:underline dark:hover:text-blue-600">
              {' '}
              New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
            </p>
          </Link>
        </div>
      </LayoutAuth>
    </>
  );
};

export default PublicComponent(LoginPhone);
