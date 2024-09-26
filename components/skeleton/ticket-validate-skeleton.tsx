import { Skeleton } from '../ui/skeleton';

const TicketValidateSkeleton = ({ index }: { index: number }) => {
  return (
    <>
      <div className="p-8 sm:px-6 sm:py-4">
        <div className="mx-auto mt-4 max-w-max">
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="mx-auto mt-2 max-w-max">
          <Skeleton className="size-48 rounded-md" />
        </div>
        <div className="mx-auto mt-2 max-w-max">
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="mx-auto mt-2 max-w-max">
          <Skeleton className="h-8 w-60" />
        </div>
        <div className="mx-auto mt-2 max-w-max">
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
    </>
  );
};
export { TicketValidateSkeleton };
