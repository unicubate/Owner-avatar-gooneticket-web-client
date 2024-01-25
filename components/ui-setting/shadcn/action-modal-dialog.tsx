import { MdOutlineDeleteOutline } from 'react-icons/md';
import { ButtonInput } from '..';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  title: string;
  description: string;
  loading?: boolean;
  isOpen?: boolean;
  setIsOpen?: any;
  onClick: (node?: Element | null) => void;
}

const ActionModalDialog: React.FC<Props> = ({
  title,
  loading,
  isOpen,
  description,
  onClick,
  setIsOpen,
}) => {
  return (
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger asChild>
          <ButtonInput
            className="text-lg text-gray-600 hover:text-red-600"
            variant="link"
            type="button"
          >
            <MdOutlineDeleteOutline />
          </ButtonInput>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:border-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-4">
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => setIsOpen((lk: boolean) => !lk)}
            >
              No, Cancel
            </ButtonInput>
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant="danger"
              onClick={onClick}
              loading={loading}
            >
              Yes, Continue
            </ButtonInput>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { ActionModalDialog };
