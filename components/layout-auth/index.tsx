import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ButtonInput, ThemeToggle } from '../ui-setting';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth: React.FC<IProps> = ({ children, title }) => {
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_NAME_SITE}
          key="title"
        />
        <meta
          name="description"
          content="Un Pot is the best way for creators and artists to accept support and membership from their fans."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="sticky border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <div className="block w-auto h-8 lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>

                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 hidden w-auto h-8 lg:block">
                  <div className="flex items-center">
                    <div
                      onClick={() => push('/')}
                      className="relative shrink-0 cursor-pointer"
                    >
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end ml-auto space-x-2">
              <div className="flex items-center">
                <ThemeToggle />
              </div>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    push(`/login`);
                  }}
                >
                  Log In
                </ButtonInput>
              </div>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="info"
                  onClick={() => {
                    push(`/register`);
                  }}
                >
                  Sign Up
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
};

export { LayoutAuth };
