import { GetOneUserPublicAPI } from '@/api-site/user';
import { PublicGallery } from '@/components/gallery/public-gallery';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { useRouter } from 'next/router';

const GalleryUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  // if (user?.profile?.enableGallery === false) {
  //   push(`${`/${username}`}`);
  // }
  return (
    <>
      <LayoutUserPublicSite
        title={`Galleries - ${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            {/* {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null} */}

            <div className="grid grid-cols-1 gap-6 py-2 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-3">
              {user?.id ? (
                <PublicGallery
                  userVisitor={{
                    id: userVisiter?.id,
                    organizationId: user?.organizationId,
                  }}
                />
              ) : null}
            </div>

            {/* <div className="grid gap-6 lg:grid-cols-3">
              {user?.id ? (
                <PublicGallery
                  userVisitor={{
                    id: userVisiter?.id,
                    organizationId: user?.organizationId,
                  }}
                />
              ) : null}
            </div> */}
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : null}
    </>
  );
};

export default GalleryUserPublic;
