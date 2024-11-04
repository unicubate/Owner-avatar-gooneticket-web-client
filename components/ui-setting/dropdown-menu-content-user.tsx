import { logoutUsersAPI } from '@/api-site/user';
import {
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
  TicketPlusIcon,
} from 'lucide-react';
import Link from 'next/link';
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
  const { t, linkHref, user } = useInputState();
  const [copied, setCopied] = useState(false);

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login?redirect=${linkHref}`);
    location.reload();
  };
  return (
    <>
      <DropdownMenuContent className="w-auto">
        {user?.status === 'CREATOR' ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HomeIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE_CREATOR}/dashboard`}
                  title="Dashboard"
                  target="_blank"
                >
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'MENU.DASHBOARD' })}
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PlusIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE_CREATOR}/events/create`}
                  title="Create event"
                  target="_blank"
                >
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    Create event
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

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

        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <AlertCircleIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            <span className="ml-2 cursor-pointer hover:text-indigo-600">
              {t.formatMessage({ id: 'UTIL.REPORT' })}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}

        {user?.id ? (
          <>
            {' '}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => push(`/tickets`)}>
                <TicketPlusIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'MENU.TICKET' })}
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
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
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => push(`/settings`)}>
                <FileTextIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  {t.formatMessage({ id: 'MENU.INVOICE' })}
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
