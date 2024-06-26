import { CreateContactAPI } from '@/api-site/contact';
import { useInputState, useUploadItem } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting/button-input';
import {
  SwitchInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ContactUsFormModel } from '@/types/contact-us';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { UploadOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Upload } from 'antd';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  fullName: yup.string().required('first name is a required field'),
  subject: yup.string().required('last name is a required field'),
  description: yup.string().required('last name is a required field'),
  confirm: yup
    .boolean()
    .oneOf([true], 'Please check the box to deactivate your account')
    .required(),
});

const CreateContactForm = () => {
  const { fileList, handleFileChange } = useUploadItem({});
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

  const watchEnableUpload = watch('enableUpload', false);

  const { mutateAsync: saveMutation } = CreateContactAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ContactUsFormModel> = async (
    data: ContactUsFormModel,
  ) => {
    let newImageLists: any = [];
    setLoading(true);
    setHasErrors(undefined);

    try {
      fileList
        .filter((file: any) => file?.status === 'success')
        .forEach((file: any) => {
          newImageLists.push(file);
        });

      await saveMutation({
        ...data,
        fileList,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Message send successfully`,
      });
      reset({
        ...data,
        fileList,
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
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        {hasErrors && (
          <Alert variant="destructive" className="mb-4 bg-red-600 text-center">
            <AlertDescription className="text-white">
              {hasErrors}
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          <TextInput
            control={control}
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Full Name"
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextInput
            control={control}
            label="Phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextInput
            control={control}
            label="Email"
            type="text"
            name="email"
            placeholder="Email Address"
            errors={errors}
          />
        </div>

        <div className="mb-4">
          <TextInput
            control={control}
            type="text"
            label="Subject"
            name="subject"
            placeholder="Subject"
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextAreaInput
            control={control}
            label="Message"
            name="description"
            placeholder="Message"
            errors={errors}
          />
        </div>

        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold dark:text-white">
                File to upload
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                I have a file I want to attach
              </p>
            </div>
          </div>

          <SwitchInput control={control} name="enableUpload" label="" />
        </div>

        {watchEnableUpload && (
          <div className="mx-auto mt-4 justify-center text-center">
            <Upload
              multiple
              name="attachmentFiles"
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf,.gif,.doc,.docx,.xml,.csv,.mp3,.flac.,.xlx,.xls,.zip,.gif"
              maxCount={5}
            >
              {fileList.length >= 5 ? null : (
                <ButtonInput
                  type="button"
                  size="sm"
                  variant="primary"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </ButtonInput>
              )}
            </Upload>
          </div>
        )}

        <div className="mt-4">
          <Controller
            name="confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <div className="flex items-center">
                  <div className="flex">
                    <Checkbox checked={value} onChange={onChange} />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="remember-me"
                      //className="text-sm font-bold text-gray-700"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I accept the{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/terms-condition"
                      >
                        terms
                      </Link>{' '}
                      &{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/privacy-policy"
                      >
                        privacy policy
                      </Link>
                    </label>
                  </div>
                </div>
              </>
            )}
          />
          {errors?.confirm && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              {errors?.confirm?.message as any}
            </span>
          )}
        </div>

        <div className="mt-6">
          <ButtonInput
            type="submit"
            className="w-full"
            variant="primary"
            size="lg"
            loading={loading}
          >
            Create account
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { CreateContactForm };
