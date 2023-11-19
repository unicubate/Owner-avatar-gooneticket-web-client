import React, { useEffect, useState } from "react";
import { SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { ReactQuillInput, TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { SelectSearchInput } from "../ui/select-search-input";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateOnePostAPI } from "@/api-site/post";
import { Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { filterImageAndFile } from "@/utils/utils";
import { GetAllMembershipsAPI } from "@/api-site/membership";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { GetAllCategoriesAPI } from "@/api-site/category";
import Link from "next/link";

type Props = {
  organizationId: string;
  uploadImages?: any;
  postId?: string;
  post?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  whoCanSee: yup.string().required("Who can see this post"),
  description: yup.string().optional(),
  urlMedia: yup.string().url().required(),
  // membershipId: yup.string().when("whoCanSee", (enableUrlMedia, schema) => {
  //   if ((enableUrlMedia[0] as WhoCanSeeType) === "MEMBERSHIP")
  //     return yup.string().uuid().required("membership is a required field");
  //   return schema.nullable();
  // }),
});

const CreateOrUpdateFormVideoPost: React.FC<Props> = ({
  postId,
  post,
  uploadImages,
  organizationId,
}) => {
  const { push, back } = useRouter();

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

  const watchWhoCanSee = watch("whoCanSee", null);
  const { data: memberships } = GetAllMembershipsAPI({
    organizationId,
    take: 100,
    page: 1,
    sort: "DESC",
    queryKey: ["memberships"],
  });

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: "false",
    organizationId,
    sort: "DESC",
    take: 100,
    queryKey: ["categories"],
  });

  useEffect(() => {
    if (post) {
      const fields = [
        "title",
        "urlMedia",
        "description",
        "whoCanSee",
        "type",
        "categoryId",
        "membershipId",
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOnePostAPI({
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
        type: "VIDEO",
        postId: post?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Post save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      push(`/posts`);
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
            <div className="overflow-hidden bg-white dark:bg-[#121212]  border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {post?.id ? "Update" : "Create a New"} Video
                </h2>

                <div className="mt-2">
                  <Controller
                    name="attachmentImages"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <div className="text-center justify-center mx-auto">
                          <Upload
                            multiple
                            name="attachmentImages"
                            listType="picture-card"
                            fileList={imageList}
                            onChange={handleImageChange}
                            accept=".png,.jpg,.jpeg"
                            maxCount={1}
                          >
                            {imageList.length >= 1 ? null : (
                              <div className="text-center text-black dark:text-white">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload cover</div>
                              </div>
                            )}
                          </Upload>
                        </div>
                      </>
                    )}
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    control={control}
                    label="Title"
                    type="text"
                    name="title"
                    required
                    placeholder="Title"
                    errors={errors}
                  />
                </div>
                <div className="mt-4">
                  <TextInput
                    control={control}
                    label="Url video"
                    type="text"
                    name="urlMedia"
                    required
                    placeholder="e.g. https://youtube.com/watch?v=abc123"
                    errors={errors}
                  />
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {`Add a url to an external platform. Currently supported platforms are DailyMotion, Facebook, Giphy, Instagram, MixCloud, SoundCloud, Spotify, TikTok, Twitch, Twitter, Vimeo and YouTube.`}
                </span>

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

                <div className="mt-4">
                  <SelectSearchInput
                    firstOptionName="Choose category post"
                    label="Category post"
                    control={control}
                    errors={errors}
                    placeholder="Select category post"
                    valueType="key"
                    name="categoryId"
                    allowClear={true}
                    dataItem={categories}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-400">
                      {`Categories makes it easy to browse your posts.`}
                    </span>
                    <label className="block text-sm mb-2 dark:text-white"></label>
                    <Link
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      href="/shop/config"
                    >
                      Setting category
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
                  {/* <TextAreaInput
                    row={4}
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Description"
                    errors={errors}
                  /> */}
                  <span className="text-sm font-medium text-gray-400">
                    {`Provide a full description of the item that you are selling.`}
                  </span>
                </div>

                <div className="mt-4">
                  <ButtonInput
                    shape="default"
                    type="submit"
                    size="large"
                    loading={loading}
                    color="indigo"
                  >
                    Save and Publish
                  </ButtonInput>
                </div>
                <div className="flex items-center mt-4 mb-4 space-x-4">
                  <ButtonInput
                    status="cancel"
                    type="button"
                    shape="default"
                    size="large"
                    loading={loading}
                    onClick={() => back()}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    minW="fit"
                    shape="default"
                    type="submit"
                    size="large"
                    loading={false}
                    color="indigo"
                  >
                    Save as Draft
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormVideoPost };
