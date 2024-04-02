/* eslint-disable @next/next/no-img-element */
import { useInputState } from '@/components/hooks';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { PublicComponent } from '@/components/util/public-component';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { GoogleLogin } from '@react-oauth/google';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginGoogleUserAPI } from '../../api-site/user';

const Login = () => {
  const { query } = useRouter();
  const { redirect } = query;
  const { hasErrors, setHasErrors } = useInputState();

  return (
    <>
      <LayoutAuth title="Login">
        <div className="m-auto mt-10 w-full max-w-sm rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <h6 className="mt-4 text-center text-xl font-bold">{`Log in Log in to ${process.env.NEXT_PUBLIC_NAME_SITE}`}</h6>
          </div>

          <div className="mt-4 space-y-3">
            <div className="mt-4 text-center justify-center">
              <Link href={`/login/phone-or-email`}>
                <ButtonInput size="lg" variant="outline" type="button">
                  Continue with phone / email
                </ButtonInput>
              </Link>
            </div>

            <div className="mt-4 mx-auto max-w-max">
              <GoogleLogin
                size="large"
                useOneTap
                theme="outline"
                type="standard"
                shape="rectangular"
                width="100%"
                onSuccess={async (credentialResponse) => {
                  try {
                    await loginGoogleUserAPI({
                      token: String(credentialResponse.credential),
                    });
                    setHasErrors(false);
                    window.location.href = `${
                      redirect
                        ? redirect
                        : `${process.env.NEXT_PUBLIC_SITE}/dashboard`
                    }`;
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
            </div>
          </div>

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
