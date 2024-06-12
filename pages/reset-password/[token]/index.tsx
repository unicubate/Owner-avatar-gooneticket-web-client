/* eslint-disable @next/next/no-img-element */
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layouts/auth';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserResetPasswordFormModel } from '@/types/user';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { resetPasswordAPI } from '../../../api-site/user';

const schema = yup.object({
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
  passwordConfirm: yup
    .string()
    .min(8, 'minimum 8 symbols')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('confirm password is a required field'),
});

const ResetPassword = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const token = String(query?.token);

  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

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
      <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-12 shadow-md dark:bg-black md:mt-16">
        {/* <div className="mx-auto flex justify-center">
        <img
          className="h-7 w-auto sm:h-8"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </div> */}
        <div className="mx-auto flex justify-center">
          <h6 className="mt-3 text-xl font-bold">{`Reset password?`}</h6>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
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
              label="Password"
              name="password"
              placeholder="Password"
              errors={errors}
              required
            />
          </div>

          <div className="mb-4">
            <TextPasswordInput
              control={control}
              label="Confirm password"
              name="passwordConfirm"
              placeholder="Confirm password"
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
              Reset Password
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
