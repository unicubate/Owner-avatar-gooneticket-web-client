/* eslint-disable @next/next/no-img-element */
import { useDecrementTimer, useInputState } from '@/components/hooks';
import { useReactHookForm } from '@/components/hooks/use-react-hook-form';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput, PhoneNumberInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginPhoneFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GoogleLogin } from '@react-oauth/google';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import {
  loginGoogleUserAPI,
  loginPhoneUserAPI,
  sendCodePhoneUserAPI,
} from '../../api-site/user';

const schema = yup.object({
  phone: yup.string().required(),
  code: yup.string().required(),
});

const LoginPhone = () => {
  const defaultTimer = 30;
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
  } = useReactHookForm({ schema });
  const watchPhone = watch('phone', '');
  const watchCode = watch('code', '');

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
      window.location.href = `${
        redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
      }`;
    } catch (error: any) {
      setLoading(false);
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  const resendCodeItem = async (item: string) => {
    setHasErrors(undefined);
    setIsResend(true);
    try {
      await sendCodePhoneUserAPI({ phone: watchPhone });
      setIsResend(false);
      setIsRunning(true);
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
        <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          <div className="mt-4 mx-auto flex justify-center">
            <h6 className="text-center text-xl font-bold">{`Log in`}</h6>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4 text-center">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mb-4">
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

            <div className="mb-4">
              <div className="mb-6 flex-row md:mb-0 md:flex">
                <div className="relative mb-3 w-full md:mr-3 md:mb-0">
                  <TextInput
                    control={control}
                    name="code"
                    placeholder="Enter 6-digit code"
                    errors={errors}
                    required
                    type="number"
                    pattern="[0-9]*"
                  />
                </div>
                <ButtonInput
                  type="button"
                  variant="info"
                  onClick={() => resendCodeItem(watchPhone)}
                  loading={isResend}
                  disabled={!watchPhone || isRunning ? true : false}
                >
                  {timer} Send code
                </ButtonInput>
              </div>
            </div>

            <div className="mt-4">
              <ButtonInput
                type="submit"
                className="w-full"
                variant="info"
                loading={loading}
                disabled={watchCode.length !== 6 && true}
              >
                Log In
              </ButtonInput>
            </div>
          </form>

          <div className="my-4 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <p className="text-center text-xs uppercase text-gray-500 dark:text-gray-400">
              or login with Social Media
            </p>

            <span className="w-1/5 border-b border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="mt-4 mx-auto max-w-max">
            <GoogleLogin
              size="large"
              useOneTap
              theme="outline"
              type="standard"
              shape="rectangular"
              width="100%"
              onSuccess={async (credentialResponse) => {
                try {
                  await loginGoogleUserAPI({
                    token: String(credentialResponse.credential),
                  });
                  setHasErrors(false);
                  window.location.href = `${
                    redirect
                      ? redirect
                      : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
                  }`;
                } catch (error: any) {
                  setHasErrors(true);
                  setHasErrors(error.response.data.message);
                  AlertDangerNotification({
                    text: 'An error has occurred.',
                  });
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
