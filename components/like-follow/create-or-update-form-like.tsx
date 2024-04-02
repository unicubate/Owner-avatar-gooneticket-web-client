import { CreateOrUpdateOneLikeAPI } from '@/api-site/like';
import { AlertDangerNotification } from '@/utils';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';

export function CreateOrUpdateFormLike(props: {
  item?: any;
  typeLike: 'POST' | 'COMMENT';
}) {
  const { item, typeLike } = props;
  const { isOpen, setIsOpen, userStorage } = useInputState();
  const [like, setLike] = useState(false);
  const [isLike, setIsLike] = useState(item?.isLike);
  const [totalLike, setTotalLike] = useState(item?.totalLike ?? 0);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneLikeAPI({
    onSuccess: () => {},
    onError: () => {},
  });

  const likeItem = async (item: any) => {
    setIsLike((lk: boolean) => !lk);
    isLike
      ? setTotalLike((lk: number) => --lk)
      : setTotalLike((lk: number) => ++lk);
    try {
      await saveMutation({
        likeableId: item?.id,
        type: typeLike,
        isLike,
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {userStorage?.id ? (
        <>
          {(item?.isLike && isLike) || like ? (
            <button
              onClick={() => {
                likeItem(item), setLike(false);
              }}
              className="text-indigo-600"
            >
              <MdOutlineFavorite className="size-7" />
            </button>
          ) : (
            <button
              onClick={() => {
                likeItem(item), setLike(true);
              }}
              className="hover:text-indigo-600 focus:ring-indigo-600"
            >
              <MdOutlineFavoriteBorder className="size-7" />
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="hover:text-indigo-600 focus:ring-indigo-600"
        >
          <HeartIcon className="size-7" />
        </button>
      )}

      <span className="ml-1.5 text-sm">{totalLike > 0 ? totalLike : ''}</span>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
