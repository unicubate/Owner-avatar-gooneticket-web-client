import { EnableGallery } from '@/components/gallery/enable-gallery';
import { TableAlbum } from '@/components/gallery/table-album';
import { TableGallery } from '@/components/gallery/table-gallery';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';

const Gallery = () => {
  const { organizationId, profile, userStorage: user } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Gallery'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {profile?.id ? <EnableGallery profile={profile} /> : null}
            {/* <HorizontalNavDonation /> */}

            <div className="flow-root">
              <div className="mt-6 grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
                {organizationId ? (
                  <TableAlbum userVisitor={{ id: user?.id, organizationId }} />
                ) : null}
              </div>

              {organizationId ? (
                <TableGallery userVisitor={{ id: user?.id, organizationId }} />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Gallery);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
