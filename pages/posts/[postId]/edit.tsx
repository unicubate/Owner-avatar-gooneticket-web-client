import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { ButtonInput } from "@/components/templates/button-input";
import { GetOnePostAPI } from "@/api/post";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";
import { CreateOrUpdateFormVideoPost } from "@/components/post/create-or-update-form-video-post";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAuth } from "@/components/util/session/context-user";
import { CreateOrUpdateFormGalleryPost } from "@/components/post/create-or-update-form-gallery-post";

const PostsCreate = () => {
  const user = useAuth() as any;
  const { query } = useRouter();
  const { type } = query;
  const postId = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({
    postId,
    userId: user?.id,
    type: String(type),
  });

  const dataTablePost = isLoadingPost ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorPost ? (
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
        <CreateOrUpdateFormAudioPost post={post} postId={postId} />
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
