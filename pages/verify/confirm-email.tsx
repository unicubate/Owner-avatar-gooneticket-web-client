/* eslint-disable @next/next/no-img-element */
import { useReactHookForm } from '@/components/hooks';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicVerifyComponent } from '@/components/util/public-verify-component';
import { AlertDangerNotification } from '@/utils';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  code: yup.string().min(3, 'Minimum 6 symbols').required(),
});

const ConfirmEmail = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    control,
    handleSubmit,
    errors,
    isValid,
    isDirty,
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
      // await passwordResetUserAPI(payload);
      setHasErrors(false);
      setLoading(false);
      // AlertSuccessNotification({
      //   text: 'Email send successfully',
      // });
      push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
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
    <>
      <LayoutAuth title="Confirm your account">
        <div className="m-auto mt-8 w-full max-w-sm rounded-lg p-6 py-12 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div>
          <div className="justify-center">
            <h6 className="mt-3 text-center text-xl font-bold">
              {`Confirm your account`}
            </h6>
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
                label="Code"
                type="text"
                name="code"
                placeholder="Code"
                errors={errors}
              />
            </div>

            <div className="mt-6">
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="info"
                loading={loading}
                disabled={!isDirty || !isValid}
              >
                Confirm
              </ButtonInput>
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
};
export default PublicVerifyComponent(ConfirmEmail);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
