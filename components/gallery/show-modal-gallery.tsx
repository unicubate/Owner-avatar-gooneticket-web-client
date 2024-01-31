import { GetOnePostAPI } from '@/api-site/post';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PostModel } from '@/types/post';
import { formateDMYHH } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiConversation } from 'react-icons/bi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { ListComments } from '../comment/list-comments';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';

import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { FiDownload } from 'react-icons/fi';

type Props = {
  openModal: boolean;
  setOpenModal: any;
  post?: PostModel;
  userVisitorId: string;
};

const ShowModalGallery: React.FC<Props> = ({
  setOpenModal,
  openModal,
  post,
  userVisitorId,
}) => {
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
                  {formateDMYHH(item?.createdAt as Date, String(locale))}
                </p>
              </div>
            </div>

            <div className="ml-auto">
              <div className="flex items-center space-x-2 sm:ml-5">
                {item?.whoCanSee === 'MEMBERSHIP' &&
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
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex-auto overflow-y-auto p-4">
            <div className="group relative mt-2">
              {item?.uploadsImage && item?.uploadsImage.length > 0 ? (
                <ListCarouselUpload
                  post={item}
                  uploads={item?.uploadsImage}
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

              <button className="ml-2 text-2xl">
                <BiConversation />
              </button>
              <span className="ml-2 text-sm">{item?.totalComment ?? 0}</span>
              {userVisitorId === item?.userId ? (
                <>
                  <Link
                    title="Edit"
                    href={`/posts/${
                      item?.id
                    }/edit?type=${item?.type.toLocaleLowerCase()}`}
                    className="ml-2 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <MdOutlineModeEdit className="size-6" />
                  </Link>
                </>
              ) : null}
              {item?.allowDownload && (
                <>
                  {item?.whoCanSee === 'MEMBERSHIP' &&
                  item?.isValidSubscribe !== 1 ? (
                    <>
                      <button
                        title="Download"
                        className="ml-2 text-2xl text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                      >
                        <FiDownload className="size-5" />
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
                        className="ml-2 text-2xl text-gray-600 hover:text-indigo-500 focus:ring-indigo-500"
                      >
                        <FiDownload className="size-5" />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            {item?.id ? (
              <ListComments
                model="POST"
                modelIds={['POST']}
                postId={String(item?.id)}
                take={4}
                organizationId={item?.organizationId}
                userVisitorId={userVisitorId}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ShowModalGallery };
