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
