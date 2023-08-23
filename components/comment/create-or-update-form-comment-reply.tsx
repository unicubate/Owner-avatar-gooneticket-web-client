import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonInput } from "../templates/button-input";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { Avatar, Button, Upload } from "antd";
import { CommentFormModel } from "@/types/comment";
import { CreateOrUpdateOneCommentAPI, CreateOrUpdateOneCommentReplyAPI } from "@/api/comment";
import { TextAreaInput } from "../util/form";
import { useAuth } from "../util/session/context-user";

const schema = yup.object({
  description: yup.string().required(),
});

const CreateOrUpdateFormCommentReply: React.FC<{
  parentId: string;
  comment?: any;
  setOpenModalReply?: any
  openModalReply?: boolean
}> = ({ parentId, comment, openModalReply, setOpenModalReply }) => {
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
  const watchDescription = watch('description', '');

  useEffect(() => {
    if (comment) {
      const fields = ["description", "commentId"];
      fields?.forEach((field: any) => setValue(field, comment[field]));
    }
  }, [comment, parentId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOneCommentReplyAPI({
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
        commentId: comment?.id,
        parentId: parentId
      });

      setOpenModalReply(false)
      reset();

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
        <div className="mt-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end">
          <div className="flex items-start">
            <Avatar
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
              src="https://picsum.photos/seed/NLHCIy/640/480"
              alt=""
            />
          </div>
          <TextAreaInput
            row={1}
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
          />

          {openModalReply ?
            <div className="flex justify-between items-center">
              <ButtonInput
                shape="default"
                type="button"
                size="large"
                onClick={() => setOpenModalReply(false)}
                loading={false}
                color={"gray"}
              >
                Cancel
              </ButtonInput>
            </div>
            : null}

          {watchDescription.length > 0 && (

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

export { CreateOrUpdateFormCommentReply };
