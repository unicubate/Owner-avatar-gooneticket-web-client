import { logoutUsersAPI } from '@/api-site/user';
import { MediumFooter } from '@/components/footer/medium-footer';
import {
  DropdownMenuContentUser,
  HeaderSite,
  ThemeToggle,
} from '@/components/ui-setting';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { UserModel } from '@/types/user';
import { useRouter } from 'next/router';
import { useInputState } from '../../hooks';
import { Button } from '../../ui/button';

interface IProps {
  title: string;
  user?: UserModel;
  children: React.ReactNode;
}

const LayoutCheckoutSite = ({ user, children, title }: IProps) => {
  const { t, userStorage: userVisiter, linkHref } = useInputState();
  const { back, push } = useRouter();

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login?redirect=${linkHref}`);
    location.reload();
  };

  return (
    <>
      <HeaderSite title={title} />

      <header className="dark:border-input dark:bg-background items-center gap-4 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button type="button" variant="ghost">
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              {user?.id ? <HorizontalNavPublicUser user={user} /> : null}
            </div>

            <div className="ml-auto flex items-center justify-end space-x-2">
              <div className="flex items-center">
                <ThemeToggle />
                {userVisiter?.id ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="-m-3">
                          <svg
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContentUser />
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`dark:bg-background flex min-h-screen flex-1 flex-col bg-gray-100`}
      >
        <main>{children}</main>
      </div>

      <MediumFooter />
    </>
  );
};

export { LayoutCheckoutSite };
