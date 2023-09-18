import { Image } from "antd";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/session/context-user";
import { CreateSubscribeStripe } from "@/components/payment/stripe/create-subscribe-stripe";

const TransactionSuccess = () => {
  const { query } = useRouter();
  const username = String(query?.username);




  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  return (
    <>

      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

    success
    </>
  );
};

export default TransactionSuccess;
