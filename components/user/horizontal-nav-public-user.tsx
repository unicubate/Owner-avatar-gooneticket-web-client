import React from "react";
import { AvatarComponent } from "../ui/avatar-component";
import { UserModel } from "@/types/user.type";
import { useTranslations } from "next-intl";

const HorizontalNavPublicUser: React.FC<{ user: UserModel }> = ({ user }) => {
  const t = useTranslations();

  return (
    <>
      <div className="text-center">
        <AvatarComponent
          size={{ xs: 50, sm: 50, md: 60, lg: 64, xl: 80, xxl: 100 }}
          profile={user?.profile}
        />

        <p className="mt-6 text-lg font-bold text-black dark:text-white">
          {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}{" "}
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500">
          <span>
            {user?.totalFollower ?? 0} {t("followers")}
          </span>
          <span className="ml-2">
            {user?.totalFollowing ?? 0} {t("followings")}
          </span>
        </p>

        {user?.totalSubscribe > 0 ? (
          <p className="mt-2 text-sm font-medium text-gray-500">
            {user?.totalSubscribe} {t("subscribes")}
          </p>
        ) : null}
      </div>
    </>
  );
};

export { HorizontalNavPublicUser };
