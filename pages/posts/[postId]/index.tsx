import LayoutDashboard from "@/components/layout-dashboard";
import { GetOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { Avatar, Image, Spin } from "antd";
import ListComments from "@/components/comment/list-comments";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoShareOutline } from "react-icons/io5";
import { HtmlParser } from "@/utils/html-parser";
import { formateDMYHH } from "@/utils";
import ReactPlayer from "react-player";
import { useAuth } from "@/components/util/session/context-user";
import { FiDownload } from "react-icons/fi";
import { CreateOrUpdateFormLike } from "@/components/like/create-or-update-form-like";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { LoadingOutlined } from "@ant-design/icons";

const PostShow = () => {
  const user = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const {
    data: postItem,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug });
  const post: PostModel | undefined = postItem?.data;

  const dataTablePosts = isLoadingPost ? (
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
    <ListFollowPosts item={post} commentTake={10} />
  );

  return (
    <>
      <LayoutDashboard title={"Home"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-3xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTablePosts}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PostShow;
