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
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { ButtonInput } from '.';

interface Props {
  link: string;
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
  buttonDialog?: React.ReactNode;
}

export const CopyShareLink = ({
  link,
  isOpen,
  setIsOpen,
  buttonDialog,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const copyToClipBoard = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };
  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <DialogTrigger asChild>{buttonDialog}</DialogTrigger>
        <DialogContent className="dark:border-gray-800 dark:bg-[#04080b] sm:max-w-lg">
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
              <Input id="link" defaultValue={link} readOnly />
            </div>
            <ButtonInput
              type="button"
              variant="primary"
              size="sm"
              className="px-3"
              onClick={() => {
                copyToClipBoard(link), setCopied(true);
              }}
              onMouseLeave={() => setCopied(false)}
              icon={
                copied ? (
                  <>
                    <CheckIcon className="size-4" />
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-4" />
                  </>
                )
              }
            >
              {copied ? 'Copied' : 'Copy'}
            </ButtonInput>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
