import { UpdateOneOrderItemAPI } from '@/api-site/order-item';
import {
  OrderItemFormModel,
  OrderItemModel,
  statusOderItemArray,
} from '@/types/order-item';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { SelectInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  status: yup.string().required(),
});

const UpdateOrderItemModal: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
  orderItem: OrderItemModel | any;
}> = ({ isOpen, setIsOpen, orderItem }) => {
  const {
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
    if (orderItem) {
      const fields = ['status'];
      fields?.forEach((field: any) => setValue(field, orderItem[field]));
    }
  }, [orderItem, setValue]);

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

  const onSubmit: SubmitHandler<OrderItemFormModel> = async (
    payload: OrderItemFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        orderItemId: orderItem?.id,
      });

      setHasErrors(false);
      setLoading(false);
      setIsOpen(false);
      AlertSuccessNotification({
        text: `Status save successfully`,
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
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212] overflow-y-scroll max-h-screen">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <CloseOutlined />
              </span>
            </button>

            <div className="mt-4 mx-auto flex justify-center">
              <AvatarComponent
                size={{ xs: 70, sm: 70, md: 70, lg: 84, xl: 80, xxl: 100 }}
                profile={orderItem?.profile}
              />
            </div>
            <div className="mt-1 mx-auto flex justify-center">
              <h6 className="text-center text-xl font-bold">
                {orderItem?.profile?.firstName ?? ''}{' '}
                {orderItem?.profile?.lastName ?? ''}{' '}
              </h6>
            </div>

            {orderItem?.uploadsImages?.length > 0 ? (
              <div className="mt-2 mx-auto flex justify-center">
                <ListCarouselUpload
                  uploads={orderItem?.uploadsImages}
                  folder="products"
                  height={350}
                />
              </div>
            ) : null}

            <div className="py-2">
              <h2 className="font-bold text-gray-900 text-base">
                Billing Information
              </h2>
            </div>

            <div className="py-4">
              <h2 className="font-bold text-gray-900 text-base">
                Payment Method
              </h2>
            </div>

            <div className="mt-4 mx-auto flex justify-start">
              <h6 className="mt-3 text-center text-xl font-bold">{`Change status order`}</h6>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>rre</AlertDescription>
                </Alert>
              )}

              <div className="mt-4">
                <SelectInput
                  firstOptionName=""
                  label=""
                  control={control}
                  errors={errors}
                  placeholder="Select Status Order"
                  valueType="text"
                  name="status"
                  dataItem={statusOderItemArray}
                />
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
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
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { UpdateOrderItemModal };
