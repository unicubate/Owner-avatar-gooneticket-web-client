import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ReactQuillInput,
  TextAreaInput,
  TextInput,
  TextInputPassword,
} from "../util/form";
import { ButtonInput } from "../templates/button-input";
import { SelectSearchInput } from "../util/form/select-search-input";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { CreateOrUpdateOnePostAPI, getOneFilePostAPI } from "@/api/post";
import { Avatar, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { useRouter } from "next/router";

type Props = {
  postId?: string;
  post?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  urlMedia: yup.string().url().required(),
  description: yup.string().nullable(),
});

const CreateOrUpdateFormVideoPost: React.FC<Props> = ({ postId, post }) => {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (post) {
      const fields = ["title", "urlMedia", "description", "whoCanSee", "type"];
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
    payload: PostFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const newPayload: PostFormModel = { ...payload, type: "VIDEO" };
    try {
      await saveMutation.mutateAsync({
        ...newPayload,
        postId: post?.id,
      });
      if (!post?.id) {
        push(`/posts`);
      }
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

  return (
    <>
      <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white border border-gray-200">
              <div className="px-4 py-5">
                <h2 className="text-base font-bold text-gray-900">
                  {post?.id ? "Update" : "Create a New"} Video
                </h2>

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

                {post?.image ? (
                  <div className="mt-4 text-center space-x-2">
                    <Avatar
                      size={200}
                      shape="square"
                      src={getOneFilePostAPI(String(post?.image))}
                      alt={post?.title}
                    />
                  </div>
                ) : null}

                <div className="mt-4">
                  <Controller
                    name="attachment"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <div className="text-center justify-center mx-auto">
                          <Upload
                            name="attachment"
                            listType="picture"
                            maxCount={1}
                            className="upload-list-inline"
                            onChange={onChange}
                            accept=".png,.jpg,.jpeg"
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </div>
                      </>
                    )}
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
                  <ButtonCancelInput
                    shape="default"
                    size="large"
                    loading={loading}
                    onClick={() => back()}
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

export { CreateOrUpdateFormVideoPost };
