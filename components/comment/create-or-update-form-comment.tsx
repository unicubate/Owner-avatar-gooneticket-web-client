import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CommentFormModel } from "@/types/comment";
import { CreateOrUpdateOneCommentAPI } from "@/api-site/comment";
import { useAuth } from "../util/context-user";
import { ButtonInput, TextareaReactQuillInput } from "../ui";
import { Avatar } from "antd";
import { AvatarComponent } from "../ui/avatar-component";
import { ModelType } from "@/utils/pagination-item";

const schema = yup.object({
  description: yup.string().min(7).required(),
});

const CreateOrUpdateFormComment: React.FC<{
  organizationId: string;
  productId?: string;
  postId?: string;
  comment?: any;
  model: ModelType;
  setOpenModal?: any;
  openModal?: boolean;
}> = ({
  postId,
  organizationId,
  model,
  productId,
  comment,
  openModal,
  setOpenModal,
}) => {
  const { profile } = useAuth() as any;
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchDescription = watch("description", "");

  useEffect(() => {
    if (comment) {
      const fields = ["description", "postId"];
      fields?.forEach((field: any) => setValue(field, comment[field]));
    }
  }, [comment, postId, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneCommentAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error?.response?.data?.message);
    },
  });

  const onSubmit: SubmitHandler<CommentFormModel> = async (
    payload: CommentFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        model: model ?? "",
        postId: postId ?? "",
        productId: productId ?? "",
        commentId: comment?.id,
        organizationId: organizationId,
      });
      if (comment) {
        setOpenModal((lk: boolean) => !lk);
      } else {
        reset();
      }
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Comment save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        text: `${error?.response?.data?.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end">
          <div className="flex items-start">
            {/* <Avatar
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-8 h-10"
              src={user?.profile?.image}
              alt=""
            /> */}
            {/* <AvatarComponent
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
              profile={profile?.profile}
            /> */}
          </div>
          <TextareaReactQuillInput
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
            className="h-auto"
          />

          {openModal ? (
            <div className="flex justify-between items-center">
              <ButtonInput
                status="cancel"
                type="button"
                shape="default"
                size="normal"
                onClick={() => setOpenModal(false)}
                loading={false}
              >
                Cancel
              </ButtonInput>
            </div>
          ) : null}

          {watchDescription.length >= 7 && (
            <div className="sm:flex flex-col sm:items-end sm:justify-between">
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color={"indigo"}
              >
                Save
              </ButtonInput>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormComment };
