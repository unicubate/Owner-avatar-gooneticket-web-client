import { makeApiCall } from '@/api-site/clients';
import { useMutationHandlers } from '@/components/hooks';
import {
  ConversationFormModel,
  ConversationModel,
  MessageFormModel,
} from '@/types/message';
import { SortModel } from '@/utils/paginations';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const CreateOneConversationMessagesAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKeys = ['oconversations-messages'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });

  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (payload: MessageFormModel) => {
      return await makeApiCall({
        action: 'createOneConversationMessage',
        body: { ...payload },
      });
    },

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
  });

  return result;
};

export const ReadOneConversationAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKeys = ['oconversations'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });

  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (payload: { fkConversationId: string }) => {
      const { fkConversationId } = payload;
      return await makeApiCall({
        action: 'readOneConversation',
        urlParams: { fkConversationId },
      });
    },

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
  });

  return result;
};

export const createOneConversationAPI = async (
  body: ConversationFormModel,
): Promise<any> => {
  await makeApiCall({
    action: 'createOneConversation',
    body: body,
  });
};

export const GetInfiniteConversationsAPI = (payload: {
  search: string;
  take: number;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ['conversations', 'infinite', { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getConversations',
        queryParams: { ...payload, page: pageParam },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};

export const GetConversationsMessagesAPI = (payload: {
  take: number;
  fkConversationId: string;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ['conversations-messages', 'infinite', { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getConversationsMessages',
        queryParams: {
          page: pageParam,
          take: payload?.take,
          sort: payload?.sort,
        },
        urlParams: { fkConversationId: payload?.fkConversationId },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};

export const GetOneConversationAPI = (payload: {
  fkConversationId: string;
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['conversation', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneConversation',
        urlParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as ConversationModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};
