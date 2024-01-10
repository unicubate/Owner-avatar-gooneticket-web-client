/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { OneCartModel } from "@/types/cart";
import { Image } from "antd";
import { DeleteOneCartAPI } from "@/api-site/cart";

type Props = {
  index: number;
  item: OneCartModel;
};

const ListMiniCats: React.FC<Props> = ({ item, index }) => {
  const { mutateAsync: saveMutation } = DeleteOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    //Envoyer la requet au serve
    try {
      await saveMutation({ cartId: item?.id });
      AlertSuccessNotification({
        text: "Product deleted successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <li className="flex py-7" key={index}>
        {/* <div className="flex-shrink-0">
          <Image
            width={95}
            height={95}
            className="object-cover rounded-lg"
            src={""}
            alt=""
          />
        </div> */}

        <div className="relative flex flex-col justify-between flex-1 ml-5">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
            <div className="pr-9 sm:pr-5">
              <p className="text-base font-bold text-black dark:text-white">
                {item?.product?.title ?? ""}
              </p>
              {/* <p className="mt-1.5 text-sm font-medium text-gray-500">Qty: {item?.quantity}</p> */}
              <div className="mt-1.5 text-sm font-medium text-gray-500">
                Qty: {item?.quantity}
              </div>
            </div>

            <div className="flex items-end justify-between mt-4 sm:justify-end sm:items-start sm:mt-0">
              <p className="flex-shrink-0 w-20 text-base font-bold text-left text-black dark:text-white sm:text-right sm:ml-8 sm:order-2">
                {item?.product?.priceDiscount}{" "}
                {item?.product?.currency?.code ?? ""}
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
            <button
              onClick={() => deleteItem(item)}
              className="text-gray-600 hover:text-red-400 focus:ring-red-400"
            >
              <MdOutlineDeleteOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export { ListMiniCats };
