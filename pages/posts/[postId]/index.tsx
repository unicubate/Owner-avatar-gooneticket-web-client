import { LayoutDashboard } from "@/components/layout-dashboard";
import { GetOnePostAPI } from "@/api-site/post";
import { useRouter } from "next/router";
import { Image } from "antd";
import { BiComment } from "react-icons/bi";
import { useAuth } from "@/components/util/context-user";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { LoadingFile } from "@/components/ui/loading-file";
import { ErrorFile } from "@/components/ui/error-file";
import { AvatarComponent } from "@/components/ui";
import PublicListLastPosts from '@/components/post/public-last-posts';
import { HtmlParser } from "@/utils/html-parser";

const PostShow = () => {
  const { userVisiter } = useAuth() as any;
  const router = useRouter();
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug });

  const dataTablePosts = isLoadingPost ? (
    <LoadingFile />
  ) : isErrorPost ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : (
    <ListFollowPosts
      item={post}
      commentTake={4}
      userVisitor={{
        id: userVisiter?.id,
        organizationId: userVisiter?.organizationId
      }} />
  );

  return (
    <>
      <LayoutDashboard title={"Home"}>
        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-7xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-8xl">
                <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">

                  <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div className="mx-auto sm:px-6 md:px-8">
                        {dataTablePosts}
                      </div>
                    </div>
                  </div>

                  <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">
                    <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                      <div className="px-4 py-6 sm:p-6 lg:p-8">
                        <div className="text-center">
                          <AvatarComponent
                            size={{ xs: 50, sm: 50, md: 60, lg: 64, xl: 80, xxl: 100 }}
                            profile={post?.profile}
                          />
                          <p className="mt-4 text-lg font-semibold text-black">
                            {post?.profile?.firstName ?? ""} {post?.profile?.lastName ?? ""}{" "}
                          </p>
                          <p className="mt-2 text-sm font-normal">
                            <span className={`ql-editor`}>
                              <HtmlParser
                                html={String(
                                  post?.profile?.description ?? ""
                                )}
                              />
                            </span>
                          </p>


                        </div>
                      </div>
                    </div>
                    <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                      {post?.organizationId ?
                        <PublicListLastPosts
                          post={post}
                          userVisitor={{ organizationId: post?.organizationId }}
                        /> : null}


                    </div>
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
