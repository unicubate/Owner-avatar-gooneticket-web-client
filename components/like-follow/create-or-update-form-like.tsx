import { CreateOrUpdateOneLikeAPI } from '@/api-site/like';
import { AlertDangerNotification } from '@/utils';
import React, { useState } from 'react';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { LoginModal } from '../auth-modal/login-modal';
import { useInputState } from '../hooks';

const CreateOrUpdateFormLike: React.FC<{
  item?: any;
  typeLike: 'POST' | 'COMMENT';
}> = ({ item, typeLike }) => {
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
        gravity: 'top',
        className: 'info',
        position: 'center',
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
              className="text-2xl text-indigo-600"
            >
              <MdOutlineFavorite />
            </button>
          ) : (
            <button
              onClick={() => {
                likeItem(item), setLike(true);
              }}
              className="text-2xl hover:text-indigo-600 focus:ring-indigo-600"
            >
              <MdFavoriteBorder />
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="text-2xl hover:text-indigo-600 focus:ring-indigo-600"
        >
          <MdFavoriteBorder />
        </button>
      )}

      <span className="ml-1.5 text-sm">{totalLike}</span>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export { CreateOrUpdateFormLike };
