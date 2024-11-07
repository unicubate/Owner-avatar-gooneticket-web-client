import { CreateOrUpdateOneCommentReplyAPI } from '@/api-site/comment';
import { CommentFormModel } from '@/types/comment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ModelType } from '@/utils/paginations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput } from '../ui-setting/shadcn';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateOrUpdateFormCommentReply(props: {
  parentId: string;
  comment?: any;
  model: ModelType;
  setOpenModalReply?: any;
  openModalReply?: boolean;
  organizationId: string;
}) {
  const {
    parentId,
    organizationId,
    model,
    comment,
    openModalReply,
    setOpenModalReply,
  } = props;

  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();
  const {
    reset,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const watchDescription = watch('description', '');

  useEffect(() => {
    if (comment) {
      const fields = ['description', 'commentId'];
      fields?.forEach((field: any) => setValue(field, comment[field]));
    }
  }, [comment, parentId, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneCommentReplyAPI({
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
    payload: CommentFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        model: model,
        commentId: comment?.id,
        parentId: parentId,
        organizationId: organizationId,
      });

      setOpenModalReply(false);
      reset();

      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        description: 'Comment save successfully',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 space-y-2 sm:flex sm:items-end sm:space-x-4 sm:space-y-0">
          {/* <div className="flex items-start">
            <Avatar
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
              src="https://picsum.photos/seed/NLHCIy/640/480"
              alt=""
            />
          </div> */}
          <TextAreaInput
            control={control}
            name="description"
            placeholder="Reply to conversation"
            errors={errors}
          />

          {openModalReply ? (
            <div className="flex items-center justify-between">
              <ButtonInput
                type="button"
                variant="outline"
                onClick={() => {
                  setOpenModalReply(false);
                }}
                className="w-full"
              >
                Cancel
              </ButtonInput>
            </div>
          ) : null}

          <div className="flex-col sm:flex sm:items-end sm:justify-between">
            <ButtonInput
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
              disabled={watchDescription.length >= 12 ? false : true}
            >
              Save
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
}
