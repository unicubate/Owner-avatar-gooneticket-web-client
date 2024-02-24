import { GetOneUserPublicAPI } from '@/api-site/user';
import { CreateFormPublicDonation } from '@/components/donation/create-form-public-donation';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { PublicPostsHome } from '@/components/post/public-posts-home';
import { RecentCommentTransactions } from '@/components/transaction/recent-comment-transactions';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { useAuth } from '@/components/util/context-user';
import { HtmlParser } from '@/utils/html-parser';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const ProfilePublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ''} ${
          user?.profile?.lastName ?? 'Profile'
        }`}
        user={user}
      >
        <div className="mt-4 max-w-8xl px-4 sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-10 sm:mt-12 sm:grid-cols-1 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-x-10 xl:grid-cols-6 xl:gap-x-10">
              {user?.id ? (
                <>
                  <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
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

                  <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
                    <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
                      <div className="flow-root">
                        <div className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                          <div className="p-6 sm:p-4">
                            <div className="flex items-center">
                              <CreateFormPublicDonation user={user} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]">
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
          {/* <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-full py-6">
              {user?.id ? (
                <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
                  <div className="flow-root">
                    <div className="mx-auto sm:px-6 md:px-8">
                      <div className="mt-2 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                        <div className="p-8 sm:p-4">
                          <div className="flex items-center">
                            <div
                              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
                            >
                              <span className={`ql-editor`}>
                                <HtmlParser
                                  html={String(
                                    user?.profile?.description ?? '',
                                  )}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                        <div className="p-6 sm:p-4">
                          <div className="flex items-center">
                            <CreateFormPublicDonation user={user} />
                          </div>
                        </div>
                      </div>

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
              ) : null}
            </div>
          </div> */}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
