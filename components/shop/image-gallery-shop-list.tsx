/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { UploadModel } from '@/types/upload';
import { Image } from 'antd';
import React, { useState } from 'react';

type Props = {
  uploads: UploadModel[];
  folder: string;
  preview: boolean;
  className?: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
  autoplay?: boolean;
};

const contentStyle: React.CSSProperties = {
  lineHeight: '50px',
  textAlign: 'center',
  background: '#364d79',
};

const ImageGalleryShopList: React.FC<Props> = ({
  uploads,
  folder,
  preview,
  alt,
  className = 'object-cover w-full h-full',
  height = '100%',
  width = '100%',
  autoplay = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    uploads?.[0]?.path,
  );

  return (
    <>
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="overflow-hidden rounded-sm border-2 border-transparent">
              <Image
                width={width}
                height={400}
                className={className}
                preview={true}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: selectedImage,
                })}`}
                alt={alt}
              />
            </div>
          </div>

          <div className="mt-2.5 w-full lg:order-1 lg:mt-0 lg:w-32 lg:shrink-0">
            <div className="flex flex-row items-stretch space-x-2.5 lg:flex-col lg:space-x-0 lg:space-y-5">
              {uploads &&
                uploads?.length > 0 &&
                uploads?.map((item: any, index: number) => (
                  <button
                    type="button"
                    className="flex-1"
                    key={index}
                    onClick={() => setSelectedImage(item?.path)}
                  >
                    <div className="aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 overflow-hidden rounded-sm border-2 border-transparent">
                      <Image
                        width={width}
                        height={100}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { ImageGalleryShopList };
