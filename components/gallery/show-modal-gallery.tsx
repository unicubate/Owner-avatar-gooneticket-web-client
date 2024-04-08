import { GetOnePostAPI } from '@/api-site/post';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PostModel } from '@/types/post';
import { formateDate } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ListComments } from '../comment/list-comments';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import {
  ButtonInput,
  CopyShareLink,
  RedirectToMembershipsButton,
} from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { downloadOneFileUploadAPI } from '@/api-site/upload';
import {
  AlertCircleIcon,
  DownloadIcon,
  LockKeyholeIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useInputState } from '../hooks';

type Props = {
  openModal: boolean;
  setOpenModal: any;
  post: PostModel;
  userVisitorId: string;
};

export const ShowModalGallery = ({
  setOpenModal,
  openModal,
  post,
  userVisitorId,
}: Props) => {
  const [isComment, setIsComment] = useState(false);
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();

  const { locale, push } = useRouter();
  const { status, data: item } = GetOnePostAPI({
    postId: post?.id,
    userVisitorId,
  });

  if (status === 'pending') {
    <strong>Loading...</strong>;
  }

  return (
    <>
      <Dialog
        onOpenChange={setOpenModal}
        open={openModal}
        defaultOpen={openModal}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[750px] dark:bg-[#121212] dark:border-gray-800 overflow-y-scroll max-h-screen">
          <div className="flex shrink-0 items-center justify-between rounded-t-md border-gray-200 p-4">
            <div className="flex items-center">
              <div className="relative shrink-0 cursor-pointer">
                <AvatarComponent size={50} profile={item?.profile} />
              </div>

              <div className="ml-2 cursor-pointer">
                <p className="text-sm font-bold text-black dark:text-white">
                  {item?.profile?.firstName ?? ''}{' '}
                  {item?.profile?.lastName ?? ''}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {formateDate(item?.createdAt as Date, String(locale))}
                </p>
              </div>
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

          <div className="flex-auto overflow-y-auto p-4">
            <div className="group relative mt-2">
              {item?.uploadsImages && item?.uploadsImages.length > 0 ? (
                <ListCarouselUpload
                  post={item}
                  uploads={item?.uploadsImages}
                  folder="posts"
                  preview={false}
                  height="100%"
                  alt={item?.title}
                  className={`${
                    item?.whoCanSee === 'MEMBERSHIP' &&
                    item?.isValidSubscribe !== 1
                      ? 'blur-xl'
                      : ''
                  }`}
                />
              ) : null}
            </div>

            {item?.title ? (
              <p className="mt-4 cursor-pointer text-lg font-bold dark:text-white">
                {item?.title ?? ''}
              </p>
            ) : null}

            {item?.description ? (
              <div
                className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
              >
                <span
                  className={`ql-editor ${
                    item?.whoCanSee === 'MEMBERSHIP' &&
                    item?.isValidSubscribe !== 1
                      ? 'blur-lg'
                      : ''
                  }`}
                >
                  <HtmlParser
                    html={String(item?.description ?? '')}
                    value={item?.isValidSubscribe !== 1 ? 600 : 0}
                  />
                </span>
              </div>
            ) : null}

            <div className="mt-2 flex items-center font-medium text-gray-600">
              <CreateOrUpdateFormLike typeLike="POST" item={item} />

              {['MEMBERSHIP'].includes(item?.whoCanSee) &&
              item?.isValidSubscribe !== 1 ? (
                <button className="ml-3">
                  <MessageCircleIcon className="size-6" />
                </button>
              ) : (
                <button onClick={() => setIsComment(true)} className="ml-3">
                  <MessageCircleIcon className="size-6" />
                </button>
              )}

              {item?.totalComment > 0 ? (
                <span className="ml-2 text-sm">{item?.totalComment}</span>
              ) : (
                ''
              )}
              {userVisitorId === item?.userId ? (
                <>
                  <Link
                    title="Edit"
                    href={`/posts/${
                      item?.id
                    }/edit?type=${item?.type.toLocaleLowerCase()}`}
                    className="ml-3 hover:text-green-400 focus:ring-green-400"
                  >
                    <PencilIcon className="size-6" />
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
                    <ShareIcon className="size-6" />
                  </ButtonInput>
                }
              />

              {item?.whoCanSee === 'MEMBERSHIP' &&
              item?.isValidSubscribe !== 1 ? (
                <LockKeyholeIcon className="ml-auto size-6" />
              ) : null}
            </div>

            {isComment && item?.id ? (
              <ListComments
                model="POST"
                modelIds={['POST']}
                postId={String(item?.id)}
                take={4}
                organizationId={item?.organizationId}
                userVisitorId={userVisitorId}
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
        </DialogContent>
      </Dialog>
    </>
  );
};
