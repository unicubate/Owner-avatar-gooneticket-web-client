import { GetOnePostAPI } from '@/api-site/post';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormPost } from '@/components/post/create-or-update-form-post';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';
import { GetUploadsAPI } from '../../../api-site/upload';

const PostsEdit = () => {
  const { userStorage: user } = useInputState();
  const { query } = useRouter();
  const { type } = query;
  const postId = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
    refetch,
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
    model: 'POST',
    uploadableId: postId,
    uploadType: 'image',
  });

  const {
    isError: isErrorFiles,
    isLoading: isLoadingFiles,
    data: uploadsFiles,
  } = GetUploadsAPI({
    organizationId: post?.organizationId,
    model: 'POST',
    uploadableId: postId,
    uploadType: 'file',
  });

  const dataTablePost =
    isLoadingPost || isLoadingImages || isLoadingFiles ? (
      <LoadingFile />
    ) : isErrorPost || isErrorImages || isErrorFiles ? (
      <ErrorFile
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <>
        {post?.id && type === 'article' ? (
          <CreateOrUpdateFormPost
            uploadImages={uploadImages}
            post={post}
            refetch={refetch}
            postId={postId}
            organizationId={post?.organizationId}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${post?.title || 'Post'}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {dataTablePost}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsEdit);
