import { useReactHookForm } from '../hooks';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { CreateOrUpdateOneContributorAPI } from '@/api-site/contributor';
import { ContributorFormModel, roleContributors } from '@/types/contributor';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting';
import { SelectInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  role: yup
    .mixed()
    .oneOf(['ADMIN', 'MODERATOR'] as const)
    .defined()
    .required(),
});
const UpdateRoleContributorModal = ({
  showModal,
  setShowModal,
  buttonDialog,
  contributor,
}: {
  showModal: boolean;
  setShowModal: any;
  buttonDialog: React.ReactNode;
  contributor: any;
}) => {
  const {
    watch,
    control,
    setValue,
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
        contributorId: contributor?.id,
        action: 'UPDATE-CONTRIBUTOR',
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Contributor save successfully',
      });
      setShowModal((i: boolean) => !i);
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
      <Dialog
        onOpenChange={setShowModal}
        open={showModal}
        defaultOpen={showModal}
      >
        <DialogTrigger asChild>{buttonDialog}</DialogTrigger>
        <DialogContent className="dark:border-gray-800 dark:bg-[#121212] sm:max-w-[500px]">
          <div className="flex-auto justify-center p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{hasErrors}</AlertDescription>
                </Alert>
              )}

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

              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  //onClick={() => back()}
                >
                  Cancel
                </ButtonInput>
                <ButtonInput
                  type="submit"
                  className="w-full"
                  size="lg"
                  variant="info"
                  loading={loading}
                >
                  Update role
                </ButtonInput>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { UpdateRoleContributorModal };
