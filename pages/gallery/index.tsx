import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useAuth } from "@/components/util/context-user";
import { EnableGallery } from "@/components/gallery/enable-gallery";
import { TableGallery } from "@/components/gallery/table-gallery";

const Gallery = () => {
  const { organizationId, profile, userStorage: userVisiter } = useAuth() as any;

  return (
    <>
      <LayoutDashboard title={"Gallery"}>


        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

                {profile?.id ? <EnableGallery profile={profile} /> : null}
                {/* <HorizontalNavDonation /> */}

                <div className="flow-root">

                  {organizationId ? <TableGallery userVisitor={{ id: userVisiter?.id, organizationId }} /> : null}

                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Gallery);
