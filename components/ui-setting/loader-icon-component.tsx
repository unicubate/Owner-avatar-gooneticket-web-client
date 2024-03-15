import { cn } from '@/lib/utils';
import { LoaderCircleIcon } from 'lucide-react';
import { CSSProperties } from 'react';

const LoaderIconComponent = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <LoaderCircleIcon
      style={style}
      className={cn('my-28 size-16 text-indigo-600 animate-spin', className)}
    />
  );
};

export { LoaderIconComponent };
