/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { UploadFolderType, UploadModel } from "@/types/upload";
import { Image } from "antd";
import { viewOneFileUploadAPI } from "@/api-site/upload";

type Props = {
  uploads: UploadModel[];
  folder: UploadFolderType;
  preview: boolean;
  className?: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
  autoplay?: boolean;
};

const contentStyle: React.CSSProperties = {
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ImageGalleryShopList: React.FC<Props> = ({
  uploads,
  folder,
  preview,
  alt,
  className = "object-cover w-full h-full",
  height = "100%",
  width = "100%",
  autoplay = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(uploads?.[0]?.path);

  return (
    <>
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="overflow-hidden border-2 border-transparent rounded-sm">
              <Image
                width={width}
                height={height}
                className={className}
                preview={preview}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: selectedImage,
                })}`}
                alt={alt}
              />
            </div>
          </div>

          <div className="w-full lg:w-32 mt-2.5 lg:mt-0 lg:flex-shrink-0 lg:order-1">
            <div className="flex flex-row items-stretch lg:flex-col lg:space-y-5 space-x-2.5 lg:space-x-0">
              {uploads &&
                uploads?.length > 0 &&
                uploads?.map((item: any, index: number) => (
                  <button
                    type="button"
                    className="flex-1"
                    key={index}
                    onClick={() => setSelectedImage(item?.path)}
                  >
                    <div className="overflow-hidden border-2 border-transparent rounded-sm aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                      <Image
                        width={width}
                        height={height}
                        className={className}
                        preview={preview}
                        src={`${viewOneFileUploadAPI({
                          folder: folder,
                          fileName: item?.path,
                        })}`}
                        alt={alt}
                      />
                    </div>
                  </button>
                ))}
              {/* <button type="button" className="flex-1">
                <div className="overflow-hidden border-2 border-gray-900 rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-2.png"
                    alt=""
                  />
                </div>
              </button>

              <button type="button" className="flex-1">
                <div className="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                  <img
                    className="object-cover w-full h-full"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-3.png"
                    alt=""
                  />
                </div>
              </button>
             */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { ImageGalleryShopList };
