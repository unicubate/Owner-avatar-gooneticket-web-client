import { CreateOrUpdateOneCommentAPI } from '@/api-site/comment';
import { CommentFormModel } from '@/types/comment';
import { ProductModel } from '@/types/product';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateCommentCommissionModal(props: {
  isOpen: boolean;
  setIsOpen: any;
  product: ProductModel;
  comment?: any;
  parentId?: string;
}) {
  const { isOpen, setIsOpen, product, comment, parentId } = props;
  const {
    watch,
    reset,
    setValue,
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
      const fields = ['description', 'productId'];
      fields?.forEach((field: any) => setValue(field, comment[field]));
    }
  }, [comment, parentId, setValue]);

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
        model: 'COMMISSION',
        commentId: comment?.id,
        productId: product?.id,
        organizationId: product?.organizationId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Message send successfully',
      });
      reset();
      setIsOpen(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };
  return (
    <>
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <X />
              </span>
            </button>

            <div className="mx-auto flex">
              <h6 className="mt-3 text-xl font-bold">{`Ask me about: ${product.title}`}</h6>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-600 text-center"
                >
                  <ExclamationTriangleIcon className="size-4" />
                  <AlertTitle className="text-white">Error</AlertTitle>
                  <AlertDescription className="text-white">
                    {hasErrors}
                  </AlertDescription>
                </Alert>
              )}

              <div className="mt-2">
                <TextAreaInput
                  control={control}
                  name="description"
                  placeholder="Write a message"
                  errors={errors}
                />
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </ButtonInput>

                <ButtonInput
                  type="submit"
                  className="w-full"
                  size="lg"
                  variant="info"
                  disabled={loading}
                  loading={loading}
                >
                  Send Message
                </ButtonInput>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
