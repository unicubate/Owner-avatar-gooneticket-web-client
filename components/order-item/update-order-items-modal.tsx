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
import { useMediaQuery } from '../hooks';
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
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <AlertDialog
          onOpenChange={setIsOpen}
          open={isOpen}
          defaultOpen={isOpen}
        >
          <AlertDialogTrigger />
          <AlertDialogContent className="max-h-screen max-w-2xl overflow-y-scroll dark:border-input">
            <FormCreateOrUpdateOrderItems
              setShowModal={setIsOpen}
              orderItem={orderItem}
            />
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-auto dark:border-input">
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
      )}
    </>
  );
};

export { UpdateOrderItemsModal };
