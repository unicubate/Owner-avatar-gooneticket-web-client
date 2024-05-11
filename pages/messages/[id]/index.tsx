import {
  GetConversationsMessagesAPI,
  GetOneConversationAPI,
} from '@/api-site/conversations';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateFormMessages } from '@/components/messages/create-form-messages';
import { ListConversations } from '@/components/messages/list-conversations';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import {
  AvatarComponent,
  EmptyData,
  LoadingFile,
} from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { capitalizeFirstLetter } from '@/utils/utils';
import { MailIcon, MoveLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const MessagesView = () => {
  const { query, push } = useRouter();
  const { ref, inView } = useInView();
  const chatContainerRef: any = useRef(null);
  const fkConversationId = String(query?.id);

  const {
    data: conversation,
    isLoading: isLoadingConversation,
    isError: isErrorConversation,
  } = GetOneConversationAPI({
    fkConversationId,
  });

  const {
    isLoading: isLoadingConversationMessages,
    isError: isErrorConversationMessages,
    data: dataConversationMessages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetConversationsMessagesAPI({
    take: 20,
    sort: 'DESC',
    fkConversationId,
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const dataTableMessages =
    isLoadingConversationMessages || isLoadingConversation ? (
      <LoadingFile />
    ) : isErrorConversation || isErrorConversationMessages ? (
      <ErrorFile title="404" description="Error find messages" />
    ) : dataConversationMessages?.pages[0]?.data?.total <= 0 ? (
      <EmptyData
        image={<MailIcon className="size-10" />}
        title="You don't have any message"
        description={`Share your page with your audience to get started.`}
      />
    ) : (
      dataConversationMessages?.pages
        .flatMap((page: any) => page?.data?.value)
        .reverse()
        .map(
          (item, index) =>
            conversation?.fkConversationId && (
              <ListConversations item={item} key={index} index={index} />
            ),
        )
    );

  return (
    <>
      <LayoutDashboard title={'Messages'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="py-2 sm:mt-0">
                  <ButtonInput
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => push(`/messages`)}
                    icon={<MoveLeft className="size-4" />}
                  />
                </div>
              </div>
              <div className="flex h-[580px] flex-col items-center justify-center">
                <div className="flex w-full grow flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:border-gray-800 dark:bg-[#04080b]">
                  {conversation?.fkConversationId && (
                    <div className="mt-auto flex items-center border-b-2 border-gray-50 p-2 dark:border-gray-900">
                      <div className="relative shrink-0 cursor-pointer">
                        <AvatarComponent
                          size={40}
                          profile={conversation?.profile}
                        />
                      </div>

                      <div className="ml-3 cursor-pointer">
                        <p className="text-sm font-bold">
                          {capitalizeFirstLetter(
                            conversation?.profile?.firstName ?? '',
                          )}{' '}
                          {capitalizeFirstLetter(
                            conversation?.profile?.lastName ?? '',
                          )}
                        </p>
                      </div>

                      <div className="ml-auto"></div>
                    </div>
                  )}
                  <div
                    className="flex h-0 grow flex-col overflow-auto border-b-2 border-gray-50 p-4 dark:border-gray-900"
                    ref={chatContainerRef}
                  >
                    {hasNextPage && (
                      <div className="mx-auto mt-2 justify-center text-center">
                        <ButtonLoadMore
                          ref={ref}
                          size="sm"
                          variant="secondary"
                          children={`Load old conversations`}
                          isFetchingNextPage={isFetchingNextPage}
                          onClick={() => fetchNextPage()}
                        />
                      </div>
                    )}
                    {dataTableMessages}
                  </div>

                  {conversation?.fkConversationId ? (
                    <div className="mt-auto p-2">
                      <CreateFormMessages
                        model="MESSAGE"
                        conversation={conversation}
                        chatContainerRef={chatContainerRef}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MessagesView);
