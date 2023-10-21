import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import PublicGallery from "@/components/gallery/public-gallery";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";

const GalleryUserPublic = () => {
  const { query, push } = useRouter();
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
    <> {user?.id ? <PublicGallery organizationId={user?.organizationId} /> : null} </>
  );

  if (user?.profile?.enableGallery === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""}`}
        user={user}>

        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}


          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              <div className="py-2 grid grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">

                {dataTablePosts}

              </div>
            </div>
          </div>
        </div>

      </LayoutUserPublicSite>
    </>
  );
};

export default GalleryUserPublic;
