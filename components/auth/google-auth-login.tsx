import { authGoogleUserAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const GoogleAuthLogin = ({ setHasErrors }: { setHasErrors: any }) => {
  const { query } = useRouter();
  const { redirect } = query;

  const userAgent = window.navigator.userAgent;
  const url = window.location.href;
  if (
    userAgent.includes('Mobile') &&
    (userAgent.includes('iPhone') || userAgent.includes('iPad')) &&
    userAgent.includes('InstagramApp')
  ) {
    window.location.href = 'x-safari-' + url;
    return;
  }

  // if (isWebview(window.navigator.userAgent)) {
  //   toast("Open Fatebook in Safari or Chrome to sign in.\n\nGoogle does not support this browser.", {
  //     duration: 10000,
  //   })
  //   return
  // }

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
