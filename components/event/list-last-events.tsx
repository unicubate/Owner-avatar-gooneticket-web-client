/* eslint-disable jsx-a11y/anchor-is-valid */
import { EventModel } from '@/types/event';
import Link from 'next/link';
import { useInputState } from '../hooks';
import { ListCarouselUpload } from '../ui-setting/list-carousel-upload';

type Props = {
  item: EventModel;
};

export function ListLastEvents(props: Props) {
  const { locale, ipLocation } = useInputState();
  const { item } = props;
  return (
    <>
      <li
        key={item?.id}
        className="flex items-stretch justify-between space-x-2 py-7"
      >
        <div className="shrink-0">
          {item?.uploadImages?.length > 0 ? (
            <div className="size-16 rounded-lg object-cover">
              <ListCarouselUpload
                uploads={item?.uploadImages}
                folder={String(item?.model.toLocaleLowerCase())}
                height="65px"
                className={`size-16`}
              />
            </div>
          ) : null}
        </div>

        <div className="ml-5 flex flex-1 flex-col justify-between">
          <div className="flex-1">
            {item?.id ? (
              <Link
                href={`/events/${item?.slug}`}
                className="cursor-pointer text-sm font-bold dark:text-white"
              >
                {item?.title ?? ''}
              </Link>
            ) : null}

            {/* <div className="mt-2 flex items-center font-medium">
              <span className="text-sm">
                {formateDate(item?.expiredAt as Date, locale)}
              </span>
              {Number(item?.one) > 0 ? (
                <>
                  <span className="ml-2 text-sm">
                    {formatePrice({
                      currency: String(item?.currency?.code),
                      value: Number(item?.prices?.[0].amount ?? 0),
                      isDivide: false,
                    })}
                  </span>
                </>
              ) : (
                <span className="ml-2">Free</span>
              )}
            </div> */}
          </div>
        </div>
      </li>
    </>
  );
}
