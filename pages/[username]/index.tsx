import { GetOneUserPublicAPI } from '@/api-site/user';
import { CreateConversationForm } from '@/components/contact-us/create-conversation-form';
import { TablePublicProductsEvent } from '@/components/event/table-public-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { CreateOrUpdateFormFollow } from '@/components/like-follow/create-or-update-form-follow';
import { CoverComponent, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/router';

const ProfilePublic = () => {
  const { userStorage: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${user?.profile?.lastName ?? ''
          }`}
        user={user}
      >
        <div className="mx-auto max-w-max px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="container mx-auto space-y-8 p-4">

            {user?.organizationId ?
              <div className="relative bg-gray-900 py-20 sm:py-20 lg:py-24 xl:py-32">
                <div className="absolute inset-0">
                  <CoverComponent className="size-full object-cover" profile={user?.profile} />
                </div>

                <div className="absolute inset-0 bg-gray-900/50"></div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-max text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                      {user?.organization?.name}
                    </h1>

                    {user?.profile?.description && (
                      <p className="mt-4 text-gray-200 sm:text-lg/relaxed">
                        <HtmlParser
                          html={String(user?.profile?.description ?? '')}
                        />
                      </p>
                    )}


                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <div className="py-2 sm:mt-0">
                        {userVisiter?.id !== user?.id ? (
                          <CreateConversationForm item={user} />
                        ) : null}
                      </div>
                      <div className="py-2 sm:mt-0">
                        {userVisiter?.id !== user?.id ? (
                          <CreateOrUpdateFormFollow item={user} />
                        ) : null}
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              : null}

            <div className="flow-root">
              {user?.organizationId ? <TablePublicProductsEvent organizationId={user?.organizationId} /> : null}
            </div>

          </div>
        </div>


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
