'use client';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { UploadModel } from '@/types/upload';
import { Image } from 'antd';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { PostModel } from '@/types/post';
import { Pagination, Zoom } from 'swiper/modules';

type Props = {
  uploads: UploadModel[];
  folder: string;
  preview?: boolean;
  className?: string;
  alt?: string;
  post?: PostModel;
  height?: string | number;
  width?: string | number;
};

const contentStyle: React.CSSProperties = {
  lineHeight: '50px',
  textAlign: 'center',
  // background: "#364d79",
};

export function ListCarouselUpload(props: Props) {
  const {
    uploads,
    folder,
    preview = false,
    alt,
    post,
    className = '',
    height = '100%',
    width = '100%',
  } = props;
  const ref = useRef();

  return (
    <>
      <Swiper
        zoom={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        history={{
          key: 'slide',
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Zoom]}
        style={contentStyle}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
          // 640: {
          //   slidesPerView: 1,
          //   spaceBetween: 16,
          // }
        }}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: UploadModel, index: number) => (
            <SwiperSlide key={index}>
              <Image
                width={width}
                height={height}
                className={className}
                preview={preview}
                style={contentStyle}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: item?.path,
                })}`}
                alt={alt}
                decoding="auto"
                fetchPriority="high"
                //loading="lazy"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
