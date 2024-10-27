import { createOneConversationAPI } from '@/api-site/conversations';
import { ConversationFormModel } from '@/types/message';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  description: yup.string().required(),
});

export function CreateConversationsModal(props: {
  isOpen: boolean;
  setIsOpen: any;
  user: any;
}) {
  const { isOpen, setIsOpen, user } = props;
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

  const onSubmit: SubmitHandler<ConversationFormModel> = async (
    payload: ConversationFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await createOneConversationAPI({
        ...payload,
        organizationToId: user?.organizationId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        description: 'Message send successfully',
      });
      reset();
      setIsOpen(false);
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
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg  dark:bg-background">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <X />
              </span>
            </button>

            <div className="mx-auto flex">
              <h6 className="mt-3 text-xl font-bold">{`${user?.organization?.name}`}</h6>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <Alert variant="destructive" className="mb-4 bg-red-600">
                  <AlertDescription className="text-white">
                    {hasErrors}
                  </AlertDescription>
                </Alert>
              )}

              <div className="max-w-auto relative flex w-full">
                <TextAreaInput
                  control={control}
                  name="description"
                  placeholder="Write your message"
                  errors={errors}
                />
                <ButtonInput
                  type="submit"
                  variant="primary"
                  size="default"
                  className="!absolute right-1 top-1 rounded"
                  loading={loading}
                  disabled={watchDescription.length >= 12 ? false : true}
                >
                  Send
                </ButtonInput>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
