import React from "react";
import { AvatarComponent } from "../ui/avatar-component";
import { UserModel } from "@/types/user.type";

const HorizontalNavPublicUser: React.FC<{ user: UserModel }> = ({ user }) => {

  return (
    <>
      <div className="text-center">
        <AvatarComponent
          size={{ xs: 50, sm: 50, md: 60, lg: 64, xl: 80, xxl: 100 }}
          profile={user?.profile}
        />

        <p className="mt-6 text-lg font-semibold text-black">
          {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}{" "}
        </p>
        <p className="mt-2 text-sm font-normal">
          <span>{user?.totalFollower ?? 0} Follower</span>
          <span className="ml-2">{user?.totalFollowing ?? 0} Following</span>
        </p>

        {user?.totalSubscribe > 0 ? (
          <p className="mt-2 text-sm font-normal">
            {user?.totalSubscribe}{" "}
            {user?.totalSubscribe > 1 ? "supporters" : "supporter"}
          </p>
        ) : null}

      </div>
    </>
  );
};

export { HorizontalNavPublicUser };
