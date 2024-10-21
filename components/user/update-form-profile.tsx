import { UpdateOneProfileAPI } from '@/api-site/profile';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting/button-input';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProfileFormModel, ProfileModel, arrayColors } from '@/types/profile';
import { UserModel } from '@/types/user';
import { oneImageToURL } from '@/utils';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
// const { Option } = Select;

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };
// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     AlertDangerNotification({
//       text: 'You can only upload JPG/PNG file!',
//     });
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     AlertDangerNotification({
//       text: 'Image must smaller than 2MB!',
//     });
//   }
//   return isJpgOrPng && isLt2M;
// };

type Props = {
  currencies: any[];
  user: UserModel | any;
  profile: ProfileModel | any;
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  url: yup.string().url().nullable(),
  currencyId: yup.string().required('country is a required field'),
});

const UpdateFormProfile = ({ profile, user, currencies }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(
    oneImageToURL(profile?.image),
  );
  const [attachment, setAttachment] = useState<any>();
  const [colors] = useState(arrayColors);
  const { hasErrors, setHasErrors } = useInputState();
  const {
    reset,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (profile) {
      const fields: (keyof ProfileFormModel)[] = [
        'url',
        'phone',
        'currencyId',
        'firstName',
        'lastName',
        'address',
        'description',
      ];
      fields.forEach((field) => setValue(field, profile[field]));
    }
  }, [user, profile, setValue]);

  const { isPending: loading, mutateAsync: saveMutation } =
    UpdateOneProfileAPI();

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    data: ProfileFormModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...data,
        username: user?.username,
        attachment,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        description: `information save successfully`,
      });
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  // const handleChange: UploadProps['onChange'] = (primary) => {
  //   const { file } = primary;
  //   if (['done', 'error'].includes(String(file?.status))) {
  //     getBase64(file?.originFileObj as FileType, (url) => {
  //       setImageUrl(url as any);
  //       setAttachment(file?.originFileObj);
  //     });
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-base font-bold"> Profile </h2>

        {hasErrors && (
          <Alert variant="destructive" className="mb-4 bg-red-600 text-center">
            <AlertDescription className="text-white">
              {hasErrors}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          <Controller
            name="attachment"
            control={control}
            render={({}) => (
              <>
                <div className="mx-auto justify-center text-center">
                  {/* <Upload
                        name="attachment"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        accept=".png,.jpg,.jpeg,.gif"
                        maxCount={1}
                      >
                        {imageUrl ? (
                          <Avatar
                            size={100}
                            shape="circle"
                            src={imageUrl}
                            alt={`${profile?.firstName} ${profile?.lastName}`}
                          />
                        ) : (
                          <div className="text-center text-black dark:text-white">
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Profile</div>
                          </div>
                        )}
                      </Upload> */}
                </div>
              </>
            )}
          />
        </div>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
          <div className="mt-2">
            <TextInput
              label="First name"
              control={control}
              type="text"
              name="firstName"
              placeholder="First name"
              errors={errors}
            />
          </div>

          <div className="mt-2">
            <TextInput
              label="Last name"
              control={control}
              type="text"
              name="lastName"
              placeholder="Last name"
              errors={errors}
            />
          </div>

          <div className="mt-2">
            <TextInput
              label="Phone"
              control={control}
              type="text"
              name="phone"
              placeholder="Phone"
              errors={errors}
            />
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mt-2">
            <TextInput
              label="Website"
              control={control}
              type="url"
              name="url"
              placeholder="Website"
              errors={errors}
            />
          </div>
          <div className="mt-2">
            <TextInput
              label="Address"
              control={control}
              type="text"
              name="address"
              placeholder="address"
              errors={errors}
            />
          </div>
        </div>

        <div className="mt-4">
          <SelectInput
            label="Currency"
            control={control}
            errors={errors}
            placeholder="Currency"
            name="currencyId"
          >
            {currencies?.length > 0 ? (
              currencies?.map((item: any, index: number) => (
                <option value={item?.id} key={index}>
                  <span className="font-normal">{item?.name}</span>
                </option>
              ))
            ) : (
              <option style={{ textAlign: 'center' }}>
                <span>Data Not Found</span>
              </option>
            )}
          </SelectInput>

          <span className="text-sm font-medium text-gray-400">
            {`Your supporters will pay in this currency.`}
          </span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
          <div className="mt-2">
            <TextAreaInput
              control={control}
              label="Bio"
              name="description"
              placeholder="Introduce yourself and what you're creating"
              errors={errors}
            />
          </div>
        </div>

        <div className="mb-2 mt-4 flex items-center justify-end space-x-4">
          <ButtonInput
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            Save changes
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { UpdateFormProfile };
