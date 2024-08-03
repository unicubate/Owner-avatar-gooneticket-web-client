import { Skeleton } from '../ui/skeleton';

const PostSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-background"
    >
      <div className="p-8 sm:px-8 sm:py-7">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="size-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[240px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <Skeleton className="ml-auto size-8 rounded-md" />
        </div>

        <div className="mx-auto mt-4 justify-center text-center">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mt-6 flex items-center font-medium text-gray-600">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="ml-2 size-8 rounded-md" />
          <Skeleton className="ml-2 size-8 rounded-md" />
        </div>
        <div className="mt-6 flex items-center font-medium text-gray-600">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};
export { PostSkeleton };
