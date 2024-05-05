import { UpdateOneOrderItemAPI } from '@/api-site/order-item';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateToRFC2822,
  formateYYDDMM,
} from '@/utils';
import {
  BadgeAlertIcon,
  CalendarDaysIcon,
  CheckCheckIcon,
  CheckIcon,
  MoveLeftIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting/button-input';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';

type Props = {
  orderItem: any;
};

const schema = yup.object({});

const UpdateOrderItemForm = ({ orderItem }: Props) => {
  const { back } = useRouter();
  const { locale } = useInputState();
  const {
    setValue,
    handleSubmit,
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

  const onSubmit = async () => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        status: 'ACCEPTED',
        orderItemId: orderItem?.id,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 py-5">
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

          {orderItem?.product?.isExpired ? (
            <>
              <div className="mx-auto size-32 text-red-500">
                <BadgeAlertIcon className="size-32" />
              </div>
              <p className="text-center text-3xl font-bold">
                {'Event expired'}
              </p>
            </>
          ) : (
            <>
              {orderItem?.confirmedAt ? (
                <div className="mx-auto size-32 text-green-500">
                  <CheckCheckIcon className="size-32" />
                </div>
              ) : (
                <div className="mx-auto size-32 text-gray-600">
                  <CheckIcon className="size-32" />
                </div>
              )}
              <p className="text-center text-3xl font-bold">
                {orderItem?.confirmedAt ? 'Event confirmed' : 'Confirm event'}
              </p>
            </>
          )}

          <p className="mt-4 text-center text-lg font-semibold text-gray-600">
            {orderItem?.product?.title}
          </p>
          <div className="mx-auto max-w-sm">
            <p className="mt-4 text-center text-lg font-semibold">
              <ButtonInput
                type="button"
                size="lg"
                variant="primary"
                icon={<CalendarDaysIcon className="size-4" />}
                onClick={() => back()}
              >
                {formateToRFC2822(
                  orderItem?.product?.expiredAt as Date,
                  locale,
                ).toUpperCase()}
              </ButtonInput>
            </p>
          </div>

          <p className="mt-4 text-center text-lg font-bold text-gray-600">
            <Badge
              className="rounded-sm"
              variant={orderItem?.confirmedAt ? 'success' : 'info'}
            >
              <span className="ml-2">{orderItem?.product?.address ?? ''}</span>
              <span className="ml-2 text-gray-400">-</span>
              <span className="ml-2">{orderItem?.product?.city ?? ''}</span>
              <span className="ml-2 text-gray-400">|</span>
              <span className="ml-2">{orderItem?.product?.timeInit ?? ''}</span>
              <span className="ml-1.5 text-gray-400">-</span>
              <span className="ml-1.5">
                {orderItem?.product?.timeEnd ?? ''}
              </span>
            </Badge>
          </p>

          {orderItem?.confirmedAt && (
            <>
              <hr className="mt-4 border-gray-200 dark:border-gray-600" />
              <p className="mt-2 text-center text-2xl font-bold">
                Confirmation
              </p>
              <p className="mt-2 text-center text-lg font-bold text-gray-600">
                <Badge className="rounded-sm" variant={'warning'}>
                  {formateYYDDMM(
                    orderItem?.confirmedAt as Date,
                    locale,
                  ).toUpperCase()}
                </Badge>
              </p>
            </>
          )}

          <div className="mx-auto max-w-sm">
            <div className="my-4 flex items-center space-x-4">
              <ButtonInput
                type="button"
                className="w-full"
                size="lg"
                variant="outline"
                icon={<MoveLeftIcon className="size-4" />}
                onClick={() => back()}
              >
                Back
              </ButtonInput>
              {!orderItem?.product?.isExpired ? (
                <ButtonInput
                  type="submit"
                  className="w-full"
                  size="lg"
                  variant={orderItem?.confirmedAt ? 'success' : 'info'}
                  loading={loading}
                  disabled={orderItem?.confirmedAt ? true : false}
                >
                  {orderItem?.confirmedAt ? 'Event confirmed' : 'Confirmed'}
                </ButtonInput>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateOrderItemForm };
