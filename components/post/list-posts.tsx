/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOnePostAPI } from '@/api-site/post';
import { PostModel, PostType } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { IconTypePost } from '@/utils/icon-type-post';
import { ReadMore } from '@/utils/read-more';
import {
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  LockKeyholeIcon,
  MessageSquareIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { formateDate } from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ButtonCopy } from '../ui-setting/button-copy';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: PostModel;
  index: number;
};

const ListPosts = ({ item, index }: Props) => {
  const { push } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();

  const { mutateAsync: saveMutation } = DeleteOnePostAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ postId: item?.id });
      AlertSuccessNotification({
        text: 'Post deleted successfully',
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
      <div key={index} className="flex items-center py-4">
        {/* <div className="relative flex-shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({ folder: 'commissions', fileName: String(dataImages?.data[0]?.path) })}
              alt={item?.title}
            />
          </div> */}

        <div className="min-w-0 flex-1 cursor-pointer">
          <div className="flex items-center text-gray-600">
            <button className="font-normal">
              <CalendarIcon className="size-4" />
            </button>
            <span className="ml-1.5 text-sm font-normal">
              {formateDate(item?.createdAt as Date, locale)}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            {item?.title ? (
              <p className="text-lg font-bold">
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

            <span className="ml-1.5">
              {item?.whoCanSee === 'PUBLIC' ? (
                <GlobeIcon className="size-4" />
              ) : (
                <LockKeyholeIcon className="size-4" />
              )}
            </span>
            <span className="ml-1.5 hidden text-sm font-normal lg:table-cell">
              {item?.whoCanSee}
            </span>
            <span className="ml-1.5">
              <IconTypePost className="size-4" type={item?.type as PostType} />
            </span>
            <span className="ml-1.5 hidden text-sm font-normal lg:table-cell">
              {item?.type}
            </span>
          </div>
        </div>

        <div className="py-4 text-right text-sm font-medium">
          <ButtonCopy
            size="icon"
            variant="link"
            link={`${process.env.NEXT_PUBLIC_SITE}/posts/${item?.slug}`}
            iconClassName="size-4 text-gray-600 hover:text-green-600"
          />

          <ButtonInput
            variant="link"
            type="button"
            size="icon"
            icon={
              <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            }
            onClick={() =>
              push(
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
                variant="link"
                type="button"
                size="icon"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export { ListPosts };
