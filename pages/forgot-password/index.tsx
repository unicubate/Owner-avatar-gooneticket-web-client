/* eslint-disable @next/next/no-img-element */
import { useInputState } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { FieldRequiredMessage } from '@/components/ui-setting';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserForgotPasswordFormModel } from '@/types/user';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { passwordResetUserAPI } from '../../api-site/user';

const ForgotPassword = () => {
  const { query } = useRouter();
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
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const watchEmail = watch('email', '');

  const onSubmit: SubmitHandler<UserForgotPasswordFormModel> = async (
    payload: UserForgotPasswordFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await passwordResetUserAPI(payload);
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: t.formatMessage({ id: 'AUTH.FORGOT.SEND.SUCCESSFULLY' }),
      });
      setHasSuccess(true);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  return (
    <LayoutAuth title="Forgot password">
      <div className="m-auto mt-10 w-full max-w-sm rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-input dark:bg-background md:mt-16">
        <div className="mx-auto flex justify-center">
          <h6 className="text-center text-xl font-bold">
            {t.formatMessage({ id: 'AUTH.FORGOT.TITLE' })}
          </h6>
        </div>
        <p className="mt-4 text-center">
          {t.formatMessage({ id: 'AUTH.FORGOT.DESC' })}
        </p>
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
                  {t.formatMessage({ id: 'UTIL.SEND.LINK' })}{' '}
                  <strong className="text-blue-600 underline">
                    {watchEmail}
                  </strong>
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <TextInput
              control={control}
              label={t.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
              type="text"
              required
              name="email"
              placeholder={t.formatMessage({ id: 'PLACEHOLDER.EMAIL' })}
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ButtonInput
              type="submit"
              className="w-full"
              variant="primary"
              loading={loading}
              disabled={!isDirty || !isValid}
            >
              {t.formatMessage({ id: 'AUTH.FORGOT.SUBMIT' })}
            </ButtonInput>
          </div>
        </form>

        <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
          <p className="mt-8 cursor-pointer text-center text-xs text-gray-600 hover:underline dark:hover:text-blue-600">
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

export default PublicComponent(ForgotPassword);
