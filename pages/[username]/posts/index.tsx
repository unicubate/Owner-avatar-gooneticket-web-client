import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { PublicPosts } from "@/components/post/public-posts";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { useAuth } from "@/components/util/context-user";
import { ErrorFile } from "@/components/ui/error-file";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { GetStaticPropsContext } from "next";

const PostsUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`Posts - ${user?.profile?.firstName ?? ""} ${
          user?.profile?.lastName ?? ""
        }`}
        user={user}
      >
        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto py-6">
              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    {user?.id ? (
                      <PublicPosts
                        userVisitor={{
                          id: userVisiter?.id,
                          organizationId: user?.organizationId,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === "pending" ? <LoadingFile /> : null}

      {status === "error" ? (
        <ErrorFile
          status="error"
          title="404"
          description="Error find data please try again"
        />
      ) : null}
    </>
  );
};

export default PostsUserPublic;

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