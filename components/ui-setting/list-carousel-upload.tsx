'use client';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { UploadModel } from '@/types/upload';
//import { Image } from 'antd';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { cn } from '@/lib/utils';
import { PostModel } from '@/types/post';
import Image from 'next/image';
import { Pagination, Zoom } from 'swiper/modules';

type Props = {
  uploads: UploadModel[];
  folder: string;
  className?: string;
  alt?: string;
  post?: PostModel;
  height?: string;
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
                height={500}
                width={1000}
                style={{
                  height: `${height}`,
                  width: `${width}`,
                  marginInline: 'auto',
                  aspectRatio: 'auto',
                  pointerEvents: 'none',
                }}
                className={cn('rounded-md object-cover', className)}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: item?.path,
                })}`}
                quality={90}
                priority={true}
                alt={String(alt)}
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
