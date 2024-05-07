import { MailPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { CreateConversationsModal } from '../messages/create-conversations-modal';
import { ButtonInput } from '../ui-setting';

const CreateConversationForm = ({ item }: { item: any }) => {
  const {
    isOpen: isOpenModalLogin,
    setIsOpen: setIsOpenModalLogin,
    userStorage,
  } = useInputState();
  const [isContact, setIsContact] = useState(false);

  return (
    <>
      {userStorage?.id ? (
        <>
          <ButtonInput
            type="button"
            variant="default"
            className="w-full"
            onClick={() => setIsContact(true)}
            icon={<MailPlusIcon className="size-5" />}
          >
            Send message
          </ButtonInput>
        </>
      ) : (
        <ButtonInput
          type="button"
          variant="default"
          className="w-full"
          onClick={() => setIsOpenModalLogin(true)}
          icon={<MailPlusIcon className="size-5" />}
        >
          Send message
        </ButtonInput>
      )}

      <LoginModal isOpen={isOpenModalLogin} setIsOpen={setIsOpenModalLogin} />

      <CreateConversationsModal
        isOpen={isContact}
        user={item}
        setIsOpen={setIsContact}
      />
    </>
  );
};

export { CreateConversationForm };
