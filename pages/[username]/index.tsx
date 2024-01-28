import { GetOneUserPublicAPI } from '@/api-site/user';
import { CreateFormPublicDonation } from '@/components/donation/create-form-public-donation';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { RecentCommentTransactions } from '@/components/transaction/recent-comment-transactions';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { SubHorizontalNavPublicUser } from '@/components/user/sub-horizontal-nav-public-user';
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
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mt-4 max-w-full px-4 sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-full py-6">
              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    {user?.profile?.description && (
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
                    )}

                    <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                      <div className="p-6 sm:p-4">
                        <div className="flex items-center">
                          {user?.id ? (
                            <CreateFormPublicDonation user={user} />
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {user?.donation?.count > 0 ? (
                      <RecentCommentTransactions
                        model="DONATION"
                        modelIds={['DONATION']}
                        userReceiveId={user?.id}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile
          status="error"
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
