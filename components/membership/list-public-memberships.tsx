/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { HtmlParser } from "@/utils/html-parser";
import { ButtonInput } from "../ui/button-input";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import { MembershipModel } from "@/types/membership";
import { useRouter } from "next/router";

type Props = {
  item?: MembershipModel;
};

const ListPublicMemberships: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  return (
    <>
      <div
        key={item?.id}
        className="overflow-hidden bg-white shadow-2xl shadow-gray-300/60"
      >
        <div className="p-8 sm:py-7 sm:px-8">
          <div className="flex items-center">
            {item?.id ? (
              <p className="text-lg font-bold text-gray-900 cursor-pointer">
                {item?.title ?? ""}
              </p>
            ) : null}
          </div>

          {item?.uploadsImage?.length > 0 ? (
            <div className="mt-4 text-center justify-center mx-auto">
              <ListCarouselUpload
                uploads={item?.uploadsImage}
                folder="memberships"
                preview={false}
                height={200}
              />
            </div>
          ) : null}

          <div className="flex mt-2 items-end justify-center space-x-1">
            <div className="flex items-start">
              <p className="text-5xl font-medium tracking-tight">
                {item?.price}
              </p>
              <span className="text-xl font-medium text-black">
                {item?.currency?.symbol}
              </span>
            </div>
            <span className="ml-0.5 text-lg text-gray-600"> / {item?.month ?? 0} {Number(item?.month) > 1 ? `${item?.month} months` : `${item?.month} month`} </span>
          </div>

          <div className="mt-4 text-center justify-center mx-auto">
            <div className="sm:mt-0">
              <ButtonInput
                onClick={() => {
                  router.push(`/memberships/${item?.id}/checkout`);
                }}
                shape="default"
                type="button"
                size="large"
                loading={false}
                color={"indigo"}
                minW="fit"
              >
                Join
              </ButtonInput>
            </div>
          </div>

          <div className="mt-4 text-sm font-normal text-gray-600">
            <HtmlParser html={String(item?.description)} />
          </div>
        </div>
      </div>
    </>
  );
};
export { ListPublicMemberships };
