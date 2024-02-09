/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostModel } from '@/types/post';
import { formateDMYHH } from '@/utils';
import { HeartIcon, MessageSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ListCarouselUpload } from '../shop/list-carousel-upload';

type Props = {
  item?: PostModel;
};

const ListLastPosts: React.FC<Props> = ({ item }) => {
  const { locale } = useRouter();
  return (
    <>
      <li
        key={item?.id}
        className="flex items-stretch justify-between space-x-2 py-7"
      >
        <div className="shrink-0">
          {item?.uploadsImage?.length > 0 ? (
            <div className="size-16 rounded-lg object-cover">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="posts"
                preview={false}
                height={65}
                className={`size-16 object-cover${
                  item?.whoCanSee === 'MEMBERSHIP' &&
                  item?.isValidSubscribe !== 1
                    ? 'blur-xl'
                    : ''
                }`}
              />
            </div>
          ) : null}
        </div>

        <div className="ml-5 flex flex-1 flex-col justify-between">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/posts/${item?.slug}`}
                className="cursor-pointer text-sm font-bold dark:text-white"
              >
                {item?.title ?? ''}
              </Link>
            ) : null}

            <div className="mt-2 flex items-center font-medium text-gray-600">
              <button className="hover:text-gray-600">
                <HeartIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm">{item?.totalLike ?? 0}</span>

              <button className="ml-3.5">
                <MessageSquareIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm">{item?.totalComment ?? 0}</span>
              <span className="ml-auto text-sm">
                {formateDMYHH(item?.createdAt as Date, locale as string)}
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export { ListLastPosts };
