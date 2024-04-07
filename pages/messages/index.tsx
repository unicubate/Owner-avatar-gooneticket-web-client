import { GetInfiniteConversationsAPI } from '@/api-site/conversations';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ListConversationsMessage } from '@/components/messages/list-conversations-message';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { MailIcon, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Messages = () => {
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

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

  const dataTableContributors = isLoadingConversation ? (
    <LoadingFile />
  ) : isErrorConversation ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataConversation?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<MailIcon className="size-10" />}
      title="You don't have any message"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataConversation?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListConversationsMessage item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Messages'}>
        <div className="mx-auto max-w-5xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#121212]">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    {/* <CreateContributorModal
                      buttonDialog={
                        <ButtonInput
                          type="button"
                          className="w-full"
                          size="sm"
                          variant="info"
                          icon={<PlusIcon className="mr-2 size-4" />}
                        >
                          Invite contributor
                        </ButtonInput>
                      }
                      showModal={isOpen}
                      setShowModal={setIsOpen}
                    /> */}

                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="sm"
                      variant="info"
                      icon={<PlusIcon className="mr-2 size-4" />}
                    >
                      New message
                    </ButtonInput>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <SearchInput
                      placeholder="Search by first name, last name, email"
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="mt-2 divide-y divide-gray-200 dark:divide-gray-800">
                  {dataTableContributors}
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
