import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon } from 'lucide-react';
import { ButtonInput } from '.';

interface Props {
  link: string;
  isOpen: boolean;
  setIsOpen: any;
  buttonDialog: React.ReactNode;
}

const CopyShareLink: React.FC<Props> = ({
  link,
  isOpen,
  setIsOpen,
  buttonDialog,
}) => {
  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <DialogTrigger asChild>{buttonDialog}</DialogTrigger>
        <DialogContent className="dark:bg-[#121212] dark:border-gray-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                //defaultValue={`${process.env.NEXT_PUBLIC_SITE}/posts/${item?.slug}`}
                defaultValue={link}
                readOnly
              />
            </div>
            <ButtonInput
              type="button"
              variant="info"
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="size-4" />
            </ButtonInput>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { CopyShareLink };
