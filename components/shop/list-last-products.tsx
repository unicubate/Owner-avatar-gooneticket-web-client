/* eslint-disable jsx-a11y/anchor-is-valid */
import { ProductModel } from '@/types/product';
import Link from 'next/link';
import { ListCarouselUpload } from './list-carousel-upload';

type Props = {
  item: ProductModel;
};

export function ListLastProducts(props: Props) {
  const { item } = props;
  return (
    <>
      <li
        key={item?.id}
        className="flex items-stretch justify-between space-x-2 py-7"
      >
        <div className="shrink-0">
          {item?.uploadsImages?.length > 0 ? (
            <div className="size-16 rounded-lg object-cover">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder="products"
                preview={false}
                height={65}
                className={`size-16`}
              />
            </div>
          ) : null}
        </div>

        <div className="ml-5 flex flex-1 flex-col justify-between">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/shop/${item?.slug}`}
                className="cursor-pointer text-sm font-bold dark:text-white"
              >
                {item?.title ?? ''}
              </Link>
            ) : null}

            <div className="mt-2 flex items-center font-medium">
              <p className="text-xl">{item?.currency?.symbol ?? ''}</p>
              <p className="ml-1 text-xl">{item?.priceDiscount ?? ''}</p>

              {item?.enableDiscount ? (
                <>
                  <p className="ml-2 text-xl text-red-500">
                    <del> {item?.price ?? ''} </del>
                  </p>
                  <p className="ml-1 text-xl text-red-500">
                    <del> {item?.currency?.symbol ?? ''} </del>
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
