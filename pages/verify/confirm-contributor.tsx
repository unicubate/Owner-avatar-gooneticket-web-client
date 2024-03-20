/* eslint-disable @next/next/no-img-element */
import { VerifyTokenUsersAPI } from '@/api-site/user';
import { ConfirmProfileContributor } from '@/components/contributor/confirm-profile-contributor';
import { LayoutAuth } from '@/components/layout-auth';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const ConfirmContributor = () => {
  const { query, push, back } = useRouter();
  const { token } = query;
  const { status, data: verify } = VerifyTokenUsersAPI({
    token: String(token),
  });

  return (
    <>
      <LayoutAuth title="Confirm your account">
        <div className="m-auto mt-10 w-full max-w-2xl rounded-lg p-6 py-6 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div>

          {verify?.user && <ConfirmProfileContributor verify={verify} />}
        </div>
      </LayoutAuth>
      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};
export default ConfirmContributor;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
