/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

type Props = {
  item: ProductModel;
};

const ListPublicProductsEvent = ({ item }: Props) => {
  const { isOpen, setIsOpen, userStorage } = useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
  });

  const addToCart = async (itemCard: any) => {
    try {
      if (userStorage?.id) {
        await saveMutation({
          quantity: 1,
          productId: itemCard?.id,
          organizationId: itemCard?.organizationId,
        });
        // AlertSuccessNotification({
        //   text: `Product add to cart successfully`,
        // });
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
        {item?.uploadsImages?.length > 0 ? (
          <Image
            preview={false}
            height={200}
            width="100%"
            className="size-full object-cover transition-all duration-300 group-hover:scale-125"
            src={
              viewOneFileUploadAPI({
                folder: 'products',
                fileName: String(item?.uploadsImages?.[0]?.path),
              }) as string
            }
            alt={item?.title}
          />
        ) : null}

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            <p className="text-3xl">{item?.priceDiscount ?? ''}</p>
            <p className="ml-1 text-lg">{item?.currency?.symbol ?? ''}</p>

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

            {/* <p
              onClick={() => {
                addToCart(item);
              }}
              className="ml-auto text-lg text-gray-900 dark:text-white cursor-pointer"
            >
              <BiCart className="h-10 w-10" />
            </p> */}

            <div className="ml-auto">
              <ButtonInput
                type="button"
                onClick={() => {
                  addToCart(item);
                }}
                variant="ghost"
                className="text-gray-700 dark:bg-[#121212]"
              >
                <ShoppingCartIcon className="size-8 dark:bg-[#121212]" />
              </ButtonInput>
            </div>
          </div>

          <h3 className="duratin-200 mt-2 flex-1 text-sm font-bold text-gray-900 transition-all hover:text-blue-600 dark:text-white sm:text-base">
            <Link
              className="hover:text-blue-600"
              href={`/shop/${item?.slug}`}
              title={item?.title}
            >
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </h3>
          {/* <p className="mt-2 text-base font-normal text-gray-600">
            <HtmlParser html={String(item?.description ?? '')} value={200} />
          </p> */}
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
export { ListPublicProductsEvent };
