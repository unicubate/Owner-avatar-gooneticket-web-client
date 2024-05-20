/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import { formateDate, formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import Link from 'next/link';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';
import { Card } from '../ui/card';

type Props = {
  item: ProductModel;
  index: number;
};

const ListPublicProductsEvent = ({ item, index }: Props) => {
  const { locale, ipLocation } = useInputState();

  return (
    <>
      <Card
        key={index}
        className="w-full dark:border-gray-800 dark:bg-black/15"
      >
        {item?.uploadsImages?.length > 0 ? (
          <>
            <Link
              className="hover:text-blue-600"
              href={`/events/${item?.slug}`}
              title={item?.title}
            >
              <Image
                preview={false}
                height={200}
                width="100%"
                className="size-full rounded-lg object-cover transition-all duration-300 group-hover:scale-125"
                src={`${viewOneFileUploadAPI({
                  folder: 'event',
                  fileName: String(item?.uploadsImages?.[0]?.path),
                })}`}
                alt={String(item?.title)}
              />
            </Link>
          </>
        ) : null}

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            {Number(item?.prices?.length) > 0 ? (
              <>
                <p className="text-3xl">
                  {formatePrice({
                    country: ipLocation?.countryCode,
                    currency: String(item?.currency?.code),
                    value: Number(item?.prices?.[0].amount ?? 0),
                    isDivide: false,
                  })}
                </p>
              </>
            ) : (
              <p className="text-2xl">Free</p>
            )}
            <p className="ml-auto text-lg">
              {formateDate(item?.expiredAt as Date, locale)}
            </p>
          </div>

          <p className="mt-2 flex-1 text-xl font-bold text-gray-900 transition-all duration-200 hover:text-blue-600 dark:text-white sm:text-base">
            <Link
              className="hover:text-blue-600"
              href={`/events/${item?.slug}`}
              title={item?.title}
            >
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </p>
          {/* <div className="flex flex-wrap justify-between space-x-2 pt-3">
            <div className="flex shrink-0 font-semibold">
              <span>{item?.address ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.city ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.country?.name ?? ''}</span>
            </div>
          </div> */}
          <div className="flex flex-wrap justify-between space-x-2 pt-3">
            <div className="flex shrink-0 font-semibold">
              <span>{item?.address ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.city ?? ''}</span>
            </div>
            <span className="font-bold">
              {item?.timeInit} - {item?.timeEnd}
            </span>
          </div>
          {/* <div className="hidden lg:table-cell"> */}
          <div className="flex flex-wrap justify-between pt-2">
            <p className="mt-1 flex items-center font-semibold">
              {item?.address ? (
                <AvatarComponent size={35} profile={item?.profile} />
              ) : null}
              <div className="ml-2 min-w-0 flex-1">
                <p className="text-sm">{item?.organization?.name}</p>
                <p className="text-sm text-gray-500">
                  {formateDate(item?.createdAt as Date, locale)}
                </p>
              </div>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
export { ListPublicProductsEvent };
