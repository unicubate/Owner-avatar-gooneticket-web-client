import { GetOneUserPublicAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { CreateConversationsModal } from '@/components/messages/create-conversations-modal';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useRouter } from 'next/router';

const ProfilePublic = () => {
  const { isOpen, setIsOpen, userStorage: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto max-w-max px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="container mx-auto space-y-8 p-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Partem reprimique an pro</h2>
              <p className="font-serif text-sm dark:text-gray-600">
                Qualisque erroribus usu at, duo te agam soluta mucius.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              <article className="flex flex-col dark:bg-gray-50">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="h-52 w-full object-cover dark:bg-gray-500"
                    src="https://source.unsplash.com/200x200/?fashion?1"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600"
                  >
                    Convenire
                  </a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Te nulla oportere reprimique his dolorum
                  </h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 1, 2020</span>
                    <span>2.1K views</span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col dark:bg-gray-50">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="h-52 w-full object-cover dark:bg-gray-500"
                    src="https://source.unsplash.com/200x200/?fashion?2"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600"
                  >
                    Convenire
                  </a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Te nulla oportere reprimique his dolorum
                  </h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 2, 2020</span>
                    <span>2.2K views</span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col dark:bg-gray-50">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="h-52 w-full object-cover dark:bg-gray-500"
                    src="https://source.unsplash.com/200x200/?fashion?3"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600"
                  >
                    Convenire
                  </a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Te nulla oportere reprimique his dolorum
                  </h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 3, 2020</span>
                    <span>2.3K views</span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col dark:bg-gray-50">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="h-52 w-full object-cover dark:bg-gray-500"
                    src="https://source.unsplash.com/200x200/?fashion?4"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a>
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600"
                  >
                    Convenire
                  </a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Te nulla oportere reprimique his dolorum
                  </h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 4, 2020</span>
                    <span>2.4K views</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
              {user?.profile?.description && (
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
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

              <div className="flow-root">
                <div className="mx-auto sm:px-6 md:px-8">
                  {userVisiter && userVisiter?.id !== user?.id && (
                    <div className="py-2 sm:mt-0">
                      <ButtonInput
                        type="button"
                        size="lg"
                        variant="default"
                        className="w-full"
                        onClick={() => setIsOpen(true)}
                        icon={<MailPlusIcon className="size-5" />}
                      >
                        Send message
                      </ButtonInput>
                    </div>
                  )}
                </div>
              </div>

              {user?.id ? (
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-[#121212]">
                      <div className="p-8 sm:p-4">
                        <div className="flex items-center">
                          <CreateFormPublicDonation user={user} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {user?.id ? (
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    <PublicPostsHome
                      typeIds={['ARTICLE', 'AUDIO', 'VIDEO', 'GALLERY']}
                      userVisitor={{
                        id: userVisiter?.id,
                        username: username,
                        organizationId: user?.organizationId,
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {user?.donation?.count > 1 ? (
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    <RecentCommentTransactions
                      model="DONATION"
                      modelIds={['DONATION']}
                      userReceiveId={user?.id}
                      organizationId={user?.organizationId}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div> */}

        <CreateConversationsModal
          isOpen={isOpen}
          user={user}
          setIsOpen={setIsOpen}
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
