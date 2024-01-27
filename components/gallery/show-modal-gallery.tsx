import { GetOnePostAPI } from '@/api-site/post';
import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { PostModel } from '@/types/post';
import { formateDMYHH } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { LockClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import { BiConversation } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineModeEdit } from 'react-icons/md';
import { ListComments } from '../comment/list-comments';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { useAuth } from '../util/context-user';

type Props = {
  openModal: boolean;
  setOpenModal: any;
  commentTake?: number;
  post?: PostModel;
  userVisitorId: string;
};

const ShowModalGallery: React.FC<Props> = ({
  setOpenModal,
  commentTake,
  openModal,
  post,
  userVisitorId,
}) => {
  const { locale, push } = useRouter();
  const user = useAuth() as any;

  const { status, data: item } = GetOnePostAPI({
    postId: post?.id,
    userVisitorId,
  });

  if (status === 'pending') {
    <strong>Loading...</strong>;
  }

  return (
    <>
      {openModal ? (
        <>
          <div className="fixed left-0 top-0 z-40 size-full overflow-y-auto overflow-x-hidden outline-none">
            <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
              <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
              <div className="pointer-events-auto relative m-auto flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl border-none bg-white bg-clip-padding p-5 text-current shadow-lg outline-none dark:bg-[#121212]">
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
                          type="button"
                          className="w-full"
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            push(`/${item?.profile?.username}/memberships`)
                          }
                          icon={<LockClosedIcon className="mr-2 size-4" />}
                        >
                          <span className="ml-1 font-bold">
                            Join membership
                          </span>
                        </ButtonInput>
                      ) : null}

                      <button
                        title="Share"
                        className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                      >
                        <IoShareOutline className="size-6" />
                      </button>
                      {item?.allowDownload && (
                        <button
                          title="Download"
                          onClick={() => {
                            push(
                              `${downloadOneFileUploadAPI({
                                folder: 'posts',
                                fileName: item?.uploadsImage[0]?.path,
                              })}`,
                            );
                          }}
                          className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                        >
                          <FiDownload className="size-6" />
                        </button>
                      )}
                      <button
                        title="Close"
                        onClick={() => setOpenModal(false)}
                        className="ml-2 text-gray-900 hover:text-gray-900 focus:ring-gray-900"
                      >
                        <AiOutlineClose className="size-6" />
                      </button>
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
                    <p className="mt-4 cursor-pointer text-lg font-bold text-gray-900">
                      {item?.title ?? ''}
                    </p>
                  ) : null}

                  {item?.description ? (
                    <p className="mt-2 text-sm font-normal text-gray-600">
                      <HtmlParser html={String(item?.description ?? '')} />
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-center font-medium text-gray-600">
                    <CreateOrUpdateFormLike typeLike="POST" item={item} />

                    <button className="ml-2 text-2xl">
                      <BiConversation />
                    </button>
                    <span className="ml-2 text-sm font-normal">
                      {item?.totalComment ?? 0}
                    </span>

                    {user?.id === item?.userId ? (
                      <>
                        <Link
                          title="Edit"
                          href={`/posts/${
                            item?.id
                          }/edit?type=${item?.type.toLocaleLowerCase()}`}
                          className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                        >
                          <MdOutlineModeEdit className="size-6" />
                        </Link>

                        {/* <button
                          // onClick={() => deleteItem(item)}
                          title="Delete"
                          className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                        >
                          <MdOutlineDeleteOutline className="w-6 h-6" />
                        </button> */}
                      </>
                    ) : null}

                    {item?.whoCanSee === 'MEMBERSHIP' &&
                    item?.isValidSubscribe !== 1 ? (
                      <>
                        <button className="ml-auto text-2xl">
                          <HiOutlineLockClosed />
                        </button>
                        <span className="ml-2 text-sm">Locked</span>
                      </>
                    ) : (
                      <>
                        <button className="ml-auto text-2xl">
                          <HiOutlineLockOpen />
                        </button>
                        <span className="ml-2 text-sm">Unlocked</span>
                      </>
                    )}
                  </div>

                  <ListComments
                    model="POST"
                    modelIds={['POST']}
                    postId={String(item?.id)}
                    take={Number(commentTake)}
                    organizationId={item?.organizationId}
                    userVisitorId={userVisitorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export { ShowModalGallery };
