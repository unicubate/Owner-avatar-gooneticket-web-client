import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const EventCheckoutSkeleton = () => {
  return (
    <>
      <div className="lg:col-span-3 xl:col-span-4">
        <div className="mx-auto justify-center text-center">
          <Card className="w-full dark:border-gray-800 dark:bg-[#04080b]">
            <div className="p-8 sm:px-6 sm:py-4">
              <div className="mx-auto justify-center text-center">
                <Skeleton className="h-60 w-full" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="ml-auto h-6 w-40 rounded-md" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-10 w-[250px] rounded-md" />
                <Skeleton className="ml-auto h-10 w-[250px] rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:sticky lg:top-6 lg:order-2 lg:col-span-2">
        <Card className="w-full dark:border-gray-800 dark:bg-[#04080b]">
          <div className="p-8 sm:px-6 sm:py-4">
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="ml-auto h-6 w-32 rounded-md" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </Card>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </>
  );
};
