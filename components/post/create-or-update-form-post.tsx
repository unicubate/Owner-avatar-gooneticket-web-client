import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactQuillInput, TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { SelectSearchInput } from "../ui/select-search-input";
import { PostFormModel, WhoCanSeeType, arrayWhoCanSees } from "@/types/post";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateOnePostAPI, getCategoriesAPI } from "@/api-site/post";
import { Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { ButtonCancelInput } from "../ui/button-cancel-input";
import { useRouter } from "next/router";
import { filterImageAndFile } from "@/utils/utils";
import { useAuth } from "../util/context-user";
import { GetAllMembershipsAPI } from "@/api-site/membership";
import { SelectMembershipSearchInput } from "../membership/select-membership-search-input";
import Link from "next/link";
import { useReactHookForm } from "../hooks/use-react-hook-form";

type Props = {
  organizationId: string;
  uploadImages?: any;
  postId?: string;
  post?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(10, "minimum 3 symbols").required(),
  categories: yup.array().optional(),
  membershipId: yup.string().when("whoCanSee", (enableUrlMedia, schema) => {
    if ((enableUrlMedia[0] as WhoCanSeeType) === "MEMBERSHIP")
      return yup.string().uuid().required("membership is a required field");
    return schema.nullable();
  }),
});

const CreateOrUpdateFormPost: React.FC<Props> = ({
  postId,
  post,
  uploadImages,
  organizationId,
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

  const watchWhoCanSee = watch("whoCanSee", null);
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
        "membershipId",
        "categories",
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
        type: "ARTICLE",
        postId: post?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Article save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      router.push(`/posts`)
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
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {post?.id ? "Update" : "Create a new"} article
                </h2>

                <div className="mt-4">
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
                              <div>
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

                <div className="mt-2">
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

                {watchWhoCanSee === "MEMBERSHIP" ? (
                  <div className="mt-4">
                    <SelectMembershipSearchInput
                      firstOptionName="Choose memberships?"
                      label="Memberships"
                      control={control}
                      errors={errors}
                      placeholder="Select memberships?"
                      name="membershipId"
                      dataItem={memberships?.value}
                    />
                    <div className="flex justify-between items-center">
                      <label className="block text-sm mb-2 dark:text-white"></label>
                      <Link
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                        href="/memberships/levels"
                      >
                        Create membership
                      </Link>
                    </div>
                  </div>
                ) : null}

                <div className="mt-2">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
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
                  <ButtonCancelInput
                    shape="default"
                    size="large"
                    loading={loading}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </ButtonCancelInput>
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

export { CreateOrUpdateFormPost };
