import { ButtonInput, HeaderSite, ImageLogo } from '@/components/ui-setting';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth = ({ children, title }: IProps) => {
  const { query, push } = useRouter();
  const { redirect } = query;

  return (
    <>
      <HeaderSite
        title={title}
        metas={
          <>
            <meta
              name="description"
              content={`Tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
            />
          </>
        }
      />

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
                    </div>
                  </div>
                  <div className="hidden h-8 w-auto lg:block">
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
