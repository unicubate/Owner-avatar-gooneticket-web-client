/* eslint-disable @next/next/no-img-element */
import { confirmOneContributorAPI } from '@/api-site/contributor';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { ButtonInput, PhoneNumberInput } from '@/components/ui-setting';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ConfirmContributorFormModel } from '@/types/contributor';
import { UserVerifyTokenModel } from '@/types/user.type';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  password: yup.string().min(8, 'Minimum 8 symbols').optional(),
  passwordConfirm: yup
    .string()
    .min(8, 'Minimum 8 symbols')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .optional(),
});

const ConfirmProfileContributor = ({
  verify,
}: {
  verify: UserVerifyTokenModel;
}) => {
  const { ipLocation } = useInputState();
  const { query, push, back } = useRouter();
  const { token } = query;
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
  const watchCode = watch('code', '');
  const watchPhone = watch('phone', '');

  const onSubmit: SubmitHandler<ConfirmContributorFormModel> = async (
    payload: ConfirmContributorFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await confirmOneContributorAPI({
        ...payload,
        token: String(token),
        contributorId: verify?.contributorId,
        contributorStatus: verify?.contributorStatus,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Invitation confirm successfully',
      });
      push(`/login`);
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
    <>
      <p className="mt-8 text-center text-xl sm:text-lg md:text-2xl">
        You've been invited tho the <b>{verify?.user?.organizationName}</b>{' '}
        organization
      </p>
      <p className="text-center text-sm sm:text-sm">
        invited by the {verify?.user?.lastName} {verify?.user?.firstName}
      </p>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {hasErrors && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{hasErrors}</AlertDescription>
          </Alert>
        )}

        <>
          {verify && verify?.contributorStatus === 'NEW-CONTRIBUTOR' && (
            <>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="First name"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    defaultValue={verify?.guest?.firstName}
                    errors={errors}
                    required
                  />
                </div>

                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Last name"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    defaultValue={verify?.guest?.lastName}
                    errors={errors}
                    required
                  />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="mb-2">
                  <TextPasswordInput
                    required
                    control={control}
                    label="Password"
                    name="password"
                    placeholder="Password"
                    errors={errors}
                  />
                </div>

                <div className="mb-2">
                  <TextPasswordInput
                    required
                    control={control}
                    label="Confirm Password"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    errors={errors}
                  />
                </div>
              </div>
              <div className="mt-2">
                <PhoneNumberInput
                  defaultCountry={ipLocation?.countryCode}
                  control={control}
                  name="phone"
                  placeholder="xxx xxx xxx"
                  errors={errors}
                  required={true}
                />
              </div>
            </>
          )}
        </>

        <div className="mt-6 flex justify-center space-x-4">
          {/* <ButtonInput
            type="button"
            className="w-md"
            size="lg"
            variant="outline"
            onClick={() => push(`/login`)}
          >
            Login
          </ButtonInput> */}
          <ButtonInput
            type="submit"
            className="w-full"
            size="lg"
            variant="info"
            loading={loading}
          >
            Join {verify?.user?.organizationName}
          </ButtonInput>
        </div>
      </form>
    </>
  );
};
export { ConfirmProfileContributor };
