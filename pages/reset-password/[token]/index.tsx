/* eslint-disable @next/next/no-img-element */
import { useInputState } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { FieldRequiredMessage } from '@/components/ui-setting';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserResetPasswordFormModel } from '@/types/user';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { resetPasswordAPI } from '../../../api-site/user';

const ResetPassword = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const token = String(query?.token);

  const { t, loading, setLoading, hasErrors, setHasErrors } = useInputState();
  const schema = yup.object({
    password: yup
      .string()
      .min(8, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 8 }))
      .required(),
    passwordConfirm: yup
      .string()
      .min(8, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 8 }))
      .oneOf(
        [yup.ref('password')],
        t.formatMessage({ id: 'AUTH.INPUT.PASSWORDS.MATCH' }),
      )
      .required(
        FieldRequiredMessage({
          id: 'AUTH.VALIDATION.REQUIRED',
          name: 'AUTH.INPUT.CONFIRM_PASSWORD',
        }),
      ),
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
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
        text: t.formatMessage({ id: 'AUTH.RESET.SEND.SUCCESSFULLY' }),
      });
      push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: 'An error has occurred.',
      });
    }
  };

  return (
    <LayoutAuth title="Reset password">
      <div className="m-auto mt-10 w-full max-w-sm rounded-lg border border-gray-100 p-6 shadow-md dark:border-gray-900 md:mt-16">
        {/* <div className="mx-auto flex justify-center">
        <img
          className="h-7 w-auto sm:h-8"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </div> */}
        <div className="mx-auto flex justify-center">
          <h6 className="mt-3 text-xl font-bold">
            {t.formatMessage({ id: 'AUTH.RESET.TITLE' })}
          </h6>
        </div>
        <p className="mt-6 text-center">
          {t.formatMessage({ id: 'AUTH.RESET.DESC' })}
        </p>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <Alert variant="destructive" className="mb-4 bg-red-600">
              <AlertDescription className="text-white">
                {hasErrors}
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-4">
            <TextPasswordInput
              control={control}
              label={t.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
              name="password"
              placeholder={t.formatMessage({
                id: 'PLACEHOLDER.PASSWORD',
              })}
              errors={errors}
              required
            />
          </div>

          <div className="mb-4">
            <TextPasswordInput
              control={control}
              label={t.formatMessage({ id: 'AUTH.INPUT.CONFIRM_PASSWORD' })}
              name="passwordConfirm"
              placeholder={t.formatMessage({
                id: 'PLACEHOLDER.CONFIRM_PASSWORD',
              })}
              errors={errors}
              required
            />
          </div>

          <div className="mt-6">
            <ButtonInput
              type="submit"
              className="w-full"
              variant="primary"
              loading={loading}
            >
              {t.formatMessage({ id: 'AUTH.RESET.SUBMIT' })}
            </ButtonInput>
          </div>
        </form>

        {/* <Link href="/login">
          <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer hover:text-blue-600">
            Already have an account? Log in here
          </p>
        </Link> */}
      </div>
    </LayoutAuth>
  );
};

export default PublicComponent(ResetPassword);
