import { useInputState } from '@/components/hooks';
import { ButtonInput, HeaderSite, ImageLogo } from '@/components/ui-setting';
import { LangToggle } from '@/components/ui-setting/lang-toggle';
import { LogInIcon, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth = ({ children, title }: IProps) => {
  const { t } = useInputState();
  const { query, push } = useRouter();
  const { redirect } = query;

  return (
    <>
      <HeaderSite title={title} />

      <header className="dark:border-input dark:bg-background sticky border-b border-gray-100">
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
              <div className="flex items-center">
                <LangToggle />
              </div>
              <div className="relative">
                <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`}>
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="outline"
                    icon={<LogInIcon className="size-4 lg:hidden" />}
                  >
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {t.formatMessage({ id: 'MENU.REGISTER' })}
                    </span>
                  </ButtonInput>
                </Link>
              </div>
              <div className="relative">
                <Link
                  href={`/register${redirect ? `?redirect=${redirect}` : ''}`}
                >
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="primary"
                    icon={<UserPlusIcon className="size-4 lg:hidden" />}
                  >
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {t.formatMessage({ id: 'MENU.LOGIN' })}
                    </span>
                  </ButtonInput>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dark:bg-background flex min-h-screen flex-1 flex-col bg-gray-100">
        <main>{children}</main>
      </div>
    </>
  );
};

export { LayoutAuth };
