import { CreateOrUpdateOneContributorAPI } from '@/api-site/contributor';
import { ContributorFormModel, roleContributors } from '@/types/contributor';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  firstName: yup.string().required('first name is a required field'),
  lastName: yup.string().required('last name is a required field'),
  role: yup
    .mixed()
    .oneOf(['ADMIN', 'MODERATOR'] as const)
    .defined()
    .required(),
});
const CreateOrUpdateFormContributor = () => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneContributorAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ContributorFormModel> = async (
    payload: ContributorFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        action: 'NEW-CONTRIBUTOR',
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Contributor save successfully',
      });
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
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        {hasErrors && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{hasErrors}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mb-4">
            <TextInput
              control={control}
              label="First name"
              type="text"
              name="firstName"
              placeholder="Full name"
              errors={errors}
            />
          </div>

          <div className="mb-4">
            <TextInput
              control={control}
              label="Last name"
              type="text"
              name="lastName"
              placeholder="Last name"
              errors={errors}
            />
          </div>
        </div>
        <div className="mb-4">
          <TextInput
            control={control}
            label="Email address"
            type="email"
            name="email"
            placeholder="Email address"
            errors={errors}
          />
        </div>

        <div className="mb-4">
          <SelectInput
            firstOptionName="Choose role"
            label="Role"
            control={control}
            errors={errors}
            placeholder="Select role"
            valueType="text"
            name="role"
            dataItem={roleContributors}
          />
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <ButtonInput
            type="submit"
            className="w-full"
            size="lg"
            variant="info"
            disabled={loading}
            loading={loading}
          >
            Invite
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormContributor };
