import { logoutUsersAPI } from '@/api-site/user';
import { ButtonInput, HeaderSite, ThemeToggle } from '@/components/ui-setting';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { UserModel } from '@/types/user';
import {
  LogOutIcon,
  MoveLeftIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from 'lucide-react';
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

      <header className="items-center gap-4 border-b border-gray-100 bg-white dark:border-input dark:bg-background">
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
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                <div className="relative">
                  <ButtonInput
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      back();
                    }}
                    icon={<MoveLeftIcon className="size-4" />}
                  >
                    Come back
                  </ButtonInput>
                </div>
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
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 dark:border-input dark:bg-background">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/orders`)}>
                            <ShoppingCartIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              {t.formatMessage({ id: 'MENU.ORDER' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/settings`)}>
                            <SettingsIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              {t.formatMessage({ id: 'MENU.SETTING' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <LogOutIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                          <span className="ml-2 cursor-pointer hover:text-indigo-600">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-background/100`}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

export { LayoutCheckoutSite };
