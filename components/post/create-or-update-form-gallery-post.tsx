import * as yup from "yup";
import { Controller, SubmitHandler } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonInput } from "../ui/button-input";
import { Alert, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { SelectSearchInput } from "../ui/select-search-input";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import { CreateOrUpdateOnePostGalleryAPI } from "@/api-site/post";
import { filterImageAndFile } from "@/utils/utils";
import { useRouter } from "next/router";
import { ListCarouselUpload } from "../shop/list-carousel-upload";
import {
  SwitchInput,
  TextInput,
  TextareaReactQuillInput,
} from "../ui";
import { GetAllMembershipsAPI } from "@/api-site/membership";
import { useReactHookForm } from "../hooks/use-react-hook-form";

const schema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  whoCanSee: yup.string().required("who can see is a required field"),
  allowDownload: yup.string().optional(),
});

type Props = {
  postId?: string;
  uploadImages?: any;
  post?: any;
  theme: string;
  organizationId: string;
};

const CreateOrUpdateFormGalleryPost: React.FC<Props> = ({
  uploadImages,
  post,
  organizationId,
  postId,
  theme,
}) => {
  const router = useRouter();

  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const { data: memberships } = GetAllMembershipsAPI({
    organizationId,
    take: 100,
    page: 1,
    sort: "DESC",
    queryKey: ["memberships"],
  });

  useEffect(() => {
    if (post) {
      const fields = [
        "title",
        "description",
        "whoCanSee",
        "type",
        "allowDownload",
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOnePostGalleryAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<PostFormModel> = async (
    data: PostFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newImageLists } = filterImageAndFile({
        imageList,
      });
      const payload = {
        ...data,
        imageList,
        newImageLists,
      };

      await saveMutation.mutateAsync({
        ...payload,
        postId: post?.id,
        type: "GALLERY",
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Post save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      router.back();
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className={`overflow-hidden ${theme === "light" ? "bg-white" : ""} border border-gray-200`}>
              <div className="px-4 py-5">
                <h2 className="text-black dark:text-white font-bold">
                  {post?.id ? "Update" : "Create a new"} gallery
                </h2>

                <div className="p-2 flex-auto justify-center">
                  {hasErrors ? (
                    <div className="mb-4">
                      <Alert message={hasErrors} type="error" showIcon />
                    </div>
                  ) : null}

                  {uploadImages?.length > 0 ? (
                    <div className="mt-2 text-center space-x-2">
                      <ListCarouselUpload
                        uploads={post?.uploadsImage}
                        folder="posts"
                        preview={false}
                        height="300px"
                        width="100%"
                      />
                    </div>
                  ) : null}

                  {!postId ? (
                    <div className="mb-4">
                      <Controller
                        name="attachmentImages"
                        control={control}
                        render={({ }) => (
                          <>
                            <div className="text-center justify-center mx-auto">
                              <Upload
                                multiple
                                name="attachmentImages"
                                listType="picture-card"
                                fileList={imageList}
                                onChange={handleImageChange}
                                accept=".png,.jpg,.jpeg"
                                maxCount={10}
                              >
                                {imageList.length >= 10 ? null : (
                                  <div className="text-center">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8}}>
                                      Upload image
                                    </div>
                                  </div>
                                )}
                              </Upload>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <TextInput
                      control={control}
                      label="Title"
                      type="text"
                      name="title"
                      placeholder="Title"
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <SelectSearchInput
                      firstOptionName="Choose who can see this post?"
                      label="Who can see this post?"
                      control={control}
                      errors={errors}
                      placeholder="Select who can see this post?"
                      valueType="text"
                      name="whoCanSee"
                      dataItem={arrayWhoCanSees}
                    />
                  </div>

                  <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold">
                            {" "}
                            Allow download{" "}
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            allow everyone to download in original quality file
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                        <button
                          type="button"
                          title=""
                          className="text-sm font-medium transition-all duration-200"
                        >
                          {" "}
                        </button>
                        <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                          <SwitchInput
                            control={control}
                            name="allowDownload"
                            label=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <TextareaReactQuillInput
                      control={control}
                      name="description"
                      label="Description (optional)"
                      placeholder="description"
                      errors={errors}
                      className="h-36"
                    />
                  </div>

                  <div className="flex items-center mt-4 space-x-4">
                    <ButtonInput
                      status="cancel"
                      type="button"
                      shape="default"
                      size="normal"
                      loading={loading}
                      onClick={() => router.back()}
                    >
                      Cancel
                    </ButtonInput>
                    <ButtonInput
                      minW="fit"
                      shape="default"
                      type="submit"
                      size="large"
                      loading={loading}
                      color="indigo"
                    >
                      Save and Publish
                    </ButtonInput>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormGalleryPost };
