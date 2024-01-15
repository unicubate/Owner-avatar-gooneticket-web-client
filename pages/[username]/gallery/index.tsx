import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import PublicGallery from "@/components/gallery/public-gallery";
import { LoadingFile } from "@/components/ui/loading-file";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { useAuth } from "@/components/util/context-user";
import { ErrorFile } from "@/components/ui/error-file";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { GetStaticPropsContext } from "next";
import Link from "next/link";

const GalleryUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  if (user?.profile?.enableGallery === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      <LayoutUserPublicSite
        title={`Galleries - ${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""
          }`}
        user={user}
      >
        <div className="mt-4 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-full mx-auto py-6">
              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              {/* <div className="grid grid-cols-1 gap-4 px-8 mt-6 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
                
                <div className="overflow-hidden bg-white dark:bg-black  border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">

                      <div className="flex-1 ml-4">
                        <Link href="/" >
                          <p className="text-base font-bold">Domande</p>
                        </Link>
                        <p className="mt-1 text-sm font-medium text-gray-500">0 Image</p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-1 ml-4">
                        <Link href="/" >
                          <p className="text-base font-bold">Albert Flores</p>
                        </Link>
                        <p className="mt-1 text-sm font-medium text-gray-500">123 Images</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-1 ml-4">
                        <Link href="/" >
                          <p className="text-base font-bold">Case</p>
                        </Link>
                        <p className="mt-1 text-sm font-medium text-gray-500">22 Images</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-1 ml-4">
                        <Link href="/" >
                          <p className="text-base font-bold">Flores</p>
                        </Link>
                        <p className="mt-1 text-sm font-medium text-gray-500">23 Images</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div> */}

              <div className="py-2 grid grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-3 sm:mt-12 sm:grid-cols-1 lg:grid-cols-3">
                {user?.id && user?.profile.enableGallery ? (
                  <PublicGallery
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

export default GalleryUserPublic;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
        ...(await import(`/lang/${locale}/common.json`)).default,
      },
    },
  };
}
