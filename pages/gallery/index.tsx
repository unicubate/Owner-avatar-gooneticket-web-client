import { TableAlbum } from '@/components/gallery/table-album';
import { TableGallery } from '@/components/gallery/table-gallery';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';

const Gallery = () => {
  const { organizationId, profile, userStorage: user } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={'Gallery'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* {profile?.id ? <EnableGallery profile={profile} /> : null} */}

            <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:gap-12">
              {organizationId ? (
                <TableAlbum userVisitor={{ id: user?.id, organizationId }} />
              ) : null}
            </div>

            <div className="flow-root">
              <TableGallery userVisitor={{ id: user?.id, organizationId }} />
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Gallery);
