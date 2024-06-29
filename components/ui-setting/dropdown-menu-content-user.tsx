import { logoutUsersAPI } from '@/api-site/user';
import {
  AlertCircleIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { CopyShareLink } from './copy-share-link';

const DropdownMenuContentUser = ({ username }: { username?: string }) => {
  const { push } = useRouter();
  const { t, linkHref, userStorage: user } = useInputState();
  const [copied, setCopied] = useState(false);

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login?redirect=${linkHref}`);
    location.reload();
  };
  return (
    <>
      <DropdownMenuContent className="w-auto dark:border-gray-800 dark:bg-[#04080b]">
        {user?.status === 'CREATOR' ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HomeIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_CREATOR}/dashboard`}
                  title="Dashboard"
                  target="_blank"
                >
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'MENU.DASHBOARD' })}
                  </span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}

        {username ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setCopied(true)}>
                <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'UTIL.SHARE' })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AlertCircleIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            <span className="ml-2 cursor-pointer hover:text-indigo-600">
              {t.formatMessage({ id: 'UTIL.REPORT' })}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {user?.id ? (
          <>
            <DropdownMenuSeparator />
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
          </>
        ) : null}
      </DropdownMenuContent>

      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/${username}`}
      />
    </>
  );
};
export { DropdownMenuContentUser };
