import { makeApiCall } from "@/utils/get-url-end-point";
import { useQuery } from "@tanstack/react-query";

export const GetUploadsProductsAPI = (payload: {
  productId?: string;
  uploadType?: "image" | "file";
}) => {
  const { productId, uploadType } = payload;
  return useQuery({
    queryKey: ["uploads", productId, uploadType],
    queryFn: async () =>
      await makeApiCall({
        action: "getUploadsProducts",
        queryParams: { productId, uploadType },
      }),
    refetchOnWindowFocus: false,
  });
};

export const getOneFileUploadProductAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/products/${fileName}`
    : null;
