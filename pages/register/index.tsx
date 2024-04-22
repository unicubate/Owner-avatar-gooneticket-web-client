/* eslint-disable @next/next/no-img-element */
import { useDecrementTimer, useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserRegisterFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GoogleLogin } from '@react-oauth/google';
import { Checkbox } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import {
  registerCheckEmailOrPhoneUserAPI,
  registerGoogleUserAPI,
  registerUserAPI,
  sendCodeEmailUserAPI,
} from '../../api-site/user';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
  firstName: yup.string().required('first name is a required field'),
  lastName: yup.string().required('last name is a required field'),
  code: yup.string().required(),
  confirm: yup
    .boolean()
    .oneOf([true], 'Please check the box to deactivate your account')
    .required(),
});

const Register = () => {
  const defaultTimer = 60;
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);
  const [isResend, setIsResend] = useState(false);

  const [isSuccessCheckEmailOrPhone, setIsSuccessCheckEmailOrPhone] =
    useState(false);
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
    hasSuccess,
    isValid,
    isDirty,
    setHasSuccess,
    setHasErrors,
  } = useReactHookForm({ schema });
  const watchEmail = watch('email', '');
  const watchCode = watch('code', '');
  const watchPassword = watch('password', '');

  const onSubmit: SubmitHandler<UserRegisterFormModel> = async (
    payload: UserRegisterFormModel,
  ) => {
    setLoading(true);
    setHasSuccess(false);
    setHasErrors(undefined);

    try {
      await registerUserAPI({
        ...payload,
      });
      setLoading(false);
      window.location.href = `${
        redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
      }`;
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
    setIsResend(true);
    setHasSuccess(false);
    setHasErrors(undefined);
    try {
      await sendCodeEmailUserAPI({ email: watchEmail });
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

  const checkEmailOrPhoneItem = async () => {
    setLoading(true);
    setHasSuccess(false);
    setHasErrors(undefined);
    try {
      setIsSuccessCheckEmailOrPhone(false);

      await registerCheckEmailOrPhoneUserAPI({ email: watchEmail });

      setLoading(false);
      setHasSuccess(true);
      setIsSuccessCheckEmailOrPhone(true);
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
    <LayoutAuth title="Register">
      <div className="m-auto mt-10 w-full max-w-lg rounded-lg p-6 shadow-md dark:bg-black md:mt-16">
        <div className="mx-auto mt-4 flex justify-center">
          <h6 className="text-center text-xl font-bold">
            {`Sign up. It's free!`}
          </h6>
        </div>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                    {watchEmail}
                  </strong>
                  . Enter the code from the email in the field below.
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <TextInput
              control={control}
              label="Email"
              type="text"
              name="email"
              placeholder="Email address"
              errors={errors}
              required
              labelHelp={
                <Link
                  href={`/register/phone${redirect ? `?redirect=${redirect}` : ''}`}
                >
                  <p className="cursor-pointer text-xs font-bold text-blue-600 hover:underline dark:hover:text-blue-600">
                    Sign up with phone
                  </p>
                </Link>
              }
            />
          </div>

          <div className="mt-4">
            <TextPasswordInput
              control={control}
              label="Password"
              name="password"
              placeholder="Password"
              errors={errors}
              required
            />
          </div>

          {isSuccessCheckEmailOrPhone ? (
            <>
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
                    disabled={!watchEmail || isRunning ? true : false}
                  >
                    {timer} Resend code
                  </ButtonInput>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="First name"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    errors={errors}
                    required
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="Last name"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    errors={errors}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <Controller
                  name="confirm"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <div className="flex items-center">
                        <div className="flex">
                          <Checkbox checked={value} onChange={onChange} />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor="remember-me"
                            //className="text-sm font-bold text-gray-700"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I accept the{' '}
                            <Link
                              className="text-sm text-blue-600 hover:underline"
                              href="/terms-condition"
                            >
                              terms
                            </Link>{' '}
                            &{' '}
                            <Link
                              className="text-sm text-blue-600 hover:underline"
                              href="/privacy-policy"
                            >
                              privacy policy
                            </Link>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                />
                {errors?.confirm && (
                  <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    {errors?.confirm?.message as any}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="info"
                  size="lg"
                  loading={loading}
                  disabled={watchCode.length !== 6 && true}
                >
                  Create account
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
                disabled={!watchEmail.length || !watchPassword.length}
                onClick={() => checkEmailOrPhoneItem()}
              >
                Continue
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

        <div className="flex justify-center">
          <GoogleLogin
            size="large"
            useOneTap
            theme="outline"
            type="standard"
            shape="rectangular"
            width="100%"
            onSuccess={async (credentialResponse) => {
              try {
                await registerGoogleUserAPI({
                  token: String(credentialResponse.credential),
                });
                setHasErrors(false);
                push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
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
        <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
          <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline">
            {' '}
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </LayoutAuth>
  );
};
export default PublicComponent(Register);
