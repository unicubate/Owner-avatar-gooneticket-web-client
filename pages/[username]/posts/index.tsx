import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import {PublicPosts} from "@/components/post/public-posts";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import PublicListLastPosts from '@/components/post/public-last-posts';
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";

const PostsUserPublic = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });


  const dataTablePosts = isLoadingUser ? (
    <LoadingFile />
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <PublicPosts organizationId={user?.organizationId} />
  );

  return (
    <>

      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`}
        user={user}>

        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
            <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
              <div className="flow-root">
                <div className="mt-4 mx-auto sm:px-6 md:px-8">
                  {dataTablePosts}
                </div>
              </div>
            </div>

            {user?.id ? <PublicListLastPosts organizationId={user?.organizationId} /> : null}
          </div>
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default PostsUserPublic;
