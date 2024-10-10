/* eslint-disable @next/next/no-img-element */
import { GoogleAuthLogin } from '@/components/auth/google-auth-login';
import { useDecrementTimer, useInputState } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { FieldRequiredMessage } from '@/components/ui-setting';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { PublicComponent } from '@/components/util/public-component';
import { UserRegisterFormModel } from '@/types/user';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  registerCheckEmailOrPhoneUserAPI,
  registerUserAPI,
  sendCodeEmailUserAPI,
} from '../../api-site/user';

const Register = () => {
  const defaultTimer = 60;
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);
  const [isResend, setIsResend] = useState(false);
  const [isSuccessCheckEmailOrPhone, setIsSuccessCheckEmailOrPhone] =
    useState(false);
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    t,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    hasSuccess,
    setHasSuccess,
  } = useInputState();
  const schema = yup.object({
    email: yup
      .string()
      .email(t.formatMessage({ id: 'VALIDATION.WRONG.FORMAT' }))
      .min(3, t.formatMessage({ id: 'VALIDATION.MIN_LENGTH' }, { min: 3 }))
      .max(50, t.formatMessage({ id: 'VALIDATION.MAX_LENGTH' }, { max: 50 }))
      .required(
        FieldRequiredMessage({
          id: 'VALIDATION.REQUIRED',
          name: 'INPUT.EMAIL',
        }),
      ),
    password: yup
      .string()
      .min(8, t.formatMessage({ id: 'VALIDATION.MIN_LENGTH' }, { min: 8 }))
      .required(
        FieldRequiredMessage({
          id: 'VALIDATION.REQUIRED',
          name: 'INPUT.PASSWORD',
        }),
      ),
    firstName: yup.string().required(
      FieldRequiredMessage({
        id: 'VALIDATION.REQUIRED',
        name: 'INPUT.FIRSTNAME',
      }),
    ),
    lastName: yup.string().required(
      FieldRequiredMessage({
        id: 'VALIDATION.REQUIRED',
        name: 'INPUT.LASTNAME',
      }),
    ),
    code: yup.string().required(
      FieldRequiredMessage({
        id: 'VALIDATION.REQUIRED',
        name: 'INPUT.CODE',
      }),
    ),
    confirm: yup
      .boolean()
      .oneOf([true], t.formatMessage({ id: 'VALIDATION.BOX.CONFIRM' }))
      .required(
        FieldRequiredMessage({
          id: 'VALIDATION.REQUIRED',
          name: 'INPUT.CONFIRM',
        }),
      ),
  });
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
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
      const { data: user } = await registerUserAPI({
        ...payload,
        status: 'CLIENT',
      });
      window.location.href = `${redirect ? redirect : `${user?.url}/tickets`}`;
      setLoading(false);
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
      <div className="dark:border-input dark:bg-background m-auto mt-10 w-full max-w-lg rounded-lg border border-gray-100 bg-white p-6 shadow-md md:mt-16">
        <div className="mx-auto mt-4 flex justify-center">
          <h6 className="text-center text-xl font-bold">
            {t.formatMessage({ id: 'AUTH.REGISTER.SUBTITLE' })}
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

          {hasSuccess && (
            <div className="rounded-lg bg-indigo-200 text-center">
              <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
                <p className="p-3 text-sm font-medium text-indigo-800">
                  {t.formatMessage({ id: 'UTIL.CONFIRM.SEND.CODE' })}{' '}
                  <strong className="text-blue-600 underline">
                    {watchEmail}
                  </strong>
                  {t.formatMessage({ id: 'UTIL.CONFIRM.SEND.CODE.BIS' })}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <TextInput
              control={control}
              label={t.formatMessage({ id: 'INPUT.EMAIL' })}
              type="text"
              name="email"
              placeholder={t.formatMessage({ id: 'PLACEHOLDER.EMAIL' })}
              errors={errors}
              required
              labelHelp={
                <Link
                  href={`/register/phone${redirect ? `?redirect=${redirect}` : ''}`}
                >
                  <p className="cursor-pointer text-xs font-bold text-blue-600 hover:underline dark:hover:text-blue-600">
                    {t.formatMessage({ id: 'AUTH.REGISTER.PHONE' })}
                  </p>
                </Link>
              }
            />
          </div>

          <div className="mt-4">
            <TextPasswordInput
              control={control}
              label={t.formatMessage({ id: 'INPUT.PASSWORD' })}
              name="password"
              placeholder={t.formatMessage({ id: 'PLACEHOLDER.PASSWORD' })}
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
                    placeholder={t.formatMessage({ id: 'UTIL.DIGIT.CODE' })}
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
                    {timer}{' '}
                    {t.formatMessage({ id: 'AUTH.GENERAL.RESEND_CODE' })}
                  </ButtonInput>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="mt-2">
                  <TextInput
                    control={control}
                    label={t.formatMessage({ id: 'INPUT.FIRSTNAME' })}
                    type="text"
                    name="firstName"
                    placeholder={t.formatMessage({
                      id: 'PLACEHOLDER.FIRSTNAME',
                    })}
                    errors={errors}
                    required
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label={t.formatMessage({ id: 'INPUT.LASTNAME' })}
                    type="text"
                    name="lastName"
                    placeholder={t.formatMessage({
                      id: 'PLACEHOLDER.LASTNAME',
                    })}
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
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={value} onCheckedChange={onChange} />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t.formatMessage({ id: 'CONTACT.US.ACCEPT_TERMS' })}{' '}
                          <Link
                            className="text-sm text-blue-600 hover:underline"
                            href="/terms-condition"
                          >
                            {t.formatMessage({
                              id: 'CONTACT.US.TERMS_OF_USE',
                            })}
                          </Link>{' '}
                          &{' '}
                          <Link
                            className="text-sm text-blue-600 hover:underline"
                            href="/privacy-policy"
                          >
                            {t.formatMessage({
                              id: 'CONTACT.US.PRIVACY_POLICY',
                            })}
                          </Link>
                        </label>
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
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={watchCode.length !== 6 && true}
                >
                  {t.formatMessage({
                    id: 'AUTH.REGISTER.SUBMIT',
                  })}
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
                disabled={!watchEmail.length || !watchPassword.length}
                onClick={() => checkEmailOrPhoneItem()}
              >
                {t.formatMessage({ id: 'AUTH.GENERAL.NEXT_BUTTON' })}
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

        <div className="flex justify-center">
          <GoogleAuthLogin setHasErrors={setHasErrors} />
        </div>
        <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
          <p className="mt-8 cursor-pointer text-center text-xs text-gray-600 hover:underline dark:text-blue-600">
            {' '}
            {t.formatMessage({ id: 'UTIL.ALREADY_TO' })}{' '}
            {process.env.NEXT_PUBLIC_NAME_SITE}?{' '}
            <span className="font-bold">
              {t.formatMessage({ id: 'AUTH.LOGIN.HERE' })}
            </span>
          </p>
        </Link>
      </div>
    </LayoutAuth>
  );
};
export default PublicComponent(Register);
