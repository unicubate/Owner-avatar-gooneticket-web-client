"use client";
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import { Carousel, Image } from "antd";
import { UploadFolderType, UploadModel } from "@/types/upload";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { viewOneFileUploadAPI } from "@/api/upload";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

type Props = {
  uploads: UploadModel[];
  folder: UploadFolderType;
  preview: boolean;
  className?: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
};

const contentStyle: React.CSSProperties = {
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({
  uploads,
  folder,
  preview,
  alt,
  className = "object-cover w-full h-full",
  height = "400px",
  width = "100%",
}) => {
  const ref = useRef();

  return (
    <>
      <ResponsiveCarousel
        autoFocus={true}
        autoPlay={false}
        showIndicators={false}
      >
        {uploads &&
          uploads.map((item: any, index: number) => (
            <div key={index}>
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
            </div>
          ))}
      </ResponsiveCarousel>
    </>
  );
};

export { ListCarouselUpload };
