import { UpdateOneProfileAPI } from '@/api-site/profile';
import { ProfileFormModel, ProfileModel, arrayColors } from '@/types/profile';
import { UserModel } from '@/types/user';
import { oneImageToURL } from '@/utils';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { UploadOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, GetProp, Select, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting/button-input';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';
import { Label } from '../ui/label';
const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    AlertDangerNotification({
      text: 'You can only upload JPG/PNG file!',
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    AlertDangerNotification({
      text: 'Image must smaller than 2MB!',
    });
  }
  return isJpgOrPng && isLt2M;
};

type Props = {
  user: UserModel | any;
  profile: ProfileModel | any;
};

const schema = yup.object({
  firstName: yup.string().required(),
  username: yup.string().required('username is a required field'),
  lastName: yup.string().required(),
  url: yup.string().url().nullable(),
});

const UpdateFormProfile = ({ profile, user }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(
    oneImageToURL(profile?.image),
  );
  const [attachment, setAttachment] = useState<any>();
  const [colors] = useState(arrayColors);
  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();
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
      const fields = [
        'url',
        'phone',
        'firstName',
        'lastName',
        'address',
        'description',
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
    if (user) {
      const fields = ['username'];
      fields?.forEach((field: any) => setValue(field, user[field]));
    }
  }, [user, profile, setValue]);
  const watchUsername = watch('username', user?.username);

  const { mutateAsync: saveMutation } = UpdateOneProfileAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    data: ProfileFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...data,
        attachment,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `information save successfully`,
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

  const handleChange: UploadProps['onChange'] = (primary) => {
    const { file } = primary;
    if (['done', 'error'].includes(String(file?.status))) {
      getBase64(file?.originFileObj as FileType, (url) => {
        setImageUrl(url as any);
        setAttachment(file?.originFileObj);
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#04080b]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold"> Profile </h2>

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

            <div className="mt-4">
              <Controller
                name="attachment"
                control={control}
                render={({}) => (
                  <>
                    <div className="mx-auto justify-center text-center">
                      <Upload
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
                      </Upload>
                    </div>
                  </>
                )}
              />
            </div>

            {/* <div className="mt-2">
              <TextInput
                control={control}
                label="Username"
                type="text"
                name="username"
                placeholder="username"
                errors={errors}
              />
            </div> */}

            <div className="mt-2">
              <TextInput
                control={control}
                label="Username"
                type="text"
                name="username"
                placeholder="username"
                errors={errors}
                required
                labelHelp={
                  <Label className="ml-auto block text-start text-sm">
                    {`${process.env.NEXT_PUBLIC_SITE}/${watchUsername}`}
                  </Label>
                }
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
                variant="info"
                className="w-full"
                loading={loading}
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormProfile };
