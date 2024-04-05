import { GetOneUserPublicAPI } from '@/api-site/user';
import { CreateFormPublicDonation } from '@/components/donation/create-form-public-donation';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { PublicPostsHome } from '@/components/post/public-posts-home';
import { RecentCommentTransactions } from '@/components/transaction/recent-comment-transactions';
import { LoadingFile } from '@/components/ui-setting/ant';
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
        title={`${user?.profile?.firstName ?? 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        {/* <div className="mt-4 max-w-8xl px-4 sm:px-6 lg:px-8"> */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
            {user?.id ? (
              <>
                <div className="my-4 border-gray-200 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">
                    {user?.id ? (
                      <PublicPostsHome
                        typeIds={['ARTICLE', 'AUDIO', 'VIDEO', 'GALLERY']}
                        userVisitor={{
                          id: userVisiter?.id,
                          username: username,
                          organizationId: user?.organizationId,
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="my-8 lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                  {user?.profile?.description && (
                    <div className="mt-4 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                      <div className="flow-root">
                        <div className="p-8 sm:p-4">
                          <div className="flex items-center">
                            <div
                              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
                            >
                              <HtmlParser
                                html={String(user?.profile?.description ?? '')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                    <div className="flow-root">
                      <div className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                        <div className="p-8 sm:p-4">
                          <div className="flex items-center">
                            <CreateFormPublicDonation user={user} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                    <div className="flow-root">
                      {user?.donation?.count > 0 ? (
                        <RecentCommentTransactions
                          model="DONATION"
                          modelIds={['DONATION']}
                          userReceiveId={user?.id}
                          organizationId={user?.organizationId}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {/* </div> */}
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
