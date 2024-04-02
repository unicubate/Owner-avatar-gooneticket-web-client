/* eslint-disable @next/next/no-img-element */
import { useReactHookForm } from '@/components/hooks/use-react-hook-form';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { TextInput } from '@/components/ui-setting/shadcn';
import { TextPasswordInput } from '@/components/ui-setting/shadcn/text-password-input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserLoginFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { loginUserAPI } from '../../../api-site/user';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
});

const Login = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const {
    watch,
    control,
    setValue,
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
      const { data: user } = await loginUserAPI({ email, password });
      setHasErrors(false);
      setLoading(false);
      if (user?.confirmedAt) {
        window.location.href = `${
          redirect ? redirect : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
        }`;
      } else {
        push(`/verify/confirm-email${redirect ? `?redirect=${redirect}` : ''}`);
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <LayoutAuth title="Login">
        <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          {/* <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div> */}
          <div className="mx-auto flex justify-center">
            <h6 className="mt-4 text-center text-xl font-bold">{`Log in`}</h6>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            {hasErrors && (
              <Alert variant="destructive" className="mb-4 text-center">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mb-4">
              <TextInput
                control={control}
                label="Email or username"
                type="text"
                name="email"
                placeholder="Email or username"
                errors={errors}
                labelHelp={
                  <Link
                    href={`/login/phone-or-email/phone${redirect ? `?redirect=${redirect}` : ''}`}
                  >
                    <p className="cursor-pointer text-xs font-bold text-gray-600 hover:underline dark:hover:text-blue-600">
                      Log in with phone
                    </p>
                  </Link>
                }
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

            <div className="mt-4">
              <ButtonInput
                type="submit"
                className="w-full"
                variant="info"
                loading={loading}
              >
                Log In
              </ButtonInput>
            </div>
          </form>

          <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`}>
            <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:underline dark:hover:text-blue-600">
              {' '}
              New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
            </p>
          </Link>
        </div>
      </LayoutAuth>
    </>
  );
};

export default PublicComponent(Login);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
