import { makeApiCall } from "@/utils/get-url-end-point";
import { useQuery } from "@tanstack/react-query";

export const GetUploadsProductsAPI = (payload: {
  productId?: string;
}) => {
  const { productId } = payload;
  return useQuery({
    queryKey: ["uploads", productId],
    queryFn: async () =>
      await makeApiCall({
        action: "getUploadsProducts",
        queryParams: { productId},
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};

export const getOneFileUploadProductAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/products/${fileName}`
    : null;