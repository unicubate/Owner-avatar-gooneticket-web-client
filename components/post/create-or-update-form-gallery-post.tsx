import React, {  } from "react";
import { CreateOrUpdateFormGallery } from "../gallery/create-or-update-form-gallery";

type Props = {
  uploadImages?: any;
  postId?: string;
  post?: any;
};

const CreateOrUpdateFormGalleryPost: React.FC<Props> = ({
  post,
  uploadImages,
}) => {


  return (
    <>
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <div className="flow-root">
          <div className="overflow-hidden bg-white border border-gray-200">
            <div className="px-4 py-5">
              <h2 className="text-base font-bold text-gray-900">
                {post?.id ? "Update" : "Create a new"} gallery
              </h2>

              <CreateOrUpdateFormGallery uploadImages={uploadImages} post={post} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CreateOrUpdateFormGalleryPost };
