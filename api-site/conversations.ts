import {
  ConversationFormModel,
  ConversationModel,
  MessageFormModel,
} from '@/types/message';
import { makeApiCall } from '@/utils/end-point';
import { SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const CreateOneConversationMessagesAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['conversations-messages'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: MessageFormModel) => {
      return await makeApiCall({
        action: 'createOneConversationMessage',
        body: { ...payload },
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
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
        queryParams: { ...payload, page: pageParam },
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
    staleTime: 60_000,
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
