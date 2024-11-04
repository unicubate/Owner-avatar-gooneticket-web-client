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
  const { locale, user } = useInputState();

  const organizationId = user?.organizationId;
  return (
    <>
      <div
        key={index}
        className={`flex w-full max-w-xl space-x-3 ${organizationId === item?.organizationId ? 'ml-auto justify-end' : ''}`}
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
            className={`p-3 text-white ${organizationId !== item?.organizationId ? 'rounded-r-lg rounded-bl-xl bg-gray-600' : 'rounded-l-lg rounded-br-xl bg-blue-600'} `}
          >
            <p className="text-sm">
              <HtmlParserMessage html={String(item?.description ?? '')} />
            </p>
          </div>

          {/* {organizationId === item?.organizationId && (
            <CheckCheckIcon className="size-3" />
          )} */}

          <div className="ml-auto">
            <span className="text-xs leading-none text-gray-500">
              {formateFromNow(item?.createdAt as Date, locale)}
            </span>
            {/* <span className="ml-2 text-gray-500 leading-none">
              <CheckCheckIcon className="size-3" />
            </span> */}
          </div>
        </div>
      </div>
    </>
  );
}
