import { makeApiCall } from '@/api-site/clients';
import { ContactUsFormModel } from '@/types/contact-us';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const CreateContactAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['contacts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: ContactUsFormModel): Promise<any> => {
      let data = new FormData();
      data.append('subject', payload.subject ?? '');
      data.append('fullName', payload.fullName ?? '');
      data.append('phone', `${payload.phone}`);
      data.append('email', payload.email ?? '');
      data.append('description', payload.description ?? '');

      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append('attachmentFiles', file?.originFileObj);
        });

      return await makeApiCall({
        action: 'createOneContact',
        body: data,
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
