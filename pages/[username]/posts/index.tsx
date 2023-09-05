import { Image, Spin } from "antd";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api/user";
import { useRouter } from "next/router";
import PublicPosts from "@/components/post/public-posts";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/session/context-user";
import PublicListLastPosts from '@/components/post/public-last-posts';
import { LoadingOutlined } from "@ant-design/icons";

const PostsUserPublic = () => {
  const userVisiter = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username, followerId: userVisiter?.id });


  const dataTablePosts = isLoadingUser ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <PublicPosts userId={user?.id} likeUserId={userVisiter?.id} />
  );

  return (
    <>

      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
          <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
            <div className="flow-root">
              <div className="mt-4 mx-auto sm:px-6 md:px-8">
                {dataTablePosts}
              </div>
            </div>
          </div>

          {user?.id ? <PublicListLastPosts userId={user?.id} /> : null}

        </div>

      </div>
    </>
  );
};

export default PostsUserPublic;
