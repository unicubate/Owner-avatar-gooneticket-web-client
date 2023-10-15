import { Button, Image, Spin } from "antd";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiCartAdd, BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import PublicPosts from "@/components/post/public-posts";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import { LoadingOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import PublicShop from "@/components/shop/public-shop";
import { LoadingFile } from "@/components/ui/loading-file";

const ShopUserPublic = () => {
  const userVisiter = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });


  const dataTableProducts = isLoadingUser ? (
    <LoadingFile />
  ) : isErrorUser ? (
    <strong>Error find data please try again...</strong>
  ) : (
    <PublicShop organizationId={user?.organizationId} />
  );

  if (user?.profile?.enableShop === false) {
    push(`${`/${username}`}`);
  }
  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-2 grid mt-2 grid-cols-1 gap-6 sm:gap-6 lg:gap-8 xl:gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">

          {dataTableProducts}

        </div>
      </div>
    </>
  );
};

export default ShopUserPublic;
