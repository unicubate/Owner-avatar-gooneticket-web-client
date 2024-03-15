/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostModel } from '@/types/post';
import { formateDMYHH } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiComment } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { CreateOrUpdateFormLike } from '../like-follow/create-or-update-form-like';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { WhoCanSeeItem } from '../ui-setting';
import { useAuth } from '../util/context-user';

type Props = {
  item: PostModel;
  commentTake: number;
};

const ListPublicPosts = ({ item, commentTake }: Props) => {
  const { locale, push } = useRouter();
  const userVisiter = useAuth() as any;
  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center">
            <div className="cursor-pointer">
              <p className="mt-1 text-sm font-medium text-gray-500">
                {formateDMYHH(item?.createdAt as Date, locale as string)}
              </p>
            </div>

            <div className="ml-auto">
              <button
                title="Share"
                className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
              >
                <IoShareOutline className="size-5" />
              </button>
              {item?.allowDownload ? (
                <button
                  title="Download"
                  className="ml-2 text-gray-600 hover:text-gray-900 focus:ring-gray-900"
                >
                  <FiDownload className="size-5" />
                </button>
              ) : null}

              {userVisiter?.id === item?.userId ? (
                <>
                  <button
                    onClick={() =>
                      push(
                        `/posts/${
                          item?.id
                        }/edit?type=${item?.type.toLocaleLowerCase()}`,
                      )
                    }
                    title="Edit"
                    className="ml-2 text-gray-600 hover:text-indigo-400 focus:ring-indigo-400"
                  >
                    <MdOutlineModeEdit className="size-5" />
                  </button>

                  <button
                    // onClick={() => deleteItem(item)}
                    title="Delete"
                    className="ml-2 text-gray-600 hover:text-red-400 focus:ring-red-400"
                  >
                    <MdOutlineDeleteOutline className="size-5" />
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {item?.urlMedia && ['VIDEO', 'AUDIO'].includes(item?.type) ? (
            <div className="mt-2">
              <ReactPlayer
                className="mr-auto"
                url={item?.urlMedia}
                width="100%"
                height="400px"
                controls
              />
            </div>
          ) : null}

          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder="posts"
                preview={false}
                height={400}
                className={`object-cover ${
                  item?.whoCanSee === 'MEMBERSHIP' &&
                  item?.isValidSubscribe !== 1
                    ? 'blur-xl'
                    : ''
                }`}
              />

              {item?.whoCanSee === 'MEMBERSHIP' &&
              item?.isValidSubscribe !== 1 ? (
                <WhoCanSeeItem profile={item?.profile} />
              ) : null}
            </div>
          ) : null}

          {item?.id ? (
            <Link
              href={`/${item?.profile?.username}/posts/${item?.slug}`}
              className="mt-4 cursor-pointer text-lg font-bold text-gray-900"
            >
              {item?.title ?? ''}
            </Link>
          ) : null}

          {item?.description ? (
            <div className={`group relative text-sm font-normal text-gray-600`}>
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

              {item?.whoCanSee === 'MEMBERSHIP' &&
              item?.isValidSubscribe !== 1 ? (
                <WhoCanSeeItem profile={item?.profile} />
              ) : null}
            </div>
          ) : null}

          <div className="mt-4 flex items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={item} />

            <button className="ml-2 text-lg font-bold">
              <BiComment />
            </button>
            <span className="ml-2 text-sm font-normal">
              {item?.totalComment ?? 0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPublicPosts;
