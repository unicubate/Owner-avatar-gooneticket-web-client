/* eslint-disable @next/next/no-img-element */
import { resendCodeAPI, validCodeAPI } from '@/api-site/user';
import { useDecrementTimer, useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicVerifyComponent } from '@/components/util/public-verify-component';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  code: yup.string().min(3, 'Minimum 6 symbols').required(),
});

const ConfirmEmail = () => {
  const defaultTimer = 20;
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);

  const [isResend, setIsResend] = useState(false);
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<{ code: string }> = async (payload: {
    code: string;
  }) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await validCodeAPI({ ...payload });
      setHasErrors(false);
      setLoading(false);
      window.location.href = `${
        redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
      }`;
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  const resendCodeItem = async () => {
    try {
      setIsResend(true);
      setHasErrors(undefined);

      await resendCodeAPI();

      setHasErrors(false);
      setIsResend(false);
      AlertSuccessNotification({
        text: 'Email send successfully',
      });
      setIsRunning(true);
    } catch (error: any) {
      setHasErrors(true);
      setIsResend(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };
  return (
    <>
      <LayoutAuth title="Confirm your account">
        <div className="m-auto mt-8 w-full max-w-sm rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div>
          <div className="justify-center">
            <h6 className="mt-4 text-center text-xl font-bold">
              {`Confirm your account`}
            </h6>
            <p className="mt-4 text-center text-sm sm:text-sm text-gray-600">
              We sent a verification code to your email. Enter the code from the
              email in the field below.
            </p>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <TextInput
                control={control}
                label="Device Verification Code"
                name="code"
                placeholder="Enter 6-digit code"
                errors={errors}
                required
                type="number"
                pattern="[0-9]*"
              />
            </div>

            <div className="mt-4">
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="info"
                loading={loading}
              >
                Verify code
              </ButtonInput>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <ButtonInput
                variant="outline"
                type="button"
                size="sm"
                className="w-full"
                onClick={() => resendCodeItem()}
                loading={isResend}
                disabled={isRunning}
              >
                {timer} Resend code
              </ButtonInput>
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
};
export default PublicVerifyComponent(ConfirmEmail);
