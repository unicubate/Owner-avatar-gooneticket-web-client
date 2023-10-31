"use client";
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useRef, useState } from "react";
import { Carousel, Image } from "antd";
import { UploadFolderType, UploadModel } from "@/types/upload";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { viewOneFileUploadAPI } from "@/api-site/upload";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import ContentLoader from "react-content-loader";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';

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
  // background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({
  uploads,
  folder,
  preview,
  alt,
  className = "object-cover w-full h-full",
  height = "100%",
  width = "100%",
  autoplay = false,
}) => {
  const ref = useRef();

  return (
    <>
      {/* <ResponsiveCarousel
        // autoFocus={true}
        showArrows={true}
        autoPlay={false}
        showStatus={uploads?.length > 1 ? true : false}
        showIndicators={uploads?.length > 1 ? true : false}
      >
        {uploads &&
          uploads.map((item: any, index: number) => (
            <Fragment key={index}>
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
              />
            </Fragment>
          ))}
      </ResponsiveCarousel> */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        history={{
          key: "slide",
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={contentStyle}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                loading="lazy"
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
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <Carousel
        autoplay={autoplay}
        dots={true}
        effect={"fade"}
        dotPosition={"bottom"}
        pauseOnDotsHover={true}
        pauseOnHover={true}
        style={contentStyle}
        responsive={[{ breakpoint: 1050, settings: "unslick" }]}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: any, index: number) => (
            <Fragment key={index}>
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
              />
            </Fragment>
          ))}
      </Carousel> */}
    </>
  );
};

export { ListCarouselUpload };
