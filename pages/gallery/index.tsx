import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useAuth } from '@/components/util/context-user';
import { EnableGallery } from '@/components/gallery/enable-gallery';
import { TableGallery } from '@/components/gallery/table-gallery';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { TableAlbum } from '@/components/gallery/table-album';

const Gallery = () => {
  const { organizationId, profile, userStorage: user } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Gallery'}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
            {profile?.id ? <EnableGallery profile={profile} /> : null}
            {/* <HorizontalNavDonation /> */}

            <div className="flow-root">
              <div className="grid grid-cols-1 gap-4 px-8 mt-6 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
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
