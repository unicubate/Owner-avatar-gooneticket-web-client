/* eslint-disable jsx-a11y/anchor-is-valid */
import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { PostModel, PostType } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { formateDMYHH } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-h5-audio-player/lib/styles.css';
import ReactPlayer from 'react-player';
import { ListComments } from '../comment/list-comments';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput, CopyShareLink } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { AudioPlayerInput } from '../ui-setting/audio-player-Input';

import {
  DownloadIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilIcon,
  ShareIcon,
  UnlockKeyholeIcon,
} from 'lucide-react';
import { useInputState } from '../hooks';

type Props = {
  item: PostModel;
  commentTake: number;
  userVisitor: UserVisitorModel;
};

const ListFollowPosts: React.FC<Props> = ({
  item,
  commentTake,
  userVisitor,
}) => {
  const { locale, push } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center">
            <div
              onClick={() => push(`/${item?.profile?.username}`)}
              className="relative shrink-0 cursor-pointer"
            >
              <AvatarComponent size={50} profile={item?.profile} />
            </div>

            <div
              onClick={() => push(`/${item?.profile?.username}`)}
              className="ml-3 cursor-pointer"
            >
              <p className="text-sm font-bold">
                {item?.profile?.firstName ?? ''} {item?.profile?.lastName ?? ''}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date, locale as string)}
              </p>
            </div>

            <div className="ml-auto">
              {/* {item?.whoCanSee === 'MEMBERSHIP' &&
              item?.isValidSubscribe !== 1 ? (
                <ButtonInput
                  onClick={() =>
                    push(`/${item?.profile?.username}/memberships`)
                  }
                  type="button"
                  variant="danger"
                  icon={<HiOutlineLockClosed className="size-5" />}
                >
                  <span className="ml-1 font-bold">Join membership</span>
                </ButtonInput>
              ) : null} */}
            </div>
          </div>

          {item?.urlMedia && ['VIDEO'].includes(item?.type) ? (
            <div
              className={`mx-auto mt-1 
            ${
              item?.whoCanSee === 'MEMBERSHIP' && item?.isValidSubscribe !== 1
                ? 'blur-xl'
                : ''
            }`}
            >
              <ReactPlayer
                className="mr-auto"
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          {item?.uploadsImage?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                post={item}
                uploads={item?.uploadsImage}
                folder="posts"
                height={400}
                className={`object-cover ${
                  item?.whoCanSee === 'MEMBERSHIP' &&
                  item?.isValidSubscribe !== 1
                    ? 'blur-xl'
                    : ''
                }`}
              />
            </div>
          ) : null}

          {/* <div className="flex mt-2 items-center">
            {item?.uploadsImage?.length > 0 && ["AUDIO"].includes(item?.type as PostType) ? (
              <ListCarouselUpload
                post={item}
                uploads={item?.uploadsImage}
                folder="posts"
                preview={false}
                width={100}
                height={100}
                className={`object-cover flex-none rounded-lg bg-slate-100 ${item?.whoCanSee === "MEMBERSHIP" &&
                  item?.isValidSubscribe !== 1
                  ? "blur-xl"
                  : ""
                  }`}
              />
            ) : null}
            <div className="min-w-0 flex-auto space-y-1 font-semibold">
              {item?.whoCanSee && ["AUDIO"].includes(item?.type as PostType) ? (
                <AudioPlayerInput
                  post={item}
                  urlMedia={item?.urlMedia}
                  enableUrlMedia={item?.enableUrlMedia}
                  uploads={item?.uploadsFile}
                  folder="posts"
                />
              ) : null}
            </div>
          </div> */}

          {item?.whoCanSee && ['AUDIO'].includes(item?.type as PostType) ? (
            <div className="mx-auto justify-center text-center">
              <AudioPlayerInput
                post={item}
                urlMedia={item?.urlMedia}
                enableUrlMedia={item?.enableUrlMedia}
                uploads={item?.uploadsFile}
                folder="posts"
              />
            </div>
          ) : null}

          {item?.title ? (
            <div className="mt-2 text-lg">
              <Link
                href={`/posts/${item?.slug}`}
                className="cursor-pointer font-bold text-gray-900 dark:text-white"
              >
                {item?.title ?? ''}
              </Link>
            </div>
          ) : null}

          {item?.description ? (
            <div
              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
            >
              {['MEMBERSHIP'].includes(item?.whoCanSee) &&
              item?.isValidSubscribe !== 1 ? null : (
                <span className={`ql-editor`}>
                  <HtmlParser html={String(item?.description ?? '')} />
                </span>
              )}
            </div>
          ) : null}

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-3">
              <MessageSquareTextIcon className="size-5" />
            </button>
            <span className="ml-2 text-sm">{item?.totalComment ?? 0}</span>
            {userVisitor?.id === item?.userId ? (
              <>
                <Link
                  title="Edit"
                  href={`/posts/${
                    item?.id
                  }/edit?type=${item?.type.toLocaleLowerCase()}`}
                  className="ml-3 hover:text-green-400 focus:ring-green-400"
                >
                  <PencilIcon className="size-4" />
                </Link>
              </>
            ) : null}

            <CopyShareLink
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              link={`${process.env.NEXT_PUBLIC_SITE}/posts/${item?.slug}`}
              buttonDialog={
                <ButtonInput
                  className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                  variant="link"
                  type="button"
                >
                  <ShareIcon className="size-4" />
                </ButtonInput>
              }
            />
            {item?.allowDownload && (
              <>
                {item?.whoCanSee === 'MEMBERSHIP' &&
                item?.isValidSubscribe !== 1 ? (
                  <>
                    <button
                      title="Download"
                      className="text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                    >
                      <DownloadIcon className="size-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      title="Download"
                      onClick={() => {
                        push(
                          `${downloadOneFileUploadAPI({
                            folder: 'posts',
                            fileName:
                              item.type === 'AUDIO'
                                ? item?.uploadsFile[0]?.path
                                : item?.uploadsImage[0]?.path,
                          })}`,
                        );
                      }}
                      className="text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                    >
                      <DownloadIcon className="size-5" />
                    </button>
                  </>
                )}
              </>
            )}

            {item?.whoCanSee === 'MEMBERSHIP' &&
            item?.isValidSubscribe !== 1 ? (
              <LockKeyholeIcon className="ml-auto size-5" />
            ) : (
              <UnlockKeyholeIcon className="ml-auto size-5" />
            )}
          </div>

          <ListComments
            model="POST"
            modelIds={['POST']}
            userVisitorId={userVisitor?.id ?? ''}
            organizationId={item?.organizationId}
            postId={item?.id}
            take={commentTake}
          />
        </div>
      </div>
    </>
  );
};

export { ListFollowPosts };
