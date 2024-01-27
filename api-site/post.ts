import {
  GetOnPostQueryModel,
  PostFormModel,
  PostModel,
  PostType,
  ResponsePostModel,
} from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { RcFile } from 'antd/es/upload/interface';

export const CreateOrUpdateOnePostGalleryAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['gallery-posts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: PostFormModel & { postId?: string },
    ): Promise<any> => {
      const { postId, newImageLists } = payload;
      let data = new FormData();
      data.append('title', payload.title ?? '');
      data.append('description', payload.description ?? '');
      data.append('whoCanSee', `${payload.whoCanSee}`);
      data.append('type', payload.type ?? '');
      data.append('albumId', payload.albumId ?? '');
      data.append('categoryId', payload.categoryId ?? '');
      data.append('allowDownload', `${payload.allowDownload}`);

      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append('attachmentFiles', file?.originFileObj as RcFile);
        });

      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append('attachmentImages', file?.originFileObj as RcFile);
        });

      if (postId) {
        const result = await makeApiCall({
          action: 'updateOneUpload',
          body: { newImageLists },
          queryParams: { uploadableId: postId, model: 'POST' },
        });

        if (result) {
          await makeApiCall({
            action: 'updateOnePost',
            body: data,
            urlParams: { postId },
          });
        }

        return 'ok';
      } else {
        return await makeApiCall({
          action: 'createOnePostGallery',
          body: data,
        });
      }
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

export const CreateOrUpdateOnePostAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['posts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: PostFormModel & { postId?: string },
    ): Promise<any> => {
      const { postId, newImageLists, newFileLists } = payload;
      let data = new FormData();
      data.append('type', `${payload.type ?? ''}`);
      data.append('title', `${payload.title ?? ''}`);
      data.append('whoCanSee', `${payload.whoCanSee}`);
      data.append('urlMedia', `${payload.urlMedia ?? ''}`);
      data.append('categoryId', `${payload.categoryId ?? ''}`);
      data.append('albumId', `${payload.albumId ?? ''}`);
      data.append('allowDownload', `${payload.allowDownload ?? ''}`);
      data.append('enableUrlMedia', `${payload.enableUrlMedia}`);
      data.append('description', `${payload.description ?? ''}`);

      payload?.fileList?.length > 0 &&
        payload?.fileList?.forEach((file: any) => {
          data.append('attachmentFiles', file?.originFileObj as RcFile);
        });

      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append('attachmentImages', file?.originFileObj as RcFile);
        });

      if (postId) {
        const result = await makeApiCall({
          action: 'updateOneUpload',
          body: { newImageLists, newFileLists },
          queryParams: { uploadableId: postId, model: 'POST' },
        });

        if (result) {
          await makeApiCall({
            action: 'updateOnePost',
            body: data,
            urlParams: { postId },
          });
        }

        return 'Ok';
      } else {
        return await makeApiCall({
          action: 'createOnePost',
          body: data,
        });
      }
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

export const DeleteOnePostAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['posts'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { postId: string }) => {
      const { postId } = payload;
      return await makeApiCall({
        action: 'deleteOnePost',
        urlParams: { postId },
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

export const getCategoriesAPI = async (payload?: {
  organizationId: string;
}): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getCategories',
    queryParams: payload,
  });
};

export const createOnUploadPostAPI = async (
  payload: any,
): Promise<{ data: { urlFile: string } }> => {
  return await makeApiCall({
    action: 'createOnUploadPost',
    body: payload,
  });
};

export const getOnePostAPI = async (
  payload: GetOnPostQueryModel,
): Promise<{ data: PostModel }> => {
  return await makeApiCall({
    action: 'getOnePost',
    queryParams: payload,
  });
};

export const GetOnePostAPI = (payload: GetOnPostQueryModel) => {
  const { data, isError, isLoading, status, refetch } = useQuery({
    queryKey: ['post', { ...payload }],
    queryFn: async () => await getOnePostAPI({ ...payload }),
    enabled: !!payload,
    refetchOnWindowFocus: true,
  });

  return { data: data?.data as PostModel, isError, isLoading, status, refetch };
};

export const getPostsAPI = async (
  payload: {
    albumId?: string;
    userVisitorId?: string;
    type?: PostType;
    status?: string;
    typeIds?: string[];
  } & PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getPosts',
    queryParams: payload,
  });
};

export const GetInfinitePostsAPI = (payload: {
  albumId?: string;
  userVisitor: UserVisitorModel;
  take: number;
  status?: string;
  sort: SortModel;
  type?: PostType;
  typeIds?: string[];
  queryKey: string[];
  search?: string;
}) => {
  const {
    userVisitor,
    albumId,
    take,
    sort,
    status,
    type,
    typeIds,
    search,
    queryKey,
  } = payload;
  return useInfiniteQuery({
    queryKey: [...queryKey, { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getPostsAPI({
        userVisitorId: userVisitor?.id,
        organizationId: userVisitor?.organizationId,
        take,
        sort,
        type,
        typeIds,
        albumId,
        search,
        status: status?.toUpperCase(),
        page: Number(pageParam),
      }),
    staleTime: 60_000,
    initialPageParam: 1,
  });
};

export const getFollowsPostsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getFollowsPosts',
    queryParams: payload,
  });
};

export const GetInfiniteFollowsPostsAPI = (payload: {
  take: number;
  sort: SortModel;
}) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ['posts-follows', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getFollowsPostsAPI({
        take: take,
        page: Number(pageParam),
        sort: sort,
      }),
    initialPageParam: 1,
  });
};
