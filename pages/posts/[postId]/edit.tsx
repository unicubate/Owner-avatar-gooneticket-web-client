import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";
import { GetOnePostAPI } from "@/api/post";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";
import { CreateOrUpdateFormVideoPost } from "@/components/post/create-or-update-form-video-post";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAuth } from "@/components/util/session/context-user";
import { CreateOrUpdateFormGalleryPost } from "@/components/post/create-or-update-form-gallery-post";
import { LoadingFile } from "@/components/templates/loading-file";
import { GetUploadsAPI } from "@/api/upload";

const PostsCreate = () => {
  const { userStorage } = useAuth() as any;
  const { query } = useRouter();
  const { type } = query;
  const postId = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({
    postId,
    userId: userStorage?.id,
    type: String(type),
  });

  const {
    isLoading: isLoadingFileUploads,
    isError: isErrorFileUploads,
    data: dataFileUploads,
  } = GetUploadsAPI({
    userId: userStorage?.id,
    postId: postId,
    uploadType: "file",
  });

  const {
    isLoading: isLoadingImageUploads,
    isError: isErrorImageUploads,
    data: dataImageUploads,
  } = GetUploadsAPI({
    userId: userStorage?.id,
    postId: postId,
    uploadType: "image",
  });

  const dataTablePost =
    isLoadingImageUploads || isLoadingFileUploads || isLoadingPost ? (
      <LoadingFile />
    ) : isErrorFileUploads || isErrorImageUploads || isErrorPost ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <>
        {post?.id && type === "gallery" ? (
          <CreateOrUpdateFormGalleryPost post={post} postId={postId} />
        ) : null}

        {post?.id && type === "article" ? (
          <CreateOrUpdateFormPost post={post} postId={postId} />
        ) : null}

        {post?.id && type === "audio" ? (
          <CreateOrUpdateFormAudioPost
            post={post}
            postId={postId}
            uploadFiles={dataFileUploads?.data}
            uploadImages={dataImageUploads?.data}
          />
        ) : null}

        {post?.id && type === "video" ? (
          <CreateOrUpdateFormVideoPost post={post} postId={postId} />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${post?.title ?? ""}`}>
        <div className="flex-1">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTablePost}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);
