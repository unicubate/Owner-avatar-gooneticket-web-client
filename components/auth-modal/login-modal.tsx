import { loginGoogleUserAPI, loginUserAPI } from '@/api-site/user';
import { UserLoginFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { TextInput, TextPasswordInput } from '../ui-setting/shadcn';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
});

const LoginModal: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
}> = ({ isOpen, setIsOpen }) => {
  const { query } = useRouter();
  const { redirect } = query;
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

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
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-sm rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <X />
              </span>
            </button>

            <div className="mx-auto flex justify-center">
              <h6 className="mt-3 text-center text-xl font-bold">{`Log in`}</h6>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <div className="relative mb-4 block w-full rounded-lg p-4 text-base leading-5 opacity-100 dark:bg-red-500 dark:text-white">
                  {hasErrors}
                </div>
              )}

              <div className="mb-4">
                <TextInput
                  control={control}
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  errors={errors}
                />
              </div>

              <div className="mb-4">
                <TextPasswordInput
                  control={control}
                  label="Password"
                  name="password"
                  placeholder="Password"
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
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="info"
                  size="lg"
                  loading={loading}
                >
                  Log In
                </ButtonInput>
              </div>
            </form>
            <div className="my-4 flex items-center justify-between">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
              <p className="text-center text-xs uppercase dark:dark:text-gray-400 dark:text-gray-500">
                or login with Social Media
              </p>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex justify-center">
              <GoogleOAuthProvider
                clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
              >
                <GoogleLogin
                  size="large"
                  width="100%"
                  useOneTap
                  theme="filled_blue"
                  type="standard"
                  shape="rectangular"
                  onSuccess={async (credentialResponse) => {
                    try {
                      const { data: user } = await loginGoogleUserAPI({
                        token: String(credentialResponse.credential),
                      });
                      setHasErrors(false);
                      location.reload();
                    } catch (error: any) {
                      setHasErrors(true);
                      setHasErrors(error.response.data.message);
                      AlertDangerNotification({
                        text: 'An error has occurred.',
                      });
                    }
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </GoogleOAuthProvider>
            </div>

            <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
              <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:underline dark:hover:text-blue-600">
                {' '}
                New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
              </p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { LoginModal };
