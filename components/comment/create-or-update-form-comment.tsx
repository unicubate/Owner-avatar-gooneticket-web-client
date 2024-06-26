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
import { ButtonInput, TextareaReactQuillInput } from '../ui-setting';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateOrUpdateFormComment(props: {
  organizationId: string;
  productId?: string;
  postId?: string;
  comment?: any;
  model: ModelType;
  setOpenModal?: any;
  openModal?: boolean;
}) {
  const {
    postId,
    organizationId,
    model,
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
    userStorage,
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
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error?.response?.data?.message);
      AlertDangerNotification({
        text: `${error?.response?.data?.message}`,
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
              profile={''}
            />
          </div> */}
          <TextareaReactQuillInput
            control={control}
            name="description"
            placeholder="Participate in the conversation"
            errors={errors}
            className="h-auto"
          />
          <div className="flex justify-between space-x-2">
            {openModal ? (
              <ButtonInput
                type="button"
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </ButtonInput>
            ) : null}

            {userStorage?.id ? (
              <>
                <ButtonInput
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full"
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
                size="lg"
                variant="primary"
                className="w-full"
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
