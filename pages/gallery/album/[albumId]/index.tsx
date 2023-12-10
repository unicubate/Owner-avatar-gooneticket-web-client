import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { useAuth } from "@/components/util/context-user";
import { EnableGallery } from "@/components/gallery/enable-gallery";
import { TableGallery } from "@/components/gallery/table-gallery";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { TableAlbum } from "@/components/gallery/table-album";
import { useRouter } from "next/router";

const Albums = () => {
  const { organizationId, profile, userStorage: user } = useAuth() as any;
  const { query, push } = useRouter();
  const albumId = String(query?.albumId);

  return (
    <>
      <LayoutDashboard title={"Albums"}>
        <div className="max-w-6xl mx-auto py-6">
          <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
            <div className="flow-root">

              {organizationId && albumId ? (
                <TableGallery
                  albumId={albumId}
                  userVisitor={{ id: user?.id, organizationId }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Albums);

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
      },
    },
  };
}