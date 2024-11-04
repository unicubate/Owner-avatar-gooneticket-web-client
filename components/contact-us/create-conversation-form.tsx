import { MailPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { CreateConversationsModal } from '../messages/create-conversations-modal';
import { Button } from '../ui/button';

const CreateConversationForm = ({ item }: { item: any }) => {
  const {
    isOpen: isOpenModalLogin,
    setIsOpen: setIsOpenModalLogin,
    user,
  } = useInputState();
  const [isContact, setIsContact] = useState(false);

  return (
    <>
      {user?.id ? (
        <>
          <Button
            className="h-8 cursor-pointer gap-1 rounded-sm"
            variant="default"
            onClick={() => setIsContact(true)}
          >
            <MailPlusIcon className="size-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Send message
            </span>
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            className="h-7 cursor-pointer gap-1 rounded-sm"
            variant="default"
            onClick={() => setIsOpenModalLogin(true)}
          >
            <MailPlusIcon className="size-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Send message
            </span>
          </Button>
        </>
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
