/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Carousel, Image } from "antd";
import { UploadModel } from "@/types/upload";

type Props = {
  uploads: UploadModel[];
};

const contentStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  lineHeight: "50px",
  textAlign: "center",
  background: "#364d79",
};

const ListCarouselUpload: React.FC<Props> = ({ uploads }) => {
  return (
    <>
      {uploads?.length >= 0 && (
        <Carousel autoplay dotPosition={'top'}>
          {uploads?.map((item: any, index: number) => (
            <div key={index}>
              <Image
                className="object-cover w-full h-full"
                style={contentStyle}
                src={item?.url}
                //src={`${getOneFileUploadProductAPI(item?.path)}`}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ListCarouselUpload;
