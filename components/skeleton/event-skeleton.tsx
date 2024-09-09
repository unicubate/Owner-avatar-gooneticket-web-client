import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const EventSkeleton = ({ index }: { index: number }) => {
  return (
    <Card key={index} className="w-full dark:border-input dark:bg-black/15">
      <div className="p-8 sm:px-6 sm:py-4">
        <div className="mx-auto justify-center text-center">
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="ml-auto h-6 w-24 rounded-md" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="ml-auto h-4 w-24 rounded-md" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="ml-2 h-4 w-24 rounded-md" />
        </div>
      </div>
    </Card>
  );
};
export { EventSkeleton };
