import { VariantButton } from '@/components/ui/button';
import { ButtonInput } from '..';

import { useInputState, useMediaQuery } from '@/components/hooks';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface Props {
  title: string;
  description: string;
  loading?: boolean;
  isOpen?: boolean;
  setIsOpen?: any;
  variant?: VariantButton;
  buttonDialog?: React.ReactNode;
  onClick: (node?: Element | null) => void;
}

const ActionModalDialog = ({
  title,
  loading,
  isOpen,
  description,
  onClick,
  setIsOpen,
  buttonDialog,
  variant = 'danger',
}: Props) => {
  const { t } = useInputState();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger asChild>{buttonDialog}</AlertDialogTrigger>
        <AlertDialogContent className="dark:border-input">
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
              {t.formatMessage({ id: 'ACTION.NO.CANCEL' })}
            </ButtonInput>
            <ButtonInput
              type="button"
              className="w-full"
              size="lg"
              variant={variant}
              onClick={onClick}
              loading={loading}
            >
              {t.formatMessage({ id: 'ACTION.YES.CONTINUE' })}
            </ButtonInput>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[200px] dark:border-input">
          <DrawerHeader className="text-left ">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="mb-4 flex items-center space-x-4">
              <ButtonInput
                type="button"
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => setIsOpen((lk: boolean) => !lk)}
              >
                {t.formatMessage({ id: 'ACTION.NO.CANCEL' })}
              </ButtonInput>
              <ButtonInput
                type="button"
                className="w-full"
                size="lg"
                variant={'danger'}
                onClick={onClick}
                loading={loading}
              >
                {t.formatMessage({ id: 'ACTION.YES.CONTINUE' })}
              </ButtonInput>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { ActionModalDialog };
