import { CreateOrUpdateOneDiscountAPI } from '@/api-site/discount';
import { DiscountFormModel } from '@/types/discount';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { DateInput, SwitchInput } from '../ui-setting/ant';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';

const schema = yup.object({
  percent: yup.number().required(),
  code: yup.string().required(),
  expiredAt: yup.date().min(new Date()).nullable(),
});

const CreateOrUpdateDiscountModal: React.FC<{
  showModal: boolean;
  setShowModal: any;
  discount?: any;
}> = ({ showModal, setShowModal, discount }) => {
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
  const watchEnableExpiredAt = watch('enableExpiredAt', false);

  useEffect(() => {
    if (discount) {
      const fields = [
        'code',
        'description',
        'percent',
        'isActive',
        'enableExpiredAt',
        'isExpired',
        'startedAt',
      ];
      fields?.forEach((field: any) => setValue(field, discount[field]));
    }
  }, [discount, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneDiscountAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<DiscountFormModel> = async (
    payload: DiscountFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        discountId: discount?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Discount save successfully',
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
          <div className="relative  m-auto w-full max-w-lg rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212] overflow-y-scroll max-h-screen">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl text-black  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Percentage discount "
                    type="number"
                    name="percent"
                    placeholder="Percentage"
                    errors={errors}
                    required
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Name"
                    type="text"
                    name="code"
                    placeholder="Name donation"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <TextAreaInput
                    control={control}
                    label="Description (optional)"
                    name="description"
                    placeholder="description discount"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-black dark:text-white">
                            Set Expiry
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-600">
                            Setting expired date
                          </p>
                        </div>
                      </div>

                      <SwitchInput
                        control={control}
                        name="enableExpiredAt"
                        label=""
                      />
                    </div>
                    {watchEnableExpiredAt ? (
                      <div className="mb-1">
                        <DateInput
                          label="Expired date"
                          control={control}
                          placeholder="12/01/2023"
                          name="expiredAt"
                          errors={errors}
                        />
                      </div>
                    ) : null}
                  </div>
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

export { CreateOrUpdateDiscountModal };
