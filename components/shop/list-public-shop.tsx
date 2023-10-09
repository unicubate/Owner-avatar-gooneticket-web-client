/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Button, Image } from "antd";
import { HtmlParser } from "@/utils/html-parser";
import Link from "next/link";
import { ProductModel } from "@/types/product";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ReadMore } from "@/utils/read-more";
import { viewOneFileUploadAPI } from "@/api-site/upload";

type Props = {
  item?: ProductModel;
  commentTake: number;
};

const ListPublicShop: React.FC<Props> = ({ item, commentTake }) => {

  return (
    <>
      <div key={item?.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
        {item?.uploadsImage.length > 0 ?
          <Image
            preview={false}
            height={200}
            width="100%"
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src={viewOneFileUploadAPI({ folder: 'products', fileName: String(item?.uploadsImage?.[0]?.path) }) as string}
            alt=""
          /> : null}


        <div className="flex flex-col flex-1 p-3">
          <div className="flex items-center flex-shrink-0">

            <p className="text-2xl font-bold text-gray-900">
              {item?.priceDiscount ?? ""}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {item?.currency?.symbol ?? ""}
            </p>

            {item?.enableDiscount ? (
              <>
                <p className="ml-2 text-lg font-bold text-gray-400">
                  <del> {item?.price ?? ""} </del>
                </p>
                <p className="text-lg font-bold text-gray-400">
                  <del> {item?.currency?.symbol ?? ""} </del>
                </p>
              </>
            ) : null}

            <p className="ml-auto text-lg font-bold">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </p>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2 flex-1 hover:text-blue-600 transition-all duratin-200">
            <Link href={`/shop/${item?.slug}`} title={item?.title}>
              <ReadMore html={String(item?.title ?? "")} value={60} />
            </Link>
          </h3>
          <p className="mt-2 text-base font-normal text-gray-600">
            <HtmlParser html={String(item?.description ?? "")} value={60} />
          </p>
          {/* <div className="sm:flex flex-col sm:items-end sm:justify-between">
            <div className="mt-2">
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ListPublicShop;
