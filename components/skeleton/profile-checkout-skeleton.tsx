import { Skeleton } from '../ui/skeleton';

export const ProfileCheckoutSkeleton = () => {
  return (
    <>
      <div className="py-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[240px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <Skeleton className="ml-auto h-4 w-36 rounded-md" />
        </div>
        <div className="mt-6 flex items-center">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="ml-auto h-6 w-40 rounded-md" />
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mt-6 flex items-center">
          <Skeleton className="h-8 w-36 rounded-md" />
          <Skeleton className="ml-auto h-8 w-36 rounded-md" />
        </div>
        <div className="mt-6 flex items-center">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </>
  );
};
