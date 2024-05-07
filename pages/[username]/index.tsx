import { GetOneUserPublicAPI } from '@/api-site/user';
import { CreateConversationForm } from '@/components/contact-us/create-conversation-form';
import { TablePublicProductsEvent } from '@/components/event/table-public-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { CreateOrUpdateFormFollow } from '@/components/like-follow/create-or-update-form-follow';
import { CopyShareLink } from '@/components/ui-setting';
import { CoverComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HtmlParser } from '@/utils/html-parser';
import { AlertCircleIcon, MoreHorizontalIcon, ShareIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProfilePublic = () => {
  const [copied, setCopied] = useState(false);
  const { userStorage: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    organizationVisitorId: userVisiter?.organizationId,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${user?.profile?.lastName ?? ''
          }`}
        user={user}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="container mx-auto space-y-8 p-4">

            {user?.organizationId ?
              <>
                <div className="relative bg-gray-900 py-20 sm:py-20 lg:py-24 xl:py-32">
                  <div className="absolute inset-0">
                    <CoverComponent className="size-full object-cover" profile={user?.profile} />
                  </div>

                  <div className="absolute inset-0 bg-gray-900/50"></div>

                  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-max text-center">
                      <h1 className="text-4xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                        {user?.organization?.name}
                      </h1>

                      {user?.profile?.description && (
                        <p className="mt-4 font-bold text-gray-300 sm:text-sm/relaxed">
                          <HtmlParser
                            html={String(user?.profile?.description ?? '')}
                          />
                        </p>
                      )}

                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
                  <div className="py-2 sm:mt-0">
                    {userVisiter?.id !== user?.id ? (
                      <CreateConversationForm item={user} />
                    ) : null}
                  </div>
                  <div className="py-2 sm:mt-0">
                    {userVisiter?.organizationId && userVisiter?.organizationId !== user?.organizationId ? (
                      <CreateOrUpdateFormFollow item={user} />
                    ) : null}
                  </div>
                  <div className="py-2 sm:mt-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline">
                          <MoreHorizontalIcon className="size-5 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#121212]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setCopied(true)}>
                            <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              Share
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                          //onClick={() => push(`/events/${item?.id}/edit`)}
                          >
                            <AlertCircleIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              Report
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </>

              : null}



            <div className="flow-root">
              {user?.organizationId ? <TablePublicProductsEvent organizationId={user?.organizationId} /> : null}
            </div>

          </div>
        </div>


        <CopyShareLink
          isOpen={copied}
          setIsOpen={setCopied}
          link={`${process.env.NEXT_PUBLIC_SITE}/${username}`}
        />

      </LayoutUserPublicSite>

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

export default ProfilePublic;
