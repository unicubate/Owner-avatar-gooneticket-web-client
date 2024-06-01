import { ModelType } from '@/utils';
import { makeApiCall } from '@/utils/clients';
import { useQuery } from '@tanstack/react-query';

export const GetUploadsAPI = (payload: {
  organizationId?: string;
  model: ModelType;
  uploadableId: string;
  uploadType?: 'image' | 'file';
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['uploads', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getUploads',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data, isError, isLoading, status, isPending, refetch };
};

export const viewOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: string;
}) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/${folder}/${fileName}`
    : null;

export const downloadOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: string;
}) =>
  fileName && folder
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/download/${folder}/${fileName}`
    : null;
