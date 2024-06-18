'use client';

import { ReadOneConversationAPI } from '@/api-site/conversations';
import { ConversationModel } from '@/types/message';
import { AlertDangerNotification, formateFromNow } from '@/utils';
import { HtmlParserMessage } from '@/utils/html-parser';
import { useRouter } from 'next/navigation';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';

type Props = {
  item?: ConversationModel;
  index: number;
};

export function ListConversationsMessage({ item, index }: Props) {
  const { push } = useRouter();
  const { locale, setHasErrors } = useInputState();

  // Create or Update data
  const { mutateAsync: saveMutation } = ReadOneConversationAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const readAtItem = async () => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        fkConversationId: String(item?.fkConversationId),
      });
      setHasErrors(true);
      push(`/messages/${item?.fkConversationId}`, { scroll: false });
    } catch (error: any) {
      setHasErrors(true);
      AlertDangerNotification({
        text: `${error?.response?.data?.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={index}
        className={`py-2 ${item?.readAt ? 'hover:bg-gray-100 dark:hover:bg-gray-900' : 'bg-gray-100 dark:bg-gray-900'}  cursor-pointer`}
        onClick={() => {
          item?.readAt
            ? push(`/messages/${item?.fkConversationId}`, { scroll: false })
            : readAtItem();
        }}
      >
        <div className="flex items-center">
          <AvatarComponent className="size-9" profile={item?.profile} />
          <div className="ml-2 min-w-0 flex-1">
            <div className="flex items-center">
              <p className="text-sm font-bold">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="ml-auto text-sm font-medium text-gray-500">
                {formateFromNow(item?.lastMessage?.createdAt as Date, locale)}
              </p>
            </div>
            <div className="flex items-center">
              <p className="py-2 text-sm font-medium  text-gray-600">
                <HtmlParserMessage
                  html={String(item?.lastMessage?.description ?? '')}
                  value={120}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
