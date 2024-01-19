import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";
import { GetOnePostAPI } from "@/api-site/post";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";
import { CreateOrUpdateFormVideoPost } from "@/components/post/create-or-update-form-video-post";
import { useAuth } from "@/components/util/context-user";
import { CreateOrUpdateFormGalleryPost } from "@/components/post/create-or-update-form-gallery-post";
import { LoadingFile } from "@/components/ui-setting/ant/loading-file";
import { GetUploadsAPI } from "../../../api-site/upload";
import { ErrorFile } from "@/components/ui-setting/ant/error-file";
import { GetStaticPropsContext } from "next";

const PostsEdit = () => {
  const { userStorage: user } = useAuth() as any;
  const { query } = useRouter();
  const { type } = query;
  const postId = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({
    postId,
    organizationId: user?.organizationId,
    type: String(type),
  });

  const {
    isError: isErrorImages,
    isLoading: isLoadingImages,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId: post?.organizationId,
    model: "POST",
    uploadableId: postId,
    uploadType: "image",
  });

  const {
    isError: isErrorFiles,
    isLoading: isLoadingFiles,
    data: uploadsFiles,
  } = GetUploadsAPI({
    organizationId: post?.organizationId,
    model: "POST",
    uploadableId: postId,
    uploadType: "file",
  });

  const dataTablePost =
    isLoadingPost || isLoadingImages || isLoadingFiles ? (
      <LoadingFile />
    ) : isErrorPost || isErrorImages || isErrorFiles ? (
      <ErrorFile
        status="error"
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <>
        {user?.organizationId && post?.id && type === "gallery" ? (
          <CreateOrUpdateFormGalleryPost
            uploadImages={uploadImages}
            post={post}
            postId={postId}
            organizationId={post?.organizationId}
          />
        ) : null}

        {post?.id && type === "article" ? (
          <CreateOrUpdateFormPost
            uploadImages={uploadImages}
            post={post}
            postId={postId}
            organizationId={post?.organizationId}
          />
        ) : null}

        {post?.id && type === "audio" ? (
          <CreateOrUpdateFormAudioPost
            post={post}
            postId={postId}
            uploadFiles={uploadsFiles}
            uploadImages={uploadImages}
            organizationId={post?.organizationId}
          />
        ) : null}

        {post?.id && type === "video" ? (
          <CreateOrUpdateFormVideoPost
            uploadImages={uploadImages}
            post={post}
            postId={postId}
            organizationId={post?.organizationId}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${post?.title || "Post"}`}>
        <div className="max-w-4xl mx-auto py-6">
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            {dataTablePost}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsEdit);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}