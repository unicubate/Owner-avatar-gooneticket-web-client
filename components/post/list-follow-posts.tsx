/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostModel, PostType } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { formateDate } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'react-h5-audio-player/lib/styles.css';
import { ListComments } from '../comment/list-comments';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import {
  ButtonInput,
  CopyShareLink,
  RedirectToMembershipsButton,
} from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { AudioPlayerInput } from '../ui-setting/audio-player-Input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  AlertCircleIcon,
  DownloadIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
} from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useInputState } from '../hooks';
import { Button } from '../ui/button';

type Props = {
  item: PostModel;
  commentTake: number;
  userVisitor: UserVisitorModel;
};

export const ListFollowPosts = ({ item, commentTake, userVisitor }: Props) => {
  const { locale, push } = useRouter();
  const [isComment, setIsComment] = useState(false);
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
                {capitalizeFirstLetter(item?.profile?.firstName ?? '')}{' '}
                {capitalizeFirstLetter(item?.profile?.lastName ?? '')}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDate(item?.createdAt as Date, locale as string)}
              </p>
            </div>

            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" size="icon" variant="ghost">
                    <MoreHorizontalIcon className="size-5 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#121212]">
                  <DropdownMenuGroup>
                    {item?.allowDownload && (
                      <>
                        {item?.whoCanSee === 'MEMBERSHIP' &&
                        item?.isValidSubscribe !== 1 ? (
                          ''
                        ) : (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                push(
                                  `${downloadOneFileUploadAPI({
                                    folder: 'posts',
                                    fileName:
                                      item.type === 'AUDIO'
                                        ? item?.uploadsFiles[0]?.path
                                        : item?.uploadsImages[0]?.path,
                                  })}`,
                                );
                              }}
                            >
                              <button
                                title="Download"
                                className="text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                              >
                                <DownloadIcon className="size-5" />
                              </button>
                              <span className="cursor-pointer ml-2">
                                Download
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                      </>
                    )}
                    <DropdownMenuItem>
                      <button
                        title="Report"
                        className="text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                      >
                        <AlertCircleIcon className="size-5" />
                      </button>
                      <span className="cursor-pointer ml-2">Report</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {item?.urlMedia && ['VIDEO'].includes(item?.type) ? (
            <div className={`mx-auto mt-1`}>
              <ReactPlayer
                className={`mr-auto ${
                  item?.whoCanSee === 'MEMBERSHIP' &&
                  item?.isValidSubscribe !== 1
                    ? 'blur-xl'
                    : ''
                }`}
                url={
                  ['MEMBERSHIP'].includes(item?.whoCanSee) &&
                  item?.isValidSubscribe !== 1
                    ? ''
                    : item?.urlMedia
                }
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          {['GALLERY', 'ARTICLE'].includes(item?.type) &&
          item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                post={item}
                uploads={item?.uploadsImages}
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
            <>
              <div className="mx-auto justify-center text-center">
                <AudioPlayerInput item={item} folder="posts" />
              </div>
            </>
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
                  <HtmlParser
                    html={String(item?.description ?? '')}
                    value={3500}
                  />
                </span>
              )}
            </div>
          ) : null}
          <div className="mt-2 flex items-center font-medium text-gray-600">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            {['MEMBERSHIP'].includes(item?.whoCanSee) &&
            item?.isValidSubscribe !== 1 ? (
              <button className="ml-3">
                <MessageCircleIcon className="size-7" />
              </button>
            ) : (
              <button onClick={() => setIsComment(true)} className="ml-3">
                <MessageCircleIcon className="size-7" />
              </button>
            )}

            {item?.totalComment > 0 ? (
              <span className="ml-2 text-sm">{item?.totalComment}</span>
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
                  <ShareIcon className="size-7" />
                </ButtonInput>
              }
            />

            {userVisitor?.id === item?.userId ? (
              <>
                <Link
                  title="Edit"
                  href={`/posts/${
                    item?.id
                  }/edit?type=${item?.type.toLocaleLowerCase()}`}
                  className="hover:text-green-400 focus:ring-green-400"
                >
                  <PencilIcon className="size-6" />
                </Link>
              </>
            ) : null}

            {/* {item?.whoCanSee === 'MEMBERSHIP' &&
            item?.isValidSubscribe !== 1 ? (
              <LockKeyholeIcon className="ml-auto size-6" />
            ) : null} */}
          </div>
          {isComment ? (
            <ListComments
              model="POST"
              modelIds={['POST']}
              userVisitorId={userVisitor?.id ?? ''}
              organizationId={item?.organizationId}
              postId={item?.id}
              take={commentTake}
            />
          ) : null}
          {['MEMBERSHIP'].includes(String(item?.whoCanSee)) &&
          item?.isValidSubscribe !== 1 ? (
            <RedirectToMembershipsButton
              className="w-full"
              username={item?.profile?.username}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
