/* eslint-disable @next/next/no-img-element */
import { ButtonInput } from '@/components/ui-setting/button-input';
import { TextInput, TextPasswordInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PublicComponent } from '@/components/util/public-component';
import { UserRegisterFormModel } from '@/types/user.type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Checkbox } from 'antd';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { registerGoogleUserAPI, registerUserAPI } from '../../api-site/user';

const schema = yup.object({
  email: yup
    .string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required(),
  password: yup.string().min(8, 'Minimum 8 symbols').required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  confirm: yup
    .boolean()
    .oneOf([true], 'Please check the box to deactivate your account')
    .required(),
});

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    false,
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormModel>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserRegisterFormModel> = async (
    payload: UserRegisterFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      const { data: user } = await registerUserAPI({
        ...payload,
        nextStep: 'SETTING_PROFILE',
      });
      setHasErrors(false);
      setLoading(false);
      // localStorage.setItem(
      //   String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
      //   JSON.stringify(user?.accessToken)
      // );
      router.push(`${`/login`}`);
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
    <div className="m-auto mt-10 w-full max-w-lg rounded-lg p-6 py-12 shadow-md dark:bg-[#121212] md:mt-16">
      {/* <div className="mx-auto flex justify-center">
        <img
          className="h-7 w-auto sm:h-8"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </div> */}
      <div className="mx-auto flex justify-center">
        <h6 className="mt-3 text-center text-xl font-bold">
          {`Sign up. It's free!`}
        </h6>
      </div>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {hasErrors && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{hasErrors}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          <TextInput
            control={control}
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Full Name"
            errors={errors}
          />
        </div>

        <div className="mb-4">
          <TextInput
            control={control}
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Full Name"
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
          <TextPasswordInput
            control={control}
            label="Password"
            name="password"
            placeholder="Password"
            errors={errors}
          />
        </div>

        <div className="mb-4">
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
                      className="text-sm font-bold text-gray-700"
                    >
                      I accept the{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/forgot-password"
                      >
                        terms
                      </Link>{' '}
                      &{' '}
                      <Link
                        className="text-sm text-blue-600 hover:underline"
                        href="/forgot-password"
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
              {errors?.confirm?.message}
            </span>
          )}
        </div>

        <div className="mt-6">
          <ButtonInput
            type="submit"
            className="w-full"
            variant="info"
            size="lg"
            loading={loading}
          >
            Create account
          </ButtonInput>
        </div>
      </form>

      <div className="my-4 flex items-center justify-between">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
        <p className="text-center text-xs uppercase text-gray-500 dark:text-gray-400">
          or login with Social Media
        </p>

        <span className="w-1/5 border-b border-gray-400 lg:w-1/5"></span>
      </div>

      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <GoogleLogin
          size="large"
          width={400}
          useOneTap
          onSuccess={async (credentialResponse) => {
            try {
              await registerGoogleUserAPI({
                token: String(credentialResponse.credential),
              });
              setHasErrors(false);
              router.push(`${`/login`}`);
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

      <Link href="/login">
        <p className="mt-8 cursor-pointer text-center text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline">
          {' '}
          Already have an account? Log in here
        </p>
      </Link>
    </div>
  );
};
export default PublicComponent(Register);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
