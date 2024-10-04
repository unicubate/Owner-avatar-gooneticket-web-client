import { CreateContactAPI } from '@/api-site/contact';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { ContactUsFormModel } from '@/types/contact-us';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FieldRequiredMessage } from '../ui-setting';

const CreateContactForm = () => {
  const { t, loading, setLoading, hasErrors, setHasErrors } = useInputState();
  const schema = yup.object({
    email: yup
      .string()
      .email(t.formatMessage({ id: 'AUTH.VALIDATION.WRONG.FORMAT' }))
      .min(3, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 3 }))
      .max(
        50,
        t.formatMessage({ id: 'AUTH.VALIDATION.MAX_LENGTH' }, { max: 50 }),
      )
      .required(
        FieldRequiredMessage({
          id: 'AUTH.VALIDATION.REQUIRED',
          name: 'AUTH.INPUT.EMAIL',
        }),
      ),
    fullName: yup.string().required(
      FieldRequiredMessage({
        id: 'AUTH.VALIDATION.REQUIRED',
        name: 'AUTH.INPUT.FULLNAME',
      }),
    ),
    subject: yup.string().required(
      FieldRequiredMessage({
        id: 'AUTH.VALIDATION.REQUIRED',
        name: 'AUTH.INPUT.SUBJECT',
      }),
    ),
    description: yup.string().required(
      FieldRequiredMessage({
        id: 'AUTH.VALIDATION.REQUIRED',
        name: 'AUTH.INPUT.MESSAGE',
      }),
    ),
    confirm: yup
      .boolean()
      .oneOf([true], t.formatMessage({ id: 'AUTH.VALIDATION.BOX.CONFIRM' }))
      .required(
        FieldRequiredMessage({
          id: 'AUTH.VALIDATION.REQUIRED',
          name: 'AUTH.INPUT.CONFIRM',
        }),
      ),
  });

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

  const { mutateAsync: saveMutation } = CreateContactAPI();

  const onSubmit: SubmitHandler<ContactUsFormModel> = async (
    data: ContactUsFormModel,
  ) => {
    let newImageLists: any = [];
    setLoading(true);
    setHasErrors(undefined);

    try {
      await saveMutation({
        ...data,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: t.formatMessage({ id: 'CONTACT.US.SEND.SUCCESSFULLY' }),
      });
      reset({
        ...data,
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
            label={t.formatMessage({ id: 'AUTH.INPUT.FULLNAME' })}
            type="text"
            name="fullName"
            placeholder={t.formatMessage({ id: 'PLACEHOLDER.FULLNAME' })}
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextInput
            control={control}
            label={t.formatMessage({ id: 'AUTH.INPUT.PHONE' })}
            type="tel"
            name="phone"
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder={t.formatMessage({ id: 'PLACEHOLDER.PHONE' })}
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextInput
            control={control}
            label={t.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
            type="text"
            name="email"
            placeholder={t.formatMessage({ id: 'PLACEHOLDER.EMAIL' })}
            errors={errors}
          />
        </div>

        <div className="mb-4">
          <TextInput
            control={control}
            type="text"
            label={t.formatMessage({ id: 'AUTH.INPUT.SUBJECT' })}
            name="subject"
            placeholder={t.formatMessage({ id: 'PLACEHOLDER.SUBJECT' })}
            errors={errors}
          />
        </div>
        <div className="mb-4">
          <TextAreaInput
            control={control}
            label={t.formatMessage({ id: 'AUTH.INPUT.MESSAGE' })}
            name="description"
            placeholder={t.formatMessage({ id: 'PLACEHOLDER.MESSAGE' })}
            errors={errors}
          />
        </div>

        {/* {watchEnableUpload && (
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
                  {t.formatMessage({ id: 'CONTACT.US.FILE_UPLOAD.BTN' })}
                </ButtonInput>
              )}
            </Upload>
          </div>
        )} */}

        <div className="mt-4">
          <Controller
            name="confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <div className="flex items-center">
                  <div className="flex">
                    <Checkbox checked={value} onCheckedChange={onChange} />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="remember-me"
                      //className="text-sm font-bold text-gray-700"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t.formatMessage({ id: 'CONTACT.US.ACCEPT_TERMS' })}{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/terms-condition"
                      >
                        {t.formatMessage({ id: 'CONTACT.US.TERMS_OF_USE' })}
                      </Link>{' '}
                      &{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/privacy-policy"
                      >
                        {t.formatMessage({ id: 'CONTACT.US.PRIVACY_POLICY' })}
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
            {t.formatMessage({ id: 'CONTACT.US.SUBMIT' })}
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { CreateContactForm };
