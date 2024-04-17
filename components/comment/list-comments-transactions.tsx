/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteCommentsRepliesAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import { formateFromNow } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ModelType } from '@/utils/paginations';
import { ReplyIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateOrUpdateFormCommentReply } from '../comment/create-or-update-form-comment-reply';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { useAuth } from '../util/context-user';
import { ListCommentsRepliesTransactions } from './list-comments-replies-transactions';

type Props = {
  item: CommentModel;
  model: ModelType;
  modelIds: ModelType[];
  index: number;
  userReceiveId?: string;
  organizationId: string;
};

const ListCommentTransactions = ({
  model,
  modelIds,
  item,
  userReceiveId,
  organizationId,
  index,
}: Props) => {
  const { locale } = useInputState();
  const { userStorage: userVisiter } = useAuth() as any;
  const [openModalReply, setOpenModalReply] = useState(false);

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsRepliesAPI({
    take: 6,
    sort: 'DESC',
    modelIds: modelIds,
    commentId: String(item?.id),
    organizationId,
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    ''
  ) : isErrorComments ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : Number(dataComments?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsRepliesTransactions
          model={model}
          item={item}
          key={index}
          index={index}
          userReceiveId={String(userReceiveId)}
        />
      ))
  );
  return (
    <>
      <li key={index} className="py-4">
        <div className="flex items-start">
          <AvatarComponent
            size={45}
            profile={
              item?.profile?.username
                ? item?.profile
                : { firstName: item?.fullName }
            }
          />

          <div className="ml-3">
            <div className="flex items-center space-x-px">
              <div className="flex items-center">
                {item?.profile?.username ? (
                  <Link
                    href={`/${item?.profile?.username}`}
                    className="text-sm font-bold text-black dark:text-white"
                  >
                    {item?.profile?.firstName} {item?.profile?.lastName}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-black dark:text-white">
                    {item?.fullName}
                  </span>
                )}

                <p className="ml-3.5 text-sm font-normal text-gray-500">
                  {formateFromNow(item?.createdAt as Date, locale)}
                </p>
              </div>
            </div>
            <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
              <HtmlParser html={String(item?.description ?? '')} />
            </p>

            <div className="flex items-center font-medium text-gray-600">
              {/* Replies comments */}
              {!openModalReply && userVisiter?.id === item?.userReceiveId ? (
                <>
                  <button
                    onClick={() => {
                      setOpenModalReply((lk) => !lk);
                    }}
                    className="ml-3.5 text-2xl hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <ReplyIcon className="size-6" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Replies comments */}
        <div className="ml-16">
          {openModalReply ? (
            <CreateOrUpdateFormCommentReply
              model={model}
              parentId={String(item?.id)}
              organizationId={item?.organizationId}
              openModalReply={openModalReply}
              setOpenModalReply={setOpenModalReply}
            />
          ) : null}

          {dataTableCommentsReplies}

          {hasNextPage ? (
            <>
              <div className="mt-6 flex flex-col items-center justify-between">
                {isFetchingNextPage ? null : (
                  <button
                    disabled={isFetchingNextPage ? true : false}
                    onClick={() => fetchNextPage()}
                    className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                  >
                    View more response
                  </button>
                )}
              </div>
            </>
          ) : null}
        </div>
      </li>
    </>
  );
};

export { ListCommentTransactions };
