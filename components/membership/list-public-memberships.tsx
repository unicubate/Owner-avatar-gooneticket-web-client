/* eslint-disable jsx-a11y/anchor-is-valid */
import { MembershipModel } from '@/types/membership';
import { HtmlParser } from '@/utils/html-parser';
import { convertToPluralMonth } from '@/utils/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { LoginModal } from '../auth-modal/login-modal';
import { useInputState } from '../hooks';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';

type Props = {
  item?: MembershipModel;
};

const ListPublicMemberships: React.FC<Props> = ({ item }) => {
  const { isOpen, setIsOpen, userStorage } = useInputState();
  const router = useRouter();

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-xl  dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center">
            {item?.id ? (
              <p className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">
                {item?.title ?? ''}
              </p>
            ) : null}
          </div>

          {item?.uploadsImage?.length > 0 ? (
            <div className="mx-auto mt-4 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="memberships"
                preview={false}
                height={200}
              />
            </div>
          ) : null}

          <div className="mt-2 flex items-end justify-center space-x-1">
            <div className="flex items-start">
              <p className="text-5xl font-medium tracking-tight">
                {item?.price}
              </p>
              <span className="text-xl font-medium text-black dark:text-white">
                {item?.currency?.symbol}
              </span>
            </div>
            <span className="ml-0.5 text-lg text-black dark:text-white">
              {' '}
              per {convertToPluralMonth(Number(item?.month))}{' '}
            </span>
          </div>

          <div className="mx-auto mt-4 justify-center text-center">
            <div className="sm:mt-0">
              <ButtonInput
                onClick={() => {
                  userStorage?.id
                    ? router.push(`/checkouts/${item?.id}/membership`)
                    : setIsOpen(true);
                }}
                type="button"
                className="w-full"
                size="lg"
                variant="info"
              >
                Join
              </ButtonInput>
            </div>
          </div>

          <div className="mt-4 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </div>
        </div>
      </div>

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export { ListPublicMemberships };
