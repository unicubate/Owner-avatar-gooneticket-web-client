/* eslint-disable @next/next/no-img-element */
import { VerifyTokenUsersAPI } from '@/api-site/user';
import { LayoutAuth } from '@/components/layout-auth';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as yup from 'yup';

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

const Verify = () => {
  const { query, push, back } = useRouter();
  const { token } = query;

  const { status, data: verify } = VerifyTokenUsersAPI({
    token: token,
  });

  return (
    <>
      <LayoutAuth title="Verify account">
        <div className="m-auto mt-10 w-full max-w-3xl rounded-lg p-6 py-12 shadow-md dark:bg-black md:mt-16">
          <div className="mx-auto flex justify-center">
            <img
              className="h-12 w-auto sm:h-14"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
          </div>
          {verify?.action === 'INVITED' ? (
            <>
              <p className="mt-8 text-center text-xl md:text-2xl sm:text-lg">
                You've been invited tho the{' '}
                <b>{verify?.user?.organizationName}</b> organization
              </p>
              <p className="text-center text-sm sm:text-sm">
                invited by the {verify?.user?.lastName}{' '}
                {verify?.user?.firstName}
              </p>

              <div className="mt-4 flex justify-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-md"
                  size="lg"
                  variant="outline"
                  onClick={() => push(`/login`)}
                >
                  Login
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-md"
                  size="lg"
                  variant="info"
                  //   onClick={() => {
                  //     push(`/payments`);
                  //   }}
                >
                  Join organizationName
                </ButtonInput>
              </div>
            </>
          ) : null}
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
export default Verify;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/auth.json`)).default,
      },
    },
  };
}
