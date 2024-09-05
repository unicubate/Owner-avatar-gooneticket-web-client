import { UpdateOneOrderItemAPI } from '@/api-site/order-item';
import { OrderItemFormModel, OrderItemModel } from '@/types/order-item';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

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
  const { loading, setLoading, hasErrors, setHasErrors, locale, userStorage } =
    useInputState();
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
  const { mutateAsync: saveMutation } = UpdateOneOrderItemAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit = async (payload: OrderItemFormModel) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        orderItemId: `${orderItem?.id}`,
      });
      setHasErrors(false);
      setLoading(false);
      reset();
      AlertSuccessNotification({
        text: 'Ticket update successfully',
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="float-right"
          onClick={() => setShowModal(false)}
        >
          <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
            <XIcon />
          </span>
        </Button>
        <div className="flex-auto justify-center p-2">
          {/* <AlertDialogTitle className="text-center">
            Update ticket
          </AlertDialogTitle> */}
          {hasErrors && (
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
              type="submit"
              className="w-full"
              size="lg"
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
