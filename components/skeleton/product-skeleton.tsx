import { Skeleton } from '../ui/skeleton';

const ProductSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
    >
      <div className="p-8 sm:px-8 sm:py-7">
        <div className="mt-4 mx-auto justify-center text-center">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="mt-4 mx-auto justify-center text-center">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mt-6 flex items-center font-medium text-gray-600">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="ml-auto h-10 w-40 rounded-md" />
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mt-6 flex items-center font-medium text-gray-600">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="ml-2 size-8 rounded-md" />
        </div>

        <div className="mt-6 flex items-center font-medium text-gray-600">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
};
export { ProductSkeleton };
