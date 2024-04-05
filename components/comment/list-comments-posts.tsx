/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  DeleteOneCommentAPI,
  GetInfiniteCommentsRepliesAPI,
} from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ModelType } from '@/utils/paginations';
import { PencilIcon, ReplyIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ButtonInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateFormComment } from './create-or-update-form-comment';
import { CreateOrUpdateFormCommentReply } from './create-or-update-form-comment-reply';
import { ListCommentsRepliesPosts } from './list-comments-replies-posts';

export function ListCommentsPosts(props: {
  organizationId: string;
  model: ModelType;
  modelIds: ModelType[];
  userVisitorId: string;
  item: CommentModel;
  index?: number;
}) {
  const { model, item, modelIds, userVisitorId, organizationId, index } = props;

  const { isOpen, setIsOpen, loading, setLoading, userStorage, lang } =
    useInputState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalReply, setOpenModalReply] = useState(false);

  const editItem = (item: any) => {
    setOpenModal(true);
  };

  const { mutateAsync: saveMutation } = DeleteOneCommentAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ commentId: item?.id });
      AlertSuccessNotification({
        text: 'Comment deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsRepliesAPI({
    take: 2,
    sort: 'DESC',
    modelIds,
    commentId: String(item?.id),
    userVisitorId,
    organizationId,
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    <LoadingFile />
  ) : isErrorComments ? (
    <ErrorFile title="404" description="Error find data please try again" />
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsRepliesPosts
          model={model}
          item={item}
          key={index}
          index={index}
          userId={userStorage?.id}
        />
      ))
  );

  return (
    <>
      <li key={index} className="py-4">
        {!openModal ? (
          <div className="flex items-start">
            <AvatarComponent size={40} profile={item?.profile} />

            <div className="ml-3">
              <div className="flex items-center space-x-px">
                <div className="flex items-center">
                  <Link
                    href={`/${item?.profile?.username}`}
                    className="text-sm font-bold text-black dark:text-white"
                  >
                    {item?.profile?.firstName} {item?.profile?.lastName}{' '}
                  </Link>
                  <p className="ml-3.5 text-sm font-normal text-gray-500">
                    {formateFromNow(item?.createdAt as Date, lang as string)}
                  </p>
                </div>
              </div>
              <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
                <HtmlParser html={String(item?.description ?? '')} />
              </p>
              <div className="mt-2 flex items-center font-medium text-gray-600">
                <CreateOrUpdateFormLike typeLike="COMMENT" item={item} />

                {userStorage?.id ? (
                  <button
                    onClick={() => {
                      setOpenModalReply((lk) => !lk);
                    }}
                    className="ml-2 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <ReplyIcon className="size-6" />
                  </button>
                ) : null}

                {userStorage?.id === item?.userId ? (
                  <>
                    <button
                      onClick={() => editItem(item)}
                      className="ml-3.5 hover:text-indigo-400 focus:ring-indigo-400"
                    >
                      <PencilIcon className="size-4" />
                    </button>

                    <ActionModalDialog
                      title="Delete?"
                      loading={loading}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      onClick={() => deleteItem(item)}
                      description="Are you sure you want to delete this comment?"
                      buttonDialog={
                        <ButtonInput
                          className="text-sm text-gray-600 hover:text-red-600"
                          variant="link"
                          type="button"
                        >
                          <TrashIcon className="size-4" />
                        </ButtonInput>
                      }
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* Replies comments */}
        <div className="ml-16">
          {openModalReply ? (
            <CreateOrUpdateFormCommentReply
              model={model}
              organizationId={item?.organizationId}
              parentId={String(item?.id)}
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

        {/* Comments */}
        {openModal ? (
          <CreateOrUpdateFormComment
            model={model}
            organizationId={item?.organizationId}
            postId={item?.postId}
            comment={item}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}
      </li>
    </>
  );
}
