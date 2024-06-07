import { GetAllCountiesAPI } from '@/api-site/profile';
import { CreateOrUpdateOneUserAddressAPI } from '@/api-site/user-address';
import { UserAddressFormModel } from '@/types/user-address';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { TextInput } from '../ui-setting/shadcn';

type Props = {
  userAddress?: any;
  isEdit: boolean;
  setIsEdit: any;
};

const schema = yup.object({
  fullName: yup.string().required('full name is a required field'),
  address: yup.string().required('address is a required field'),
  email: yup.string().email().required('email is a required field'),
  city: yup.string().required('city is a required field'),
});

const CreateOrUpdateUserAddressForm = ({
  userAddress,
  setIsEdit,
  isEdit,
}: Props) => {
  const { userStorage, isOpen, setIsOpen } = useInputState();
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

  const { data: countries } = GetAllCountiesAPI();
  useEffect(() => {
    if (userAddress) {
      const fields = [
        'country',
        'url',
        'phone',
        'cap',
        'city',
        'fullName',
        'email',
        'address',
      ];
      fields?.forEach((field: any) => setValue(field, userAddress[field]));
    }
  }, [userAddress, setValue]);

  const { mutateAsync: saveMutation } = CreateOrUpdateOneUserAddressAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<UserAddressFormModel> = async (
    payload: UserAddressFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    setIsEdit((i: boolean) => !i);
    try {
      await saveMutation({
        ...payload,
        userAddressId: userAddress?.id,
      });
      setHasErrors(false);
      setLoading(false);
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
        <div className="mt-2">
          <TextInput
            label="Email"
            control={control}
            type="email"
            name="email"
            placeholder="Email"
            errors={errors}
            disabled={isEdit}
          />
          <span className="text-xs font-medium text-gray-400">
            {`After booking, your ticket will be sent to this email address.`}
          </span>
        </div>
        <div className="mt-2">
          <TextInput
            label="Full name"
            control={control}
            type="text"
            name="fullName"
            placeholder="Full name"
            errors={errors}
            disabled={isEdit}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mt-2">
            <TextInput
              label="City"
              control={control}
              type="text"
              name="city"
              placeholder="City"
              errors={errors}
              disabled={isEdit}
            />
          </div>
          <div className="mt-2">
            <TextInput
              label="Address"
              control={control}
              type="text"
              name="address"
              placeholder="Address"
              errors={errors}
              disabled={isEdit}
            />
          </div>
        </div>

        {!isEdit ? (
          <div className="mt-4 flex items-center space-x-4">
            {userStorage?.id ? (
              <>
                <ButtonInput
                  size="lg"
                  type="submit"
                  variant="info"
                  className="w-full"
                  loading={loading}
                >
                  Continue
                </ButtonInput>
              </>
            ) : (
              <ButtonInput
                size="lg"
                onClick={() => {
                  setIsOpen(true);
                }}
                type="button"
                variant="primary"
                className="w-full"
                loading={loading}
              >
                Continue
              </ButtonInput>
            )}
          </div>
        ) : null}
      </form>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export { CreateOrUpdateUserAddressForm };
