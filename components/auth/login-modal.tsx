import { loginUserAPI } from '@/api-site/user';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { UserLoginFormModel } from '@/types/user';
import { AlertDangerNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput, FieldRequiredMessage } from '../ui-setting';
import { TextInput, TextPasswordInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { GoogleAuthLogin } from './google-auth-login';

const LoginModal: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
}> = ({ isOpen, setIsOpen }) => {
  const { t, loading, setLoading, hasErrors, setHasErrors, linkHref } =
    useInputState();
  const redirect = linkHref;
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
    password: yup
      .string()
      .min(8, t.formatMessage({ id: 'AUTH.VALIDATION.MIN_LENGTH' }, { min: 8 }))
      .required(
        FieldRequiredMessage({
          id: 'AUTH.VALIDATION.REQUIRED',
          name: 'AUTH.INPUT.PASSWORD',
        }),
      ),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      await loginUserAPI({ email, password });
      setHasErrors(false);
      setLoading(false);
      location.reload();
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: 'An error has occurred.',
      });
    }
  };

  return (
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogContent className="max-h-screen max-w-sm overflow-y-scroll dark:border-input">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="float-right"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </Button>
            <div className="flex-auto justify-center p-2">
              <h6 className="mt-4 text-center text-xl font-bold">
                {t.formatMessage({ id: 'AUTH.LOGIN.TITLE' })}
              </h6>

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
                <TextInput
                  control={control}
                  label={t.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
                  type="email"
                  name="email"
                  placeholder={t.formatMessage({ id: 'PLACEHOLDER.EMAIL' })}
                  errors={errors}
                />
              </div>

              <div className="mt-4">
                <TextPasswordInput
                  control={control}
                  label={t.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
                  name="password"
                  placeholder={t.formatMessage({
                    id: 'PLACEHOLDER.PASSWORD',
                  })}
                  errors={errors}
                />
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm dark:dark:text-white"
                  ></label>
                  <Link
                    className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                    href={`/forgot-password${redirect ? `?redirect=${redirect}` : ''}`}
                  >
                    {t.formatMessage({ id: 'AUTH.FORGOT.TITLE' })}
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                >
                  {t.formatMessage({ id: 'AUTH.GENERAL.SUBMIT_BUTTON' })}
                </ButtonInput>
              </div>
            </div>
          </form>
          <div className="mt-2 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
            <p className="text-center text-xs uppercase dark:dark:text-gray-400 dark:text-gray-500">
              {t.formatMessage({ id: 'AUTH.LOGIN.SOCIAL.TITLE' })}
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          <div className="flex justify-center">
            <GoogleAuthLogin setHasErrors={setHasErrors} />
          </div>

          <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            <p className="mt-4 cursor-pointer text-center text-xs text-gray-600 hover:underline dark:hover:text-blue-600">
              {' '}
              {t.formatMessage({ id: 'UTIL.NEW_TO' })}{' '}
              {process.env.NEXT_PUBLIC_NAME_SITE}?{' '}
              <span className="font-bold">
                {t.formatMessage({ id: 'AUTH.REGISTER.HERE' })}
              </span>
            </p>
          </Link>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { LoginModal };
