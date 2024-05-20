import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { AlertDangerNotification } from '@/utils';
import { useState } from 'react';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

const CreateOrUpdateFormFollow = ({ item }: { item: any }) => {
  const {
    isOpen: isOpenModalLogin,
    setIsOpen: setIsOpenModalLogin,
    userStorage,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useInputState();
  const [isFollow, setIsFollow] = useState(item?.isFollow);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followItem = async (item: any) => {
    try {
      {
        isFollow
          ? await saveMutation({
              followerId: item?.organizationId,
              action: 'DELETE',
            })
          : await saveMutation({
              followerId: item?.organizationId,
              action: 'CREATE',
            });
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {userStorage?.organizationId ? (
        <>
          <ButtonInput
            className="w-full"
            type="button"
            variant={isFollow ? 'outline' : 'danger'}
            onClick={() => {
              followItem(item), setIsFollow((i: any) => !i);
            }}
          >
            {isFollow ? 'UnFollow' : 'Follow'}
          </ButtonInput>
        </>
      ) : (
        <ButtonInput
          className="w-full"
          type="button"
          variant="danger"
          onClick={() => {
            setIsOpenModalLogin(true);
          }}
        >
          Follow
        </ButtonInput>
      )}

      <LoginModal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin} />
    </>
  );
};

export { CreateOrUpdateFormFollow };
