/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Avatar, Skeleton } from 'antd';
import { BiComment } from 'react-icons/bi';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { CommentModel } from '@/types/comment';
import {
  DeleteOneCommentAPI,
  GetInfiniteCommentsRepliesAPI,
} from '@/api-site/comment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import ListCommentsRepliesPosts from './list-comments-replies-posts';
import { useAuth } from '../util/context-user';
import { CreateOrUpdateFormComment } from './create-or-update-form-comment';
import { HtmlParser } from '@/utils/html-parser';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { CreateOrUpdateFormCommentReply } from './create-or-update-form-comment-reply';
import { BsReplyAll } from 'react-icons/bs';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import Link from 'next/link';
import { ModelType } from '@/utils/pagination-item';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { LoadingFile } from '../ui-setting/ant';

type Props = {
  organizationId: string;
  model: ModelType;
  modelIds: ModelType[];
  userVisitorId: string;
  item?: CommentModel;
  index?: number;
};

const ListCommentsPosts: React.FC<Props> = ({
  model,
  item,
  modelIds,
  userVisitorId,
  organizationId,
  index,
}) => {
  const { locale } = useRouter();
  const user = useAuth() as any;
  const [openModal, setOpenModal] = useState(false);
  const [openModalReply, setOpenModalReply] = useState(false);

  const editItem = (item: any) => {
    setOpenModal(true);
  };

  const { mutateAsync: saveMutation } = DeleteOneCommentAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this?',
      confirmButtonText: 'Yes, Deleted',
      cancelButtonText: 'No, Cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6f42c1',
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation({ commentId: item?.id });
          AlertSuccessNotification({
            text: 'Comment deleted successfully',
            className: 'info',
            gravity: 'top',
            position: 'center',
          });
        } catch (error: any) {
          AlertDangerNotification({
            text: `${error.response.data.message}`,
            gravity: 'top',
            className: 'info',
            position: 'center',
          });
        }
      }
    });
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
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    <LoadingFile />
  ) : isErrorComments ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again"
    />
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
          userId={user?.id}
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
                    {formateFromNow(item?.createdAt as Date, locale as string)}
                  </p>
                </div>
              </div>
              <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
                <HtmlParser html={String(item?.description ?? '')} />
              </p>
              <div className="flex mt-2 items-center font-medium text-gray-600">
                <CreateOrUpdateFormLike typeLike="COMMENT" item={item} />

                {user?.id ? (
                  <button
                    onClick={() => {
                      setOpenModalReply((lk) => !lk);
                    }}
                    className="ml-3.5 text-2xl hover:text-green-400 focus:ring-green-400"
                  >
                    <BsReplyAll />
                  </button>
                ) : null}

                {user?.id === item?.userId ? (
                  <>
                    <button
                      onClick={() => editItem(item)}
                      className="ml-3.5 hover:text-indigo-400 focus:ring-indigo-400"
                    >
                      <MdOutlineModeEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="ml-3.5 hover:text-red-400 focus:ring-red-400"
                    >
                      <MdOutlineDeleteOutline className="w-5 h-5" />
                    </button>
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
              parentId={String(item?.id)}
              openModalReply={openModalReply}
              setOpenModalReply={setOpenModalReply}
            />
          ) : null}

          {dataTableCommentsReplies}

          {hasNextPage ? (
            <>
              <div className="mt-6 flex flex-col justify-between items-center">
                {isFetchingNextPage ? null : (
                  <button
                    disabled={isFetchingNextPage ? true : false}
                    onClick={() => fetchNextPage()}
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
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
            organizationId={organizationId}
            postId={String(item?.postId)}
            comment={item}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}
      </li>
    </>
  );
};

export default ListCommentsPosts;
