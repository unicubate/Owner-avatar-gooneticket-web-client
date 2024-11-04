import { CreateOrUpdateOneCommentAPI } from '@/api-site/comment';
import { CommentFormModel } from '@/types/comment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ModelType } from '@/utils/paginations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginModal } from '../auth/login-modal';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput } from '../ui-setting/shadcn';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateOrUpdateFormComment(props: {
  organizationId: string;
  productId?: string;
  postId?: string;
  eventId?: string;
  comment?: any;
  model: ModelType;
  setOpenModal?: any;
  openModal?: boolean;
}) {
  const {
    postId,
    organizationId,
    model,
    eventId,
    productId,
    comment,
    openModal,
    setOpenModal,
  } = props;

  const {
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
    isOpen,
    setIsOpen,
    user,
  } = useInputState();
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
      const fields = ['description', 'postId', 'productId', 'organizationId'];
      fields?.forEach((field: any) => setValue(field, comment[field]));
    }
  }, [comment, postId, productId, organizationId, setValue]);

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
        model: model,
        eventId: eventId ?? '',
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
        description: 'Comment save successfully',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        description: `${error?.response?.data?.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-auto relative mt-4 flex w-full">
          {/* <div className="flex items-start px-1.5">
            <AvatarComponent
              size={40}
              className="size-10 shrink-0 rounded-full bg-gray-300"
              profile={user?.profile}
            />
          </div> */}

          <TextAreaInput
            control={control}
            name="description"
            placeholder="Write your message"
            errors={errors}
          />

          <div className="flex justify-between space-x-2">
            {openModal ? (
              <ButtonInput
                type="button"
                variant="secondary"
                size="default"
                className="!absolute right-20 top-1 rounded"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </ButtonInput>
            ) : null}

            {user?.id ? (
              <>
                <ButtonInput
                  type="submit"
                  variant="primary"
                  size="default"
                  className="!absolute right-1 top-1 rounded"
                  loading={loading}
                  disabled={watchDescription.length >= 12 ? false : true}
                >
                  Save
                </ButtonInput>
              </>
            ) : (
              <ButtonInput
                onClick={() => {
                  setIsOpen(true);
                }}
                type="button"
                variant="primary"
                size="default"
                className="!absolute right-1 top-1 rounded"
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
}
