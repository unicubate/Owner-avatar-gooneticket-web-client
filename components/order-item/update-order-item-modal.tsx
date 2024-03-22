import { UpdateOneOrderItemAPI } from '@/api-site/order-item';
import {
  OrderItemFormModel,
  OrderItemModel,
  OrderModel,
  statusOderItemArray,
} from '@/types/order-item';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from '@/utils';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, SerialPrice } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { SelectInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({
  status: yup.string().required(),
});

export function UpdateOrderItemModal(props: {
  isOpen: boolean;
  setIsOpen: any;
  item: OrderItemModel | any;
  order: OrderModel;
}) {
  const { isOpen, order, setIsOpen, item } = props;
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
  const { locale } = useRouter();

  useEffect(() => {
    if (item) {
      const fields = ['status'];
      fields?.forEach((field: any) => setValue(field, item[field]));
    }
  }, [item, setValue]);

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
        orderItemId: item?.id,
      });

      setHasErrors(false);
      setLoading(false);
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
          <div className="relative m-auto w-full max-w-3xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212] overflow-y-scroll max-h-screen">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen((lk: boolean) => !lk)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>

            {/* <div className="py-2">
              <h2 className="font-bold text-gray-900 text-base">Product</h2>
              <div className="py-2 flex-shrink-0">
                {item?.uploadsImages?.length > 0 ? (
                  <div className="mt-2 mx-auto flex justify-center">
                    <ListCarouselUpload
                      uploads={item?.uploadsImages}
                      folder="products"
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : null}
              </div>
            </div> */}

            <div className="py-6">
              <div className="flex items-center">
                <div className="relative shrink-0 cursor-pointer">
                  <AvatarComponent size={70} profile={item?.profile} />
                </div>
                <div className="ml-2 cursor-pointer">
                  <p className="text-sm font-bold">
                    {item?.profile?.firstName ?? ''}{' '}
                    {item?.profile?.lastName ?? ''}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {item?.profile?.email ?? ''}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {formateDMYHH(item?.createdAt as Date, locale as string)}
                  </p>
                </div>

                <div className="ml-auto">
                  <ButtonInput type="button" size="sm" variant="info">
                    <span className="ml-1 font-bold">Message</span>
                  </ButtonInput>
                </div>
              </div>
            </div>

            <div className="py-2">
              <div className="flex items-center">
                <h2 className="font-bold text-base">{item?.product?.title}</h2>

                <div className="ml-auto">
                  <SerialPrice
                    className="font-bold text-lg"
                    value={Number(item?.priceDiscount)}
                    currency={{ code: String(item?.currency) }}
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <div className="mt-2 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  disabled
                >
                  {item?.model}
                </ButtonInput>
                {item?.status === 'CANCELLED' && (
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="danger"
                    disabled
                  >
                    {item?.status}
                  </ButtonInput>
                )}

                {['DELIVERED'].includes(item?.status) && (
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="success"
                    disabled
                  >
                    {item?.status}
                  </ButtonInput>
                )}
                {['ACCEPTED'].includes(item?.status) && (
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="info"
                    disabled
                  >
                    {item?.status}
                  </ButtonInput>
                )}
                {item?.status === 'PENDING' && (
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="warning"
                    disabled
                  >
                    {item?.status}
                  </ButtonInput>
                )}
              </div>
            </div>

            <div className="py-4">
              <h2 className="font-bold text-base">Address</h2>

              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="mb-2">
                  <Label
                    htmlFor={'country'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    name="country"
                    defaultValue={order?.address?.country ?? ''}
                    placeholder="country"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <Label
                    htmlFor={'city'}
                    className="mb-2 block text-sm font-bold"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    name="city"
                    defaultValue={order?.address?.city ?? ''}
                    placeholder="city"
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                <div className="mb-2">
                  <Label
                    htmlFor={'address'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    defaultValue={order?.address?.street1 ?? ''}
                    placeholder="address"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <Label
                    htmlFor={'cap'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Cap
                  </Label>
                  <Input
                    id="cap"
                    type="text"
                    name="cap"
                    defaultValue={order?.address?.cap ?? ''}
                    placeholder="address"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <Label
                    htmlFor={'phone'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    name="phone"
                    defaultValue={order?.address?.phone ?? ''}
                    placeholder="Phone Number"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <h2 className="font-bold text-base">Payment details</h2>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                <div className="mb-2">
                  <Label
                    htmlFor={'quantity'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="text"
                    name="quantity"
                    defaultValue={item.quantity}
                    placeholder="quantity"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <Label
                    htmlFor={'orderNumber'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Order Number
                  </Label>
                  <Input
                    id="orderNumber"
                    type="text"
                    name="orderNumber"
                    defaultValue={order.orderNumber}
                    placeholder="Order number"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <Label
                    htmlFor={'quantity'}
                    className="mb-2 block text-sm font-bold"
                  >
                    Payment Method
                  </Label>
                  <Input
                    id="paymentMethod"
                    type="text"
                    name="paymentMethod"
                    defaultValue={'PAYPAL'}
                    placeholder=" Payment Method"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {item?.product?.productType === 'PHYSICAL' && (
              <>
                <div className="mt-2 mx-auto flex justify-start">
                  <h6 className="mt-3 text-center text-xl font-bold">{`Change status order`}</h6>
                </div>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  {hasErrors && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{hasErrors}</AlertDescription>
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
                      onClick={() => setIsOpen((lk: boolean) => !lk)}
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
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
