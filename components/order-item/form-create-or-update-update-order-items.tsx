import { UpdateOneOrderItemAPI } from '@/api-site/order-item';
import { OrderItemFormModel, OrderItemModel } from '@/types/order-item';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required(),
});

const FormCreateOrUpdateOrderItems = ({
  orderItem,
  setShowModal,
}: {
  setShowModal?: any;
  orderItem?: OrderItemModel;
}) => {
  const { push } = useRouter();
  const { hasErrors, setHasErrors, locale } = useInputState();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (orderItem) {
      const fields: (keyof OrderItemModel)[] = ['fullName', 'email'];
      fields.forEach((field) => setValue(field, orderItem[field]));
    }
  }, [orderItem, setValue]);

  // Create or Update data
  const {
    isError,
    isPending: loading,
    mutateAsync: saveMutation,
  } = UpdateOneOrderItemAPI();

  const onSubmit = async (payload: OrderItemFormModel) => {
    try {
      await saveMutation({
        ...payload,
        customer: 'buyer',
        orderItemId: `${orderItem?.id}`,
      });
      reset();
      AlertSuccessNotification({
        description: 'Ticket update successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-auto justify-center p-2">
          {isError && (
            <Alert
              variant="destructive"
              className="mt-2 bg-red-600 text-center"
            >
              <AlertDescription className="text-white">
                {hasErrors}
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-4">
            <TextInput
              control={control}
              label="Full name"
              type="text"
              name="fullName"
              placeholder="Full name"
              errors={errors}
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              control={control}
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              errors={errors}
              required
            />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <ButtonInput
              type="button"
              className="w-full"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </ButtonInput>
            <ButtonInput
              type="submit"
              className="w-full"
              variant="primary"
              disabled={loading}
              loading={loading}
            >
              Save
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
};

export { FormCreateOrUpdateOrderItems };
