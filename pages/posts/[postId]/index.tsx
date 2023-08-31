import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { GetOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ButtonInput } from "@/components/templates/button-input";
import { Avatar, Image } from "antd";
import ListComments from "@/components/comment/list-comments";
import { MdFavoriteBorder } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { LayoutSite } from "@/components/layout-site";
import { HtmlParser } from "@/utils/html-parser";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { formateDMYHH } from "@/utils";
import ReactPlayer from "react-player";

const PostShow = () => {
  const router = useRouter();
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const { data: postItem } = GetOnePostAPI({ postSlug });

  const post: PostModel | undefined = postItem?.data;

  return (
    <>
      <LayoutDashboard title={"Home"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-3xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/50">
                  <div className="p-8 sm:py-10 sm:px-12">
                    <div className="flex items-center">
                      <div
                        onClick={() =>
                          router.push(`/${post?.profile?.username}`)
                        }
                        className="relative flex-shrink-0 cursor-pointer"
                      >
                        <Avatar
                          size={40}
                          className="object-cover w-10 h-10 rounded-full"
                          src={post?.profile?.image}
                          alt={`${post?.profile?.firstName} ${post?.profile?.lastName}`}
                        />
                      </div>

                      <div
                        onClick={() =>
                          router.push(`/${post?.profile?.username}`)
                        }
                        className="ml-4 cursor-pointer"
                      >
                        <p className="text-sm font-bold text-gray-900">
                          {post?.profile?.firstName ?? ""}{" "}
                          {post?.profile?.lastName ?? ""}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          {formateDMYHH(post?.createdAt as Date)}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                          {" "}
                          Private{" "}
                        </p>
                      </div>
                    </div>

                    {post?.urlMedia &&
                    ["VIDEO", "AUDIO"].includes(post?.type) ? (
                      <div className="mt-2">
                        <ReactPlayer
                          className="mr-auto"
                          url={post?.urlMedia}
                          width="100%"
                          height="400px"
                          controls
                        />
                      </div>
                    ) : null}

                    {post?.image ? (
                      <div className="mt-2">
                        <Image
                          width="100%"
                          height="100%"
                          preview={false}
                          src={`${getOneFileGalleryAPI(String(post?.image))}`}
                          alt={post?.title}
                        />
                      </div>
                    ) : null}

                    {post?.id ? (
                      <h3
                        onClick={() => router.push(`/posts/${post?.slug}`)}
                        className="mt-2 text-lg font-bold text-gray-900 cursor-pointer"
                      >
                        {post?.title ?? ""}
                      </h3>
                    ) : null}

                    <p className="mt-4 text-sm font-normal text-gray-600">
                      <HtmlParser html={String(post?.description)} />
                    </p>

                    {/* <div className="flex mt-4 items-center">
            <CreateOrUpdateFormLike typeLike="POST" item={post} />

            <button className="ml-3.5 text-xl font-bold">
              <BiComment />
            </button>
            <span className="ml-1.5 font-normal text-sm">
              {post?.totalComment ?? 0}
            </span>
          </div> */}

                    <ListComments postId={String(post?.id)} take={10} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PostShow;
