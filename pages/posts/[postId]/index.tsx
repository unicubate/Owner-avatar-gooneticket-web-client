import { LayoutDashboard } from "@/components/layout-dashboard";
import { GetOnePostAPI } from "@/api-site/post";
import { useRouter } from "next/router";
import { useAuth } from "@/components/util/context-user";
import { ListFollowPosts } from "@/components/post/list-follow-posts";
import { LoadingFile } from "@/components/ui/loading-file";
import { ErrorFile } from "@/components/ui/error-file";
import { AvatarComponent } from "@/components/ui";
import { HtmlParser } from "@/utils/html-parser";
import { PublicLastPosts } from "@/components/post/public-last-posts";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { GetStaticPropsContext } from "next";

const PostShow = () => {
  const { userStorage: userVisitor } = useAuth() as any;
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug, userVisitorId: userVisitor?.id });

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username: post?.profile?.username, userVisitorId: userVisitor?.id });

  const dataTablePosts = isLoadingPost || isLoadingUser ? (
    <LoadingFile />
  ) : isErrorPost || isErrorUser ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : (
    <>
      {" "}
      {post?.id && user?.id ? (
        <ListFollowPosts
          item={post}
          commentTake={10}
          userVisitor={{
            id: userVisitor?.id,
            organizationId: user?.organizationId,
          }} />
      ) : null}{" "}
    </>
  );

  return (
    <>
      <LayoutDashboard title={post?.title ?? ""}>
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

                <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] rounded-lg">
                  <div className="px-4 py-6 sm:p-6 lg:p-8">
                    <div className="text-center">
                      <AvatarComponent
                        size={{ xs: 50, sm: 50, md: 60, lg: 64, xl: 80, xxl: 100 }}
                        profile={post?.profile}
                      />
                      <p className="mt-4 text-lg font-bold text-black dark:text-white">
                        {post?.profile?.firstName ?? ""} {post?.profile?.lastName ?? ""}{" "}
                      </p>
                      <p className="mt-2 text-sm font-normal text-gray-600 dark:text-gray-300">
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

                <div className="mt-8 overflow-hidden bg-white dark:bg-[#121212] rounded-lg">
                  {post?.id && user?.organizationId ?
                    <PublicLastPosts
                      userVisitor={{
                        id: userVisitor?.id,
                        organizationId: post?.organizationId,
                      }}
                    /> : null}
                </div>

              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PostShow;

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
        ...(await import(`/lang/${locale}.json`)).default,
      }
    }
  }
}