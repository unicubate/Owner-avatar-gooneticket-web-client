import { Skeleton } from '../ui/skeleton';

export const EventCheckoutSkeleton = () => {
  return (
    <>
      <div className="mx-auto justify-center text-center">
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="mx-auto mt-4 justify-center text-center">
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </>
  );
};
