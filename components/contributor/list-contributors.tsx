'use client';

import { ContributorModel } from '@/types/contributor';
import { formateFromNow } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AvatarComponent } from '../ui-setting/ant';

type Props = {
  item?: ContributorModel;
  index: number;
};

const ListContributors: React.FC<Props> = ({ item, index }) => {
  const { locale } = useRouter();
  return (
    <>
      <div key={index} className="py-5">
        <div className="flex items-center">
          <Link
            href={`/${item?.profile?.username}`}
            className="relative shrink-0 cursor-pointer"
          >
            <AvatarComponent size={40} profile={item?.profile} />
          </Link>
          <div className="ml-4 min-w-0 flex-1">
            <Link href={`/${item?.profile?.username}`}>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
                {item?.profile?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
                {item?.profile?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </Link>
          </div>

          {/* <div className="ml-auto flex items-center justify-end space-x-8">
              <ButtonInput
                size="sm"
                type="button"
                variant="outline"
                loading={loading}
                onClick={() => followingItem(item)}
              >
                Invite
              </ButtonInput>
            </div> */}
        </div>
      </div>
    </>
  );
};

export { ListContributors };
