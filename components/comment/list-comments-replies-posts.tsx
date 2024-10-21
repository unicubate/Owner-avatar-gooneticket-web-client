/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCommentReplyAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ModelType } from '@/utils/paginations';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/avatar-component';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateFormCommentReply } from './create-or-update-form-comment-reply';

export function ListCommentsRepliesPosts(props: {
  model: ModelType;
  item: CommentModel;
  index?: number;
  userId?: string;
}) {
  const { item, model, userId, index } = props;
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();
  const [openModalReply, setOpenModalReply] = useState(false);

  const editItem = (item: any) => {
    setOpenModalReply(true);
  };

  const { mutateAsync: saveMutation } = DeleteOneCommentReplyAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ commentId: item?.id });
      AlertSuccessNotification({
        description: 'Comment deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div key={index} className="mt-4 flex items-start">
        <AvatarComponent className="size-9" profile={item?.profile} />

        <div className="ml-3">
          <div className="flex items-center space-x-px">
            <div className="flex items-center">
              <Link
                href={`/${item?.profile?.username}`}
                className="text-sm font-bold"
              >
                {' '}
                {item?.profile?.firstName} {item?.profile?.lastName}{' '}
              </Link>
              <p className="ml-3.5 text-sm font-normal text-gray-500">
                {formateFromNow(item?.createdAt as Date, locale)}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="mt-2 flex items-center font-medium text-gray-600">
            {userId === item?.userId ? (
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
                      className="text-lg text-gray-600 hover:text-red-600"
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

      {openModalReply ? (
        <CreateOrUpdateFormCommentReply
          parentId={String(item?.id)}
          comment={item}
          model={model}
          organizationId={item?.organizationId}
          openModalReply={openModalReply}
          setOpenModalReply={setOpenModalReply}
        />
      ) : null}
    </>
  );
}
