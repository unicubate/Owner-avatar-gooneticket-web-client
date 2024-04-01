import { AlertSuccessNotification } from '@/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { SizeButton, VariantButton } from '../ui/button';
import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  link: string;
  variant: VariantButton;
  size: SizeButton;
  iconClassName: string;
}

export const ButtonCopy = ({
  children,
  link,
  variant,
  size,
  iconClassName,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const copyToClipBoard = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };

  copied &&
    AlertSuccessNotification({
      text: `Link copied successfully`,
    });

  return (
    <>
      <ButtonInput
        variant={variant}
        type="button"
        size={size}
        icon={
          copied ? (
            <CheckIcon className={iconClassName} />
          ) : (
            <CopyIcon className={iconClassName} />
          )
        }
        onClick={() => {
          copyToClipBoard(link), setCopied(true);
        }}
        onMouseLeave={() => setCopied(false)}
      >
        {children}
      </ButtonInput>
    </>
  );
};
