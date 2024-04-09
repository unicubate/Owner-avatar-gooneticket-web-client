import { CreateOneConversationMessagesAPI } from '@/api-site/conversations';
import { ConversationModel, MessageFormModel } from '@/types/message';
import { AlertDangerNotification } from '@/utils';
import { ModelType } from '@/utils/paginations';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, TextareaReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant';

const schema = yup.object({
  description: yup.string().max(1000).required(),
});

export function CreateFormMessages(props: {
  conversation: ConversationModel;
  model: ModelType;
  chatContainerRef: any;
}) {
  const { conversation, chatContainerRef, model } = props;

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

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOneConversationMessagesAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error?.response?.data?.message);
    },
  });

  const onSubmit: SubmitHandler<MessageFormModel> = async (
    payload: MessageFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        fkConversationId: conversation?.fkConversationId,
        model: model,
      });
      reset();
      setHasErrors(false);
      setLoading(false);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
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
        <div className="relative flex w-full max-w-auto">
          <TextareaReactQuillInput
            control={control}
            name="description"
            placeholder="Write your message"
            errors={errors}
            className="h-auto"
          />
          <ButtonInput
            type="submit"
            variant="info"
            size="default"
            className="!absolute right-1 top-1 rounded"
            loading={loading}
            disabled={watchDescription.length >= 12 ? false : true}
          >
            Send
          </ButtonInput>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold dark:text-white">Send email</p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  send email to {conversation?.profile?.firstName}{' '}
                  {conversation?.profile?.lastName}
                </p>
              </div>
            </div>

            <SwitchInput
              control={control}
              defaultValue={true}
              name="enableSendEmail"
              label=""
            />
          </div>
        </div>
      </form>
    </>
  );
}
