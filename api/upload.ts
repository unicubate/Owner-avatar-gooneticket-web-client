import { makeApiCall } from "@/utils/get-url-end-point";
import { useQuery } from "@tanstack/react-query";

export const GetUploadsAPI = (payload: {
  productId?: string;
  commissionId?: string;
  uploadType?: "image" | "file";
}) => {
  return useQuery({
    queryKey: ["uploads", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getUploads",
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });
};

export const getOneFileUploadProductAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/products/${fileName}`
    : null;

export const downloadOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: "posts" | "galleries" | "products";
}) =>
  fileName && folder
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/download/${folder}/${fileName}`
    : null;
