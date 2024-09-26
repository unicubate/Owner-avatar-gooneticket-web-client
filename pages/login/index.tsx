/* eslint-disable @next/next/no-img-element */
import { GoogleAuthLogin } from '@/components/auth/google-auth-login';
import { useInputState } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput, FieldRequiredMessage } from '@/components/ui-setting';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginFormModel } from '@/types/user';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  loginCheckEmailOrPhoneUserAPI,
  loginUserAPI,
} from '../../api-site/user';

const Login = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const [isSuccessCheckEmail, setIsSuccessCheckEmail] = useState(false);
  const { t, loading, setLoading, hasErrors, setHasErrors } = useInputState();
  const schema = yup.object({
    email: yup
      .string()
      .email(t.formatMessage({ id: 'AUTH.VALIDATION.WRONG.FORMAT' }))
      .min(3, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 3 }))
      .max(
        50,
        t.formatMessage({ id: 'AUTH.VALIDATION.MAX_LENGTH' }, { max: 50 }),
      )
      .required(
        FieldRequiredMessage({
          id: 'AUTH.VALIDATION.REQUIRED',
          name: 'AUTH.INPUT.EMAIL',
        }),
      ),
    password: yup
      .string()
      .min(8, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 8 }))
      .required(),
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const watchEmail = watch('email', '');

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });
      if (user?.emailConfirmedAt) {
        window.location.href =
          user?.status === 'CREATOR'
            ? `${redirect ? redirect : `${process?.env.NEXT_PUBLIC_SITE_CREATOR}/dashboard`}`
            : `${redirect ? redirect : `${process?.env.NEXT_PUBLIC_SITE}/orders`}`;
      }
      setHasErrors(false);
      setLoading(false);
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
        <div className="dark:border-input dark:bg-background m-auto mt-10 w-full max-w-sm rounded-lg border border-gray-100 bg-white p-6 shadow-md md:mt-16">
          <div className="mx-auto mt-4 flex justify-center">
            <h6 className="text-center text-xl font-bold">
              {t.formatMessage({ id: 'AUTH.LOGIN.TITLE' })}
            </h6>
          </div>

          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mb-4">
              <TextInput
                control={control}
                label={t.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
                type="email"
                name="email"
                inputMode="email"
                placeholder={t.formatMessage({ id: 'PLACEHOLDER.EMAIL' })}
                errors={errors}
                labelHelp={
                  <Link
                    href={`/login/phone${redirect ? `?redirect=${redirect}` : ''}`}
                  >
                    <p className="cursor-pointer text-xs font-bold text-blue-600 hover:underline dark:hover:text-blue-600">
                      {t.formatMessage({ id: 'AUTH.LOGIN.PHONE' })}
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
                    label={t.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
                    name="password"
                    placeholder={t.formatMessage({
                      id: 'PLACEHOLDER.PASSWORD',
                    })}
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
                      {t.formatMessage({ id: 'AUTH.FORGOT.TITLE' })}
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    loading={loading}
                    disabled={!isDirty || !isValid}
                  >
                    {t.formatMessage({ id: 'AUTH.GENERAL.SUBMIT_BUTTON' })}
                  </ButtonInput>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                  disabled={!watchEmail.length}
                  onClick={() => checkEmailOrPhoneItem()}
                >
                  {t.formatMessage({ id: 'AUTH.LOGIN.CONTINUE.EMAIL' })}
                </ButtonInput>
              </div>
            )}
          </form>

          <div className="my-4 flex items-center justify-between">
            <span className="w-1/5 border-b lg:w-1/5 dark:border-gray-600"></span>
            <p className="text-center text-xs uppercase text-gray-500 dark:text-gray-400">
              {t.formatMessage({ id: 'AUTH.LOGIN.SOCIAL.TITLE' })}
            </p>

            <span className="w-1/5 border-b border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="mx-auto mt-4 max-w-max">
            <GoogleAuthLogin />
          </div>

          <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            <p className="mt-8 cursor-pointer text-center text-sm text-gray-600 hover:underline dark:text-blue-600">
              {' '}
              {t.formatMessage({ id: 'UTIL.NEW_TO' })}{' '}
              {process.env.NEXT_PUBLIC_NAME_SITE}?{' '}
              <span className="font-bold">
                {t.formatMessage({ id: 'AUTH.REGISTER.HERE' })}
              </span>
            </p>
          </Link>
        </div>
      </LayoutAuth>
    </>
  );
};

export default PublicComponent(Login);
