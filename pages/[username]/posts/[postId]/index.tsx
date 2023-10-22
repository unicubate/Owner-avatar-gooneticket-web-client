import { LoadingOutlined } from "@ant-design/icons";
import { Image, Spin } from "antd";
import { GetOnePostAPI } from "@/api-site/post";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { PostModel } from "@/types/post";
import { useAuth } from "@/components/util/context-user";
import ListPublicPostsComments from "@/components/post/list-public-posts-comments";
import { ButtonInput } from "@/components/ui/button-input";
import { GetOneUserPublicAPI } from "@/api-site/user";
import PublicListLastPosts from "@/components/post/public-last-posts";
import { LoadingFile } from "@/components/ui/loading-file";

const PostsShowUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);
  const postSlug = String(query?.postId);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug });

  const dataTablePosts =
    isLoadingPost || isLoadingUser ? (
      <LoadingFile />
    ) : isErrorPost || isErrorUser ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <ListPublicPostsComments item={post} commentTake={10} />
    );
  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
          <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
            <div className="flow-root">
              <div className="px-4 mt-4 mx-auto sm:px-6 md:px-8">
                {dataTablePosts}
              </div>
            </div>
          </div>

          {user?.id ? <PublicListLastPosts post={post} userVisitor={{ id: userVisiter?.id, organizationId: user?.organizationId, }} /> : null}

        </div>
      </div>
    </>
  );
};

export default PostsShowUserPublic;
