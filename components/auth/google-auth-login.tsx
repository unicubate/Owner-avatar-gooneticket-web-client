import { authGoogleUserAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const GoogleAuthLogin = ({ setHasErrors }: { setHasErrors: any }) => {
  const { query } = useRouter();
  const { redirect } = query;

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
            await authGoogleUserAPI({
              token: String(credentialResponse.credential),
              status: 'CLIENT',
            });
            setHasErrors(false);
            window.location.href = `${redirect ? redirect : `${process?.env.NEXT_PUBLIC_SITE}/tickets`}`;
          } catch (error: any) {
            setHasErrors(true);
            setHasErrors(error.response.data.message);
            AlertDangerNotification({
              text: error.response.data.message,
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
