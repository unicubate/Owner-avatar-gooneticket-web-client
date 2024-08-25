import { GetInfiniteConversationsAPI } from '@/api-site/conversations';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ListConversationsMessage } from '@/components/messages/list-conversations-message';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { MailIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Messages = () => {
  const { ref, inView } = useInView();
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingConversation,
    isError: isErrorConversation,
    data: dataConversation,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteConversationsAPI({
    search,
    take: 10,
    sort: 'DESC',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <LayoutDashboard title={t.formatMessage({ id: 'MENU.MESSAGE' })}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-900 dark:bg-background">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    {/* <CreateContributorModal
                      buttonDialog={
                        <ButtonInput
                          type="button"
                          className="w-full"
                          size="sm"
                          variant="primary"
                          icon={<PlusIcon className="mr-2 size-4" />}
                        >
                          Invite contributor
                        </ButtonInput>
                      }
                      showModal={isOpen}
                      setShowModal={setIsOpen}
                    /> */}

                    {/* <ButtonInput
                      type="button"
                      className="w-full"
                      size="sm"
                      variant="primary"
                      icon={<PlusIcon className="mr-2 size-4" />}
                    >
                      New message
                    </ButtonInput> */}
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <SearchInput
                      placeholder={t.formatMessage({ id: 'UTIL.SEARCH_BY' })}
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="mt-2 divide-y divide-gray-200 dark:divide-gray-800">
                  {isLoadingConversation ? (
                    <LoadingFile />
                  ) : isErrorConversation ? (
                    <ErrorFile
                      title="404"
                      description="Error find data please try again..."
                    />
                  ) : Number(dataConversation?.pages[0]?.data?.total) <= 0 ? (
                    <EmptyData
                      image={<MailIcon className="size-10" />}
                      title={t.formatMessage({ id: 'UTIL.ANY_MESSAGE' })}
                      description={t.formatMessage({
                        id: 'UTIL.ANY_SUB_MESSAGE',
                      })}
                    />
                  ) : (
                    dataConversation?.pages
                      .flatMap((page: any) => page?.data?.value)
                      .map((item, index) => (
                        <ListConversationsMessage
                          item={item}
                          key={index}
                          index={index}
                        />
                      ))
                  )}
                </div>
              </div>

              {hasNextPage && (
                <div className="mx-auto mt-2 justify-center text-center">
                  <ButtonLoadMore
                    ref={ref}
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Messages);
