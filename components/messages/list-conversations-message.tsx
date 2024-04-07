'use client';

import { ConversationModel } from '@/types/message';
import { formateFromNow } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/navigation';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';

type Props = {
  item?: ConversationModel;
  index: number;
};

export function ListConversationsMessage({ item, index }: Props) {
  const { push } = useRouter();
  const { lang } = useInputState();

  return (
    <>
      <div
        key={index}
        className="py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
        onClick={() =>
          push(`/messages/${item?.fkConversationId}`, { scroll: false })
        }
      >
        <div className="flex items-center">
          <AvatarComponent size={50} profile={item?.profile} />
          <div className="ml-2 min-w-0 flex-1">
            <div className="flex items-center">
              <p className="text-sm font-bold">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="ml-auto text-sm font-medium text-gray-500">
                {formateFromNow(
                  String(item?.lastMessage?.createdAt),
                  lang as string,
                )}
              </p>
            </div>
            <div className="flex items-center">
              <p className="py-2 text-sm font-medium  text-gray-600">
                <HtmlParser
                  html={String(item?.lastMessage?.description ?? '')}
                  value={140}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
