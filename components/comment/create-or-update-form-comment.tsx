import { CreateOrUpdateOneCommentAPI } from '@/api-site/comment';
import { CommentFormModel } from '@/types/comment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ModelType } from '@/utils/pagination-item';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { LoginModal } from '../auth-modal/login-modal';
import { useDialog } from '../hooks/use-dialog';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, TextareaReactQuillInput } from '../ui-setting';

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
  const { isOpen, setIsOpen, userStorage } = useDialog();
  const {
    reset,
    setValue,
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const watchDescription = watch('description', '');

  useEffect(() => {
    if (comment) {
      const fields = ['description', 'postId'];
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
    payload: CommentFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        model: model ?? '',
        postId: postId ?? '',
        productId: productId ?? '',
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
        text: 'Comment save successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        text: `${error?.response?.data?.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
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
              className="flex-shrink-0 bg-gray-300 rounded-full w-8 h-10"
              src={user?.profile?.image}
              alt=""
            />
            <AvatarComponent
              size={40}
              className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10"
              profile={profile?.profile}
            />
          </div> */}
          <TextareaReactQuillInput
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
            className="h-auto"
          />

          {openModal ? (
            <div className="flex items-center justify-between">
              <ButtonInput
                type="button"
                size="lg"
                variant="outline"
                loading={loading}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </ButtonInput>
            </div>
          ) : null}

          <div className="flex-col sm:flex sm:items-end sm:justify-between">
            {userStorage?.id ? (
              <>
                {watchDescription.length >= 7 && (
                  <ButtonInput
                    type="submit"
                    size="lg"
                    variant="info"
                    loading={loading}
                  >
                    Save
                  </ButtonInput>
                )}
              </>
            ) : (
              <ButtonInput
                onClick={() => {
                  setIsOpen(true);
                }}
                type="submit"
                size="lg"
                variant="info"
                loading={loading}
              >
                Save
              </ButtonInput>
            )}
          </div>
        </div>
      </form>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export { CreateOrUpdateFormComment };
