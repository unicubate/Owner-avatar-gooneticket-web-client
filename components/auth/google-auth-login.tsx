import { authGoogleUserAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';

const GoogleAuthLogin = () => {
  const { query } = useRouter();
  const { redirect } = query;
  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();

  return (
    <>
      <GoogleLogin
        size="large"
        useOneTap
        theme="outline"
        type="standard"
        shape="rectangular"
        width="100%"
        onSuccess={async (credentialResponse) => {
          try {
            const { data: user } = await authGoogleUserAPI({
              token: String(credentialResponse.credential),
              status: 'CLIENT',
            });
            setHasErrors(false);
            window.location.href =
              user?.status === 'CREATOR'
                ? `${redirect ? redirect : `${process?.env.NEXT_PUBLIC_SITE_CREATOR}/dashboard`}`
                : `${redirect ? redirect : `${process?.env.NEXT_PUBLIC_SITE}/orders`}`;
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
    </>
  );
};

export { GoogleAuthLogin };
