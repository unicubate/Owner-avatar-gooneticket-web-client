import { cn } from '@/lib/utils';
import { LoaderCircleIcon } from 'lucide-react';

const LoadingFile = ({ className }: { className?: string }) => {
  return (
    <div className="inset-x-0 top-0 m-8 grid place-items-center py-4">
      <LoaderCircleIcon
        className={cn('size-8 animate-spin text-indigo-600', className)}
      />
    </div>
  );
};

export { LoadingFile };
