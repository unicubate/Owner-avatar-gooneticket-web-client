import { GetOneUserPublicAPI } from '@/api-site/user';
import { PublicGallery } from '@/components/gallery/public-gallery';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { useAuth } from '@/components/util/context-user';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

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
        title={`Galleries - ${user?.profile?.firstName ?? ''} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-full py-6">
              {/* {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null} */}

              <div className="grid grid-cols-1 gap-6 py-2 sm:mt-12 sm:grid-cols-1 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-3">
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

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
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
