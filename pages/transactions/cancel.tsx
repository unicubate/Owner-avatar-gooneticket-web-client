'use client';

import { ButtonInput } from '@/components/ui-setting';
import { CircleXIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const TransactionCancel = () => {
  const { query, push } = useRouter();
  const username = String(query?.username);

  return (
    <>
      <div className="mx-auto mt-10 max-w-lg">
        <div className="h-screen">
          <div className="p-6  md:mx-auto">
            <div className="mx-auto mt-4 max-w-max text-red-500">
              <CircleXIcon className="size-28" />
            </div>

            <div className="text-center">
              <h3 className="text-center text-base font-semibold md:text-2xl">
                Payment Cancel!
              </h3>
              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="primary"
                  onClick={() => {
                    push(`/`);
                  }}
                >
                  Go Home
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCancel;
