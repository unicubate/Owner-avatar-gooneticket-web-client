import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonInput } from "../templates/button-input";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { Avatar, Button, Upload } from "antd";
import { CommentFormModel } from "@/types/comment";
import { CreateOrUpdateOneCommentAPI } from "@/api/comment";
import { TextAreaInput } from "../util/form";
import { useAuth } from "../util/session/context-user";
import { ButtonCancelInput } from "../templates/button-cancel-input";

const schema = yup.object({
  description: yup.string().required(),
});

const CreateOrUpdateFormComment: React.FC<{
  postId: string;
  comment?: any;
  setOpenModal?: any;
  openModal?: boolean;
}> = ({ postId, comment, openModal, setOpenModal }) => {
  const user = useAuth() as any;
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
  const saveMutation = CreateOrUpdateOneCommentAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<CommentFormModel> = async (
    payload: CommentFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        postId: postId,
        commentId: comment?.id,
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
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end">
          <div className="flex items-start">
            <Avatar
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-8 h-10"
              src={user?.profile?.image}
              alt=""
            />
          </div>
          <TextAreaInput
            row={1}
            required={true}
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
          />

          {openModal ? (
            <div className="flex justify-between items-center">
              <ButtonCancelInput
                shape="default"
                size="large"
                onClick={() => setOpenModal(false)}
                loading={false}
              >
                Cancel
              </ButtonCancelInput>
            </div>
          ) : null}

          {watchDescription.length >= 1 && (
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
