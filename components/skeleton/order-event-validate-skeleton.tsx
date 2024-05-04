import { Skeleton } from '../ui/skeleton';

export const OrderEventValidateSkeleton = () => {
  return (
    <>
      <div className="px-4 py-5">
        <div className="mx-auto max-w-sm">
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="mx-auto mt-4 max-w-sm">
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mx-auto mt-4 max-w-sm">
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mx-auto max-w-sm">
          <div className="my-4 flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </>
  );
};
