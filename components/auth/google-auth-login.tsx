import { authGoogleUserAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import { isWebview } from '@/utils/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const GoogleAuthLogin = ({ setHasErrors }: { setHasErrors: any }) => {
  const { query } = useRouter();
  const { redirect } = query;

  if (isWebview(window.navigator.userAgent)) {
    const linkHref =
      typeof window !== 'undefined' ? window.location.href : null;
    //window.location.href = 'x-safari-' + linkHref;
    window.location.href = `${linkHref}`;
    return;
  }

  // const userAgent = window.navigator.userAgent;
  // const linkHref = typeof window !== 'undefined' ? window.location.href : null;
  // if (
  //   userAgent.includes('Mobile') &&
  //   (userAgent.includes('iPhone') ||
  //     userAgent.includes('iPad') ||
  //     userAgent.includes('iPod'))
  // ) {
  //   window.location.href = 'x-safari-' + linkHref;
  //   return;
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
