/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCommentReplyAPI } from '@/api-site/comment';
import { CommentModel } from '@/types/comment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ModelType } from '@/utils/pagination-item';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { useDialog } from '../hooks/use-dialog';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateFormCommentReply } from './create-or-update-form-comment-reply';

type Props = {
  model: ModelType;
  item?: CommentModel;
  index?: number;
  userId?: string;
};

const ListCommentsRepliesPosts: React.FC<Props> = ({
  item,
  model,
  userId,
  index,
}) => {
  const { locale } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();
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
        text: 'Comment deleted successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <>
      <div key={index} className="mt-4 flex items-start">
        <AvatarComponent size={40} profile={item?.profile} />

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
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <CreateOrUpdateFormLike typeLike="COMMENT" item={item} />

            {userId === item?.userId ? (
              <>
                <button
                  onClick={() => editItem(item)}
                  className="ml-3.5 hover:text-indigo-400 focus:ring-indigo-400"
                >
                  <MdOutlineModeEdit className="size-5" />
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
                      <MdOutlineDeleteOutline />
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
          openModalReply={openModalReply}
          setOpenModalReply={setOpenModalReply}
        />
      ) : null}
    </>
  );
};

export default ListCommentsRepliesPosts;
