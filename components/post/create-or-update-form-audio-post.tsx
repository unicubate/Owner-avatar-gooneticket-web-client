import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ReactQuillInput,
  TextInput,
} from "../util/form";
import { ButtonInput } from "../templates/button-input";
import { SelectSearchInput } from "../util/form/select-search-input";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateOnePostAPI } from "@/api/post";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { useRouter } from "next/router";
import { SwitchInput } from "../util/form/switch-input";
import { filterImageAndFile } from "@/utils/utils";

type Props = {
  postId?: string;
  uploadFiles?: any;
  uploadImages?: any;
  post?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  // urlMedia: yup.string().url().required(),
  description: yup.string().min(10, "Minimum 10 symbols").required(),
  urlMedia: yup.string().when("enableUrlMedia", (enableUrlMedia, schema) => {
    if (enableUrlMedia[0] === true)
      return yup.string().url().required("url is a required field");
    return schema.nullable();
  }),
});

const CreateOrUpdateFormAudioPost: React.FC<Props> = ({
  postId,
  post,
  uploadFiles,
  uploadImages,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles ?? []);
  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchEnableUrlMedia = watch("enableUrlMedia", false);

  useEffect(() => {
    if (post) {
      const fields = [
        "title",
        "urlMedia",
        "description",
        "whoCanSee",
        "type",
        "enableUrlMedia",
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
      const { newFileLists, newImageLists } = filterImageAndFile({
        fileList,
        imageList,
      });
      const payload = {
        ...data,
        fileList,
        newFileLists,
        imageList,
        newImageLists,
      };

      await saveMutation.mutateAsync({
        ...payload,
        type: "AUDIO",
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

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  return (
    <>
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {post?.id ? "Update" : "Create a new"} audio
                </h2>
                <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
                  <div className="mb-4">
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
                                  <div style={{ marginTop: 8 }}>
                                    Upload cover
                                  </div>
                                </div>
                              )}
                            </Upload>
                          </div>
                        </>
                      )}
                    />
                  </div>
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
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">
                          Upload audio
                        </p>

                        {!watchEnableUrlMedia ? (
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            You have a URL to an external platform.
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                      <button
                        type="button"
                        title=""
                        className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                      >
                        {" "}
                      </button>
                      <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                        <SwitchInput
                          control={control}
                          name="enableUrlMedia"
                          label=""
                        />
                      </div>
                    </div>
                  </div>
                  {watchEnableUrlMedia ? (
                    <>
                      <div className="mt-2">
                        <TextInput
                          control={control}
                          label=""
                          type="text"
                          name="urlMedia"
                          placeholder="e.g. https://youtube.com/watch?v=abc123"
                          errors={errors}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-400">
                        {`Add a url to an external platform. Currently supported platforms are DailyMotion, Facebook, Giphy, Instagram, MixCloud, SoundCloud, Spotify, TikTok, Twitch, Twitter, Vimeo and YouTube.`}
                      </span>
                    </>
                  ) : (
                    <div className="mt-4">
                      <Controller
                        name="attachment"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <>
                            <div className="text-center justify-center mx-auto">
                              <Upload
                                name="attachmentFiles"
                                listType="picture"
                                className="upload-list-inline"
                                fileList={fileList}
                                onChange={handleFileChange}
                                maxCount={1}
                                accept=".mp3"
                              >
                                {fileList.length >= 1 ? null : (
                                  <Button icon={<UploadOutlined />}>
                                    Upload audio
                                  </Button>
                                )}
                              </Upload>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  )}
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

                {/* <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
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

                  <div className="mt-2">
                    <SelectSearchInput
                      firstOptionName="Choose categories"
                      label="Categories"
                      control={control}
                      errors={errors}
                      placeholder="Select categories"
                      valueType="text"
                      name="whoCanSee"
                      dataItem={arrayWhoCanSees}
                    />
                    <div className="flex flex-col justify-between items-end">
                      <Button shape="default" type="link">
                        New Category
                      </Button>
                    </div>
                  </div>
                </div> */}

                <div className="mt-4">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
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

export { CreateOrUpdateFormAudioPost };
