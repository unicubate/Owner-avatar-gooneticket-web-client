/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import { formateDate } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import Link from 'next/link';
import { useInputState } from '../hooks';
import { Card } from '../ui/card';

type Props = {
  item: ProductModel;
  index: number;
};

const ListPublicProductsEvent = ({ item, index }: Props) => {
  const {
    linkHref,
    isOpen,
    setIsOpen,
    locale,
    loading,
    setLoading,
    userStorage,
  } = useInputState();

  return (
    <>
      <Card
        key={index}
        className="w-full dark:border-gray-800 dark:bg-black/15 sm:w-[450px] md:w-full"
      >
        {item?.uploadsImages?.length > 0 ? (
          <Image
            preview={false}
            height={200}
            width="100%"
            className="size-full max-w-max rounded-lg object-cover transition-all duration-300 group-hover:scale-125"
            src={
              viewOneFileUploadAPI({
                folder: 'event',
                fileName: String(item?.uploadsImages?.[0]?.path),
              }) as string
            }
            alt={item?.title}
          />
        ) : null}

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            <p className="text-2xl">{item?.priceDiscount ?? ''}</p>
            <p className="ml-1 text-sm">{item?.currency?.symbol ?? ''}</p>
            <p className="ml-auto text-sm">
              {' '}
              {formateDate(item?.expiredAt as Date, locale)}
            </p>

            {item?.enableDiscount ? (
              <>
                <p className="ml-2 text-lg text-red-500">
                  <del> {item?.price ?? ''} </del>
                </p>
                <p className="ml-1 text-lg text-red-500">
                  <del> {item?.currency?.symbol ?? ''} </del>
                </p>
              </>
            ) : null}
          </div>

          <h3 className="duratin-200 mt-2 flex-1 text-lg font-bold text-gray-900 transition-all hover:text-blue-600 dark:text-white sm:text-base">
            <Link
              className="hover:text-blue-600"
              href={`/events/${item?.slug}`}
              title={item?.title}
            >
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </h3>
          <div className="flex flex-wrap justify-between space-x-2 pt-3 text-sm">
            <div className="flex shrink-0 font-bold">
              <span>{item?.address ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.city ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.country?.name ?? ''}</span>
            </div>
            <span className="font-bold">
              {item?.timeInit} - {item?.timeEnd}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};
export { ListPublicProductsEvent };
