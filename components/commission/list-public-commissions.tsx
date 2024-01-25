/* eslint-disable jsx-a11y/anchor-is-valid */
import { ProductModel } from '@/types/product';
import { HtmlParser } from '@/utils/html-parser';
import Link from 'next/link';
import React from 'react';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';

type Props = {
  item?: ProductModel;
};

const ListPublicCommissions: React.FC<Props> = ({ item }) => {
  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center">
            {item?.id ? (
              <Link
                href={`/${item?.profile?.username}/posts/${item?.slug}`}
                className="cursor-pointer text-lg font-bold dark:text-white"
              >
                {item?.title ?? ''}
              </Link>
            ) : null}

            <div className="ml-auto">
              <ButtonInput
                type="button"
                variant="danger"
                //color={item?.profile?.color}
              >
                {Number(item?.price ?? 0)} {item?.currency?.symbol ?? ''}
              </ButtonInput>
            </div>
          </div>

          <div className="text-sm font-normal text-gray-600 dark:text-gray-300">
            <span className={`ql-editor`}>
              <HtmlParser html={String(item?.description)} />
            </span>
          </div>
          <div className="mx-auto mt-4 justify-center text-center">
            <ListCarouselUpload
              uploads={item?.uploadsImage}
              folder="commissions"
              height={400}
            />
          </div>

          <div className="mx-auto mt-6 justify-center text-center">
            <div className="sm:mt-0">
              <ButtonInput
                type="button"
                size="lg"
                className="w-full"
                variant="info"
              >
                Request this
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPublicCommissions;
