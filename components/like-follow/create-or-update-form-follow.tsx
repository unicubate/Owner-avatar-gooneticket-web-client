import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { AlertDangerNotification } from '@/utils';
import { UserRoundCheckIcon, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { Button } from '../ui/button';

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
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {userStorage?.organizationId ? (
        <>
          <Button
            className="h-8 cursor-pointer gap-1 rounded-sm"
            variant={isFollow ? 'outline' : 'danger'}
            onClick={() => {
              followItem(item), setIsFollow((i: any) => !i);
            }}
          >
            {isFollow ? (
              <UserRoundCheckIcon className="size-5" />
            ) : (
              <UserRoundPlus className="size-5" />
            )}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {isFollow ? 'UnFollow' : 'Follow'}
            </span>
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="danger"
            className="h-7 cursor-pointer gap-1 rounded-sm"
            onClick={() => setIsOpenModalLogin(true)}
          >
            <UserRoundPlus className="size-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Follow
            </span>
          </Button>
        </>
      )}

      <LoginModal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin} />
    </>
  );
};

export { CreateOrUpdateFormFollow };
