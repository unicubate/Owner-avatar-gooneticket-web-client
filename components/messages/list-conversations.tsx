'use client';

import { ConversationsMessageModel } from '@/types/message';
import { formateFromNow } from '@/utils';
import { HtmlParserMessage } from '@/utils/html-parser';
import { useInputState } from '../hooks';

type Props = {
  item?: ConversationsMessageModel;
  index: number;
};

export function ListConversations({ item, index }: Props) {
  const { locale, userStorage } = useInputState();

  const organizationId = userStorage?.organizationId;
  return (
    <>
      <div
        key={index}
        className={`flex w-full space-x-3 max-w-xl ${organizationId === item?.organizationId ? 'ml-auto justify-end' : ''}`}
      >
        {/* {organizationId !== item?.organizationId && (
          <AvatarComponent
            //size={40}
            className="size-8"
            profile={item?.profile}
          />
        )} */}

        {/* {organizationId !== item?.organizationId && (
          <img src={''} className="object-cover size-8 rounded-full" alt="" />
        )} */}

        <div>
          <div
            className={`text-white p-3 ${organizationId !== item?.organizationId ? 'bg-gray-600 rounded-r-lg rounded-bl-xl' : 'bg-blue-600 rounded-l-lg rounded-br-xl'} `}
          >
            <p className="text-sm">
              <HtmlParserMessage html={String(item?.description ?? '')} />
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">
            {formateFromNow(String(item?.createdAt), locale)}
          </span>
        </div>
      </div>
    </>
  );
}
