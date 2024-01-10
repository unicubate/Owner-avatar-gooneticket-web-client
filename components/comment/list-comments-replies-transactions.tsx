/* eslint-disable jsx-a11y/anchor-is-valid */
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CommentModel } from "@/types/comment";
import { DeleteOneCommentReplyAPI } from "@/api-site/comment";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { AvatarComponent } from "../ui/avatar-component";
import Link from "next/link";
import { ModelType } from "@/utils/pagination-item";
import { useAuth } from "../util/context-user";
import { useRouter } from "next/router";

type Props = {
  model: ModelType;
  item?: CommentModel;
  index?: number;
  userReceiveId: string;
};

const ListCommentsRepliesTransactions: React.FC<Props> = ({
  item,
  model,
  index,
  userReceiveId,
}) => {
  const { locale } = useRouter();
  const { userStorage: userVisitor } = useAuth() as any;
  const { mutateAsync: saveMutation } = DeleteOneCommentReplyAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes, Deleted",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6f42c1",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation({ commentId: item?.id });
          AlertSuccessNotification({
            text: "Comment deleted successfully",
            className: "info",
            gravity: "top",
            position: "center",
          });
        } catch (error: any) {
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
      <div key={index} className="flex items-start mt-4">
        <AvatarComponent
          size={40}
          profile={item?.profile}
        />

        <div className="ml-3">
          <div className="flex items-center space-x-px">
            <div className="flex items-center">
              <Link
                href={`/${item?.profile?.username}`}
                className="text-sm font-bold"
              >
                {" "}
                {item?.profile?.firstName} {item?.profile?.lastName}{" "}
              </Link>
              <p className="ml-3.5 text-sm font-normal text-gray-500">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </p>

          <div className="flex mt-2 items-center font-medium text-gray-600">

            {userVisitor?.id === item?.userReceiveId ? (
              <>
                <button
                  onClick={() => deleteItem(item)}
                  className="ml-3.5 hover:text-red-400 focus:ring-red-400"
                >
                  <MdOutlineDeleteOutline className="w-5 h-5" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export { ListCommentsRepliesTransactions };
