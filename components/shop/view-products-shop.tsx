/* eslint-disable jsx-a11y/anchor-is-valid */
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/router';
import 'react-h5-audio-player/lib/styles.css';
import { ButtonInput, CopyShareLink } from '../ui-setting';
import { ListCarouselUpload } from './list-carousel-upload';

import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { MessageCircleIcon, ShareIcon, ShoppingCartIcon } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ListComments } from '../comment/list-comments';
import { useInputState } from '../hooks';

type Props = {
  item: ProductModel;
};

const ViewProductsShop = ({ item }: Props) => {
  const { query, pathname, push } = useRouter();
  const { linkHref, isOpen, setIsOpen, loading, setLoading, userStorage } =
    useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const addToCart = async (itemCard: any) => {
    try {
      if (userStorage?.id) {
        await saveMutation({
          quantity: 1,
          productId: itemCard?.id,
          organizationId: itemCard?.organizationId,
        });
        AlertSuccessNotification({
          text: `Product add to cart successfully`,
        });
      } else {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder="products"
                height={400}
                className={`object-cover`}
              />
            </div>
          ) : null}

          {item?.title ? (
            <div className="mt-2 font-bold text-2xl">{item?.title ?? ''}</div>
          ) : null}

          <div className="mt-4 relative shrink-0 cursor-pointer">
            <div className="flex items-center">
              <div className="flex shrink-0 items-center font-bold">
                <p className="text-3xl">{item?.currency?.symbol ?? ''}</p>
                <p className="ml-1 text-3xl">{item?.priceDiscount ?? ''}</p>

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

              <div className="ml-auto">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="info"
                  onClick={() => {
                    addToCart(item);
                  }}
                  icon={<ShoppingCartIcon className="mr-2 size-6" />}
                >
                  Get this
                </ButtonInput>
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
            <MessageCircleIcon className="size-5" />
            <span className="ml-2 text-sm">
              {item?.totalComment > 0 ? item?.totalComment : ''}
            </span>

            <CopyShareLink
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              link={`${process.env.NEXT_PUBLIC_SITE}/shop/${item?.slug}`}
              buttonDialog={
                <ButtonInput
                  className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                  variant="link"
                  type="button"
                >
                  <ShareIcon className="size-5" />
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

export { ViewProductsShop };
