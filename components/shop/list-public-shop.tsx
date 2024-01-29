/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BiCart } from 'react-icons/bi';
import { LoginModal } from '../auth-modal/login-modal';
import { useInputState } from '../hooks';

type Props = {
  item?: ProductModel;
};

const ListPublicShop: React.FC<Props> = ({ item }) => {
  const { isOpen, setIsOpen, userStorage } = useInputState();

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
        setIsOpen(true);
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
        className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 dark:bg-[#121212]"
      >
        {item?.uploadsImage.length > 0 ? (
          <Image
            preview={false}
            height={200}
            width="100%"
            className="size-full object-cover transition-all duration-300 group-hover:scale-125"
            src={
              viewOneFileUploadAPI({
                folder: 'products',
                fileName: String(item?.uploadsImage?.[0]?.path),
              }) as string
            }
            alt={item?.title}
          />
        ) : null}

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            <p className="text-2xl text-gray-900 dark:text-white">
              {item?.priceDiscount ?? ''}
            </p>
            <p className="ml-1 text-xl  text-gray-900 dark:text-white">
              {item?.currency?.symbol ?? ''}
            </p>

            {item?.enableDiscount ? (
              <>
                <p className="ml-2 text-lg text-gray-400 dark:text-white">
                  <del> {item?.price ?? ''} </del>
                </p>
                <p className="ml-1 text-lg text-gray-400 dark:text-white">
                  <del> {item?.currency?.symbol ?? ''} </del>
                </p>
              </>
            ) : null}

            {/* <p
              onClick={() => {
                addToCart(item);
              }}
              className="ml-auto text-lg text-gray-900 dark:text-white cursor-pointer"
            >
              <BiCart className="h-10 w-10" />
            </p> */}

            <button
              type="button"
              onClick={() => {
                addToCart(item);
              }}
              className="ml-auto rounded-full bg-white text-gray-700 transition-all duration-200 hover:text-blue-600 dark:bg-[#121212]"
            >
              <BiCart className="size-10 bg-white dark:bg-[#121212]" />
            </button>
          </div>

          <h3 className="duratin-200 mt-2 flex-1 text-sm font-bold text-gray-900 transition-all hover:text-blue-600 dark:text-white sm:text-base">
            <Link href={`/shop/${item?.slug}`} title={item?.title}>
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </h3>
          <p className="mt-2 text-base font-normal text-gray-600 dark:text-white">
            <HtmlParser html={String(item?.description ?? '')} value={60} />
          </p>
          {/* <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div> */}
        </div>
      </div>

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export { ListPublicShop };
