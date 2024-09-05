import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { OrderItemModel } from '@/types/order-item';
import { useInputState, useMediaQuery } from '../hooks';
import { FormCreateOrUpdateOrderItems } from './form-create-or-update-update-order-items';

const UpdateOrderItemsModal = ({
  isOpen,
  setIsOpen,
  orderItem,
}: {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  orderItem: OrderItemModel;
}) => {
  const { t } = useInputState();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent className="max-h-screen max-w-2xl overflow-y-scroll dark:border-gray-900">
          <FormCreateOrUpdateOrderItems
            setShowModal={setIsOpen}
            orderItem={orderItem}
          />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[300px] dark:border-gray-900">
          <DrawerHeader className="text-left">
            <DrawerTitle asChild />
            <DrawerDescription asChild />
          </DrawerHeader>
          <FormCreateOrUpdateOrderItems
            setShowModal={setIsOpen}
            orderItem={orderItem}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { UpdateOrderItemsModal };
