/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import { Avatar } from "antd";
import { ButtonInput } from "../ui/button-input";
import { FollowModel } from "@/types/follow";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrDeleteOneFollowerAPI } from "@/api-site/follow";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import { AvatarComponent } from "../ui/avatar-component";

type Props = {
  item?: FollowModel;
  index: number;
};

const ListFollowings: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  // Create or Update data
  const saveMutation = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followerItem = async (item: any) => {
    Swal.fire({
      title: "Unfollowing?",
      text: `Are you sure you want to unfollow ${item?.profile?.firstName ?? ""
        } ${item?.profile?.lastName ?? ""}`,
      confirmButtonText: "Yes, Unfollow",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6f42c1",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        setLoading(true);
        setHasErrors(undefined);
        try {
          await saveMutation.mutateAsync({
            followerId: item?.profile?.userId,
            action: "DELETE",
          });
          setHasErrors(false);
          setLoading(false);
          AlertSuccessNotification({
            text: "Unfollowing successfully",
            className: "info",
            gravity: "top",
            position: "center",
          });
        } catch (error: any) {
          setHasErrors(true);
          setLoading(false);
          setHasErrors(error.response.data.message);
          AlertDangerNotification({
            text: `${error.response.data.message}`,
            gravity: "top",
            className: "info",
            position: "center",
          });
        }
      }
    });
  };

  return (
    <>
      <Fragment key={index}>
        <div className="py-5">
          <div className="flex items-center">
            <div
              onClick={() => router.push(`/${item?.profile?.username}`)}
              className="relative flex-shrink-0 cursor-pointer"
            >
              <AvatarComponent
                size={40}
                profile={item?.profile}
              />
            </div>

            <Link
              href={`/${item?.profile?.username}`}
              className="flex-1 min-w-0 ml-4 cursor-pointer"
            >
              <p className="text-sm font-bold dark:text-white">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {item?.profile?.username}
              </p>
            </Link>

            <div className="flex items-center justify-end ml-auto space-x-8">
              <ButtonInput
                shape="default"
                type="submit"
                size="normal"
                loading={loading}
                color={"indigo"}
                onClick={() => followerItem(item)}
              >
                Follow
              </ButtonInput>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ListFollowings;
