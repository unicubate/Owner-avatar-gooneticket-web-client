import { CreateOrUpdateOneAffiliationAPI } from '@/api-site/affiliation';
import { AffiliationFormModel } from '@/types/affiliation';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  percent: yup.number().required(),
  email: yup.string().email().required(),
  description: yup.string().nullable().optional(),
});

const CreateOrUpdateAffiliation = ({
  showModal,
  setShowModal,
  affiliation,
  productId,
}: {
  showModal: boolean;
  setShowModal: any;
  affiliation?: any;
  productId: string;
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

  useEffect(() => {
    if (affiliation) {
      const fields = ['email', 'percent', 'productId', 'description'];
      fields?.forEach((field: any) => setValue(field, affiliation[field]));
    }
  }, [affiliation, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneAffiliationAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<AffiliationFormModel> = async (
    payload: AffiliationFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        productId: productId,
        affiliationId: affiliation?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Affiliation save successfully',
      });
      setShowModal(false);
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
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto max-h-screen w-full max-w-lg overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
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
                <h1 className="mb-2 text-center text-lg">
                  {affiliation?.id ? 'Update affiliate' : 'New affiliate'}{' '}
                </h1>

                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    errors={errors}
                    disabled={affiliation?.id ? true : false}
                    required
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Percent"
                    name="percent"
                    placeholder="%"
                    errors={errors}
                    required
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Description (optional)"
                    name="description"
                    placeholder="description discount"
                    errors={errors}
                  />
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>

                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="info"
                    disabled={loading}
                    loading={loading}
                  >
                    Save
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateOrUpdateAffiliation };
