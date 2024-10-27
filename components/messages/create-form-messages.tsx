import { CreateOneConversationMessagesAPI } from '@/api-site/conversations';
import { ButtonInput } from '@/components/ui-setting';
import { SwitchInput, TextAreaInput } from '@/components/ui-setting/shadcn';
import { ConversationModel, MessageFormModel } from '@/types/message';
import { AlertDangerNotification } from '@/utils';
import { ModelType } from '@/utils/paginations';
import { yupResolver } from '@hookform/resolvers/yup';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';

const schema = yup.object({
  description: yup.string().required(),
});

export function CreateFormMessages(props: {
  conversation: ConversationModel;
  model: ModelType;
  chatContainerRef: any;
}) {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const { conversation, chatContainerRef, model } = props;

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

  const handleEmoji = () => {};
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
        description: `${error?.response?.data?.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-auto relative flex w-full">
          <TextAreaInput
            control={control}
            name="description"
            placeholder="Write your message"
            errors={errors}
          />
          <EmojiPicker open={isOpenEmoji} onEmojiClick={handleEmoji} />
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

            <SwitchInput control={control} name="enableSendEmail" label="" />
          </div>
        </div>
      </form>
    </>
  );
}
