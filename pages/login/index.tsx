/* eslint-disable @next/next/no-img-element */
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import {
  loginCheckEmailOrPhoneUserAPI,
  loginGoogleUserAPI,
  loginUserAPI,
} from '../../api-site/user';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
});

const Login = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const [isSuccessCheckEmail, setIsSuccessCheckEmail] = useState(false);
  const {
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    isValid,
    isDirty,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const watchEmail = watch('email', '');

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });
      setHasErrors(false);
      setLoading(false);
      if (user?.emailConfirmedAt) {
        window.location.href = `${
          redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
        }`;
      } else {
        push(`/verify/confirm-email${redirect ? `?redirect=${redirect}` : ''}`);
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  const checkEmailOrPhoneItem = async () => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      setIsSuccessCheckEmail(false);

      await loginCheckEmailOrPhoneUserAPI({ email: watchEmail });

      setLoading(false);
      setIsSuccessCheckEmail(true);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
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
              <Alert variant="destructive" className="mb-4 text-center">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mb-4">
              <TextInput
                control={control}
                label="Email"
                type="email"
                name="email"
                inputMode="email"
                placeholder="Email address"
                errors={errors}
                labelHelp={
                  <Link
                    href={`/login/phone${redirect ? `?redirect=${redirect}` : ''}`}
                  >
                    <p className="cursor-pointer text-xs font-bold text-blue-600 hover:underline dark:hover:text-blue-600">
                      Log in with phone
                    </p>
                  </Link>
                }
              />
            </div>

            {isSuccessCheckEmail ? (
              <>
                <div className="mb-4">
                  <TextPasswordInput
                    control={control}
                    label="Password"
                    name="password"
                    placeholder="Password"
                    errors={errors}
                  />
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm dark:dark:text-white"
                    ></label>
                    <Link
                      className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                      href={`/forgot-password${redirect ? `?redirect=${redirect}` : ''}`}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="info"
                    loading={loading}
                    disabled={!isDirty || !isValid}
                  >
                    Log In
                  </ButtonInput>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="info"
                  loading={loading}
                  disabled={!watchEmail.length}
                  onClick={() => checkEmailOrPhoneItem()}
                >
                  Continue with email
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

export default PublicComponent(Login);
