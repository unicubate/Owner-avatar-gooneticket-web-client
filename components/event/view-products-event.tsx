/* eslint-disable jsx-a11y/anchor-is-valid */
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/router';
import 'react-h5-audio-player/lib/styles.css';
import { ButtonInput, CopyShareLink } from '../ui-setting';
import { ListCarouselUpload } from '../ui-setting/list-carousel-upload';

import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { ProductModel } from '@/types/product';
import { formatePrice, formateToRFC2822 } from '@/utils';
import { MessageCircleIcon, ShareIcon, TicketPlusIcon } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ListComments } from '../comment/list-comments';
import { useInputState } from '../hooks';

type Props = {
  item: ProductModel;
};

const ViewProductsEvent = ({ item }: Props) => {
  const { pathname, push } = useRouter();

  const { linkHref, isOpen, setIsOpen, locale, userStorage, ipLocation } =
    useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <>
      <div
        key={item?.id}
        className="my-8 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder={String(item?.model.toLocaleLowerCase())}
                height={400}
                className={`object-cover`}
              />
            </div>
          ) : null}

          <div className="items-center justify-items-center">
            <ButtonInput
              type="button"
              className="w-full"
              variant="primary"
              size="lg"
              onClick={() => {
                userStorage?.id
                  ? push(
                      `/checkouts/${item?.slug}/event?username=${item?.profile?.username}`,
                    )
                  : push(
                      `/login${pathname ? `?redirect=${`${ipLocation?.url}/checkouts/${item?.slug}/event?username=${item?.profile?.username}`}` : ''}`,
                    );
              }}
              icon={<TicketPlusIcon className="size-6" />}
            >
              Book
            </ButtonInput>
          </div>

          {item?.title ? (
            <div className="mt-2 text-2xl font-bold">{item?.title ?? ''}</div>
          ) : null}

          <div className="relative mt-4 shrink-0 cursor-pointer">
            <div className="flex items-center">
              <div className="flex shrink-0 items-center font-bold">
                {Number(item?.prices?.length) > 0 ? (
                  <>
                    <span className="ml-1 text-3xl">
                      {formatePrice({
                        currency: String(item?.currency?.code),
                        value: Number(item?.prices?.[0].amount ?? 0),
                        isDivide: false,
                      })}
                    </span>
                  </>
                ) : (
                  <span className="ml-1 text-2xl">Free</span>
                )}
                {/* <span className="ml-1 text-3xl">
                  {formatePrice({
                    value: Number(item?.priceDiscount ?? 0),
                    isDivide: false,
                  })}
                </span>

                {item?.enableDiscount ? (
                  <>
                    <p className="ml-2 text-xl text-red-500">
                      <del> {item?.price ?? ''} </del>
                    </p>
                    <p className="ml-1 text-xl text-red-500">
                      <del> {item?.currency?.symbol ?? ''} </del>
                    </p>
                  </>
                ) : null} */}
              </div>

              <div className="ml-auto hidden font-bold lg:table-cell">
                <span className="text-lg">
                  {formateToRFC2822(item?.expiredAt as Date, locale)}
                </span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
              </div>
            </div>
          </div>
          <div className="relative mt-4 shrink-0 cursor-pointer">
            <div className="hidden items-center lg:table-cell">
              <div className="flex shrink-0 font-bold">
                <span className="text-lg">{item?.address ?? ''}</span>
                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-lg">{item?.city ?? ''}</span>
                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-lg">
                  {item?.country?.name ?? ''}
                </span>
              </div>
            </div>

            <div className="text-lg lg:hidden">
              <div className="flex font-bold">Date</div>
              <div className="ml-auto">
                <span className="text-sm">
                  {formateToRFC2822(item?.expiredAt as Date, locale)}
                </span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
              </div>
            </div>

            <div className="mt-4 text-lg lg:hidden">
              <div className="flex font-bold">Location</div>
              <div className="ml-auto">
                <span className="text-sm">{item?.address ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-sm">{item?.city ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-1.5 text-sm">
                  {item?.country?.name ?? ''}
                </span>
              </div>
            </div>
          </div>

          {item?.description ? (
            <div
              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
            >
              <span className={`ql-editor`}>
                <HtmlParser html={String(item?.description ?? '')} />
              </span>
            </div>
          ) : null}

          {item?.urlMedia ? (
            <div className={`mx-auto mt-1`}>
              <ReactPlayer
                className={`mr-auto`}
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <MessageCircleIcon className="size-7" />
            <span className="ml-2 text-sm">
              {item?.totalComment > 0 ? item?.totalComment : ''}
            </span>

            <CopyShareLink
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              link={window.location.href}
              buttonDialog={
                <ButtonInput
                  className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                  variant="link"
                  type="button"
                >
                  <ShareIcon className="size-6" />
                </ButtonInput>
              }
            />
          </div>

          <ListComments
            model="PRODUCT"
            modelIds={['PRODUCT']}
            take={6}
            userVisitorId={userStorage?.id}
            organizationId={item?.organizationId}
            productId={item?.id}
          />
        </div>
      </div>
    </>
  );
};

export { ViewProductsEvent };
