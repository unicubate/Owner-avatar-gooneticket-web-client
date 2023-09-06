import { Spin } from "antd";
import { GetOneUserPublicAPI } from "@/api/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/session/context-user";
import { LoadingOutlined } from "@ant-design/icons";
import PublicGallery from "@/components/gallery/public-gallery";

const GalleryUserPublic = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  const dataTablePosts = isLoadingUser ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <PublicGallery userId={user?.id} />
  );

  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

     

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">

          {dataTablePosts}

        </div>
      </div>

    </>
  );
};

export default GalleryUserPublic;
