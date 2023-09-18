/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { HtmlParser } from "@/utils/html-parser";
import Link from "next/link";
import { ProductModel } from "@/types/product";
import { ButtonInput } from "../ui/button-input";
import { ListCarouselUpload } from "../shop/list-carousel-upload";

type Props = {
  item?: ProductModel;
};

const ListPublicCommissions: React.FC<Props> = ({ item }) => {
  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            {item?.id ? (
              <Link
                href={`/${item?.profile?.username}/posts/${item?.slug}`}
                className="text-lg font-bold text-gray-900 cursor-pointer"
              >
                {item?.title ?? ""}
              </Link>
            ) : null}

            <div className="ml-auto">
              <ButtonInput
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={"red"}
                minW="fit"
              >
                200 $
              </ButtonInput>
            </div>
          </div>

          <div className="text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </div>
          <div className="mt-4 text-center justify-center mx-auto">
            <ListCarouselUpload
              uploads={item?.uploadsImage}
              folder="commissions"
              preview={false}
              height={250}
            />
          </div>

          <div className="mt-6 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                shape="default"
                type="button"
                size="large"
                loading={false}
                color={"indigo"}
                minW="fit"
              >
                Request this
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPublicCommissions;
