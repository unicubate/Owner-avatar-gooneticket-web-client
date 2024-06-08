import { useCanonicalUrl } from '@/components/hooks';
import { ButtonInput, ImageLogo, TitleSite } from '@/components/ui-setting';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth = ({ children, title }: IProps) => {
  const canonicalUrl = useCanonicalUrl();
  const { query, push } = useRouter();
  const { redirect } = query;

  return (
    <>
      <Head>
        <TitleSite title={title} />
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_NAME_SITE}
          key="title"
        />
        <meta
          name="description"
          content={`Tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
        />
        {process.env.NEXT_ENV === 'prod' && (
          <link rel="canonical" href={canonicalUrl} />
        )}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="sticky border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="flex xl:ml-0">
              <Link href="/">
                <div className="flex shrink-0 items-center">
                  <div className="block h-8 w-auto lg:hidden">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <ImageLogo />
                      </div>

                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden h-8 w-auto lg:block">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <Image
                          width={35}
                          height={35}
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                          alt={`${process.env.NEXT_PUBLIC_NAME_SITE}`}
                        />
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <p className="text-lg font-bold">
                          {process.env.NEXT_PUBLIC_NAME_SITE}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="ml-auto flex items-center justify-end space-x-2">
              {/* <div className="flex items-center">
                <ThemeToggle />
              </div> */}
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    push(`/login${redirect ? `?redirect=${redirect}` : ''}`);
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
                    push(`/register${redirect ? `?redirect=${redirect}` : ''}`);
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
