'use client';

import { DeleteOnePostAPI } from '@/api-site/post';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { PostModel, PostType } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { IconTypePost } from '@/utils/icon-type-post';
import { ReadMore } from '@/utils/read-more';
import { Avatar } from 'antd';
import {
  GlobeIcon,
  HeartIcon,
  LockKeyholeIcon,
  MessageSquareIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item: PostModel;
  index: number;
};

const ListGallery: React.FC<Props> = ({ item, index }) => {
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();
  const router = useRouter();

  const saveMutation = DeleteOnePostAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation.mutateAsync({ postId: item?.id });
      AlertSuccessNotification({
        text: 'Image deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div key={index} className="divide-gray-200 py-5">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            {item?.uploadsImages?.length > 0 ? (
              <Avatar
                size={100}
                shape="square"
                src={viewOneFileUploadAPI({
                  folder: 'posts',
                  fileName: String(item?.uploadsImages?.[0]?.path),
                })}
                alt={item?.title}
              />
            ) : null}
          </div>

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="tex-sm">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>

            <div className="mt-2 flex items-center">
              {item?.title ? (
                <p className="mt-2 text-lg font-bold">
                  <ReadMore html={String(item?.title ?? '')} value={100} />
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex items-center font-medium text-gray-600">
              <span className="font-normal">
                <HeartIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.totalLike ?? 0}</span>

              <span className="ml-1.5">
                <MessageSquareIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.totalComment ?? 0}</span>
            </div>

            <div className="mt-3 flex items-center text-gray-600">
              <span className="font-bold">
                {item?.whoCanSee === 'PUBLIC' ? (
                  <GlobeIcon className="size-4" />
                ) : (
                  <LockKeyholeIcon className="size-4" />
                )}
              </span>
              <span className="ml-1.5 text-sm">{item?.whoCanSee}</span>

              <span className="ml-2">
                <IconTypePost
                  className="size-4"
                  type={item?.type as PostType}
                />
              </span>
              <span className="ml-1.5 text-sm font-normal">{item?.type}</span>

              {item?.allowDownload && (
                <>
                  <button title="Download" className="tex-sm ml-2">
                    <FiDownload />
                  </button>
                  <span className="ml-1.5 text-sm font-normal hidden lg:table-cell">
                    Download
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium">
            <ButtonInput
              variant="ghost"
              type="button"
              size="icon"
              icon={<PencilIcon className="size-4 text-gray-600" />}
              onClick={() =>
                router.push(
                  `/posts/${
                    item?.id
                  }/edit?type=${item?.type.toLocaleLowerCase()}`,
                )
              }
            />

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this?"
              buttonDialog={
                <ButtonInput
                  variant="ghost"
                  type="button"
                  size="icon"
                  icon={<TrashIcon className="size-4 text-gray-600" />}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListGallery;
