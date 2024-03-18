import { MediumFooter } from '@/components/footer/medium-footer';
import { LayoutSite } from '@/components/layout-site';
import { GetStaticPropsContext } from 'next';

const TermsCondition = () => {
  return (
    <>
      <LayoutSite title="Terms Condition">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 bg-white py-12 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-4xl">
                Terms of use
              </h2>
            </div>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl xl:max-w-4xl">
                <div className="mt-8">
                  <p className="font-pj text-base font-normal leading-7 text-gray-500">
                    Welcome to {process.env.NEXT_PUBLIC_NAME_SITE} this page
                    explains our terms of use. When you use{' '}
                    {process.env.NEXT_PUBLIC_NAME_SITE}, you’re agreeing to all
                    the rules on this page. Some of them need to be expressed in
                    legal language, but we’ve done our best to offer you clear
                    and simple explanations of what everything means.
                  </p>

                  <h2 className="font-pj mt-12 text-3xl font-bold">
                    Website Visitors
                  </h2>

                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-500">
                    To sign up for a {process.env.NEXT_PUBLIC_NAME_SITE}{' '}
                    account, you need to be 18 or over. You’re responsible for
                    your account and all the activity on it. You can browse{' '}
                    {process.env.NEXT_PUBLIC_NAME_SITE} without registering for
                    an account. But to use some of our features, you’ll need to
                    register, choose a username, and set a password. When you do
                    that, the information you give us has to be accurate and
                    complete. Don’t impersonate anyone else or choose names that
                    are offensive or that violate anyone’s rights. If you don’t
                    follow these rules, we may cancel your account.
                  </p>
                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-500">
                    You’re responsible for all the activity on your account, and
                    for keeping your password confidential. If you find out that
                    someone has used your account without your permission, you
                    should report it to support@unpot.com.
                  </p>

                  <p className="font-pj mt-4 text-base font-normal leading-7 text-gray-500">
                    To sign up for an account, you need to be at least 18 years
                    old, or old enough to form a binding contract where you
                    live. If necessary, we may ask you for proof of age.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MediumFooter />
        </div>
      </LayoutSite>
    </>
  );
};

export default TermsCondition;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
