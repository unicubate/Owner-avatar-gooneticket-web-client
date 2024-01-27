import { GetAllCategoriesAPI } from '@/api-site/category';
import { CreateOrUpdateOnePostAPI } from '@/api-site/post';
import { PostFormModel, arrayWhoCanSees } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { filterImageAndFile } from '@/utils/utils';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, ReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant/switch-input';
import { AudioPlayerInput } from '../ui-setting/audio-player-Input';
import { SelectInput, TextInput } from '../ui-setting/shadcn';

type Props = {
  postId?: string;
  uploadFiles?: any;
  uploadImages?: any;
  post?: any;
  refetch: any;
  organizationId: string;
};

const schema = yup.object({
  title: yup.string().required(),
  whoCanSee: yup.string().required('Who can see this post'),
  description: yup.string().optional(),
  allowDownload: yup.string().optional(),
  urlMedia: yup.string().when('enableUrlMedia', (enableUrlMedia, schema) => {
    if (enableUrlMedia[0] === true)
      return yup.string().url().required('url is a required field');
    return schema.nullable();
  }),
});

const CreateOrUpdateFormAudioPost: React.FC<Props> = ({
  postId,
  post,
  refetch,
  organizationId,
  uploadFiles,
  uploadImages,
}) => {
  const { back } = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles ?? []);
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

  const watchEnableUrlMedia = watch('enableUrlMedia', false);

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'false',
    organizationId,
    sort: 'DESC',
    take: 100,
    queryKey: ['categories'],
  });

  useEffect(() => {
    if (post) {
      const fields = [
        'title',
        'urlMedia',
        'description',
        'whoCanSee',
        'type',
        'categoryId',
        'allowDownload',
        'enableUrlMedia',
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOnePostAPI({
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
    data: PostFormModel,
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

      await saveMutation({
        ...payload,
        type: 'AUDIO',
        postId: post?.id,
      });

      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Post save successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      if (post.id) {
        refetch();
      } else {
        back();
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  const handleImageChange: UploadProps['onChange'] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  const handleFileChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5">
                <h2 className="font-bold text-black dark:text-white">
                  {post?.id ? 'Update' : 'Create a new'} audio
                </h2>
                <div className="mt-4">
                  <Controller
                    name="attachmentImages"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <div className="mx-auto justify-center text-center">
                          <ImgCrop rotationSlider>
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
                                  <div style={{ marginTop: 8 }}>
                                    Upload cover
                                  </div>
                                </div>
                              )}
                            </Upload>
                          </ImgCrop>
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
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-black dark:text-white">
                          Upload audio
                        </p>

                        {!watchEnableUrlMedia ? (
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            You have a URL to an external platform.
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <SwitchInput
                      control={control}
                      name="enableUrlMedia"
                      label=""
                    />
                  </div>

                  {post?.id ? (
                    <div className="mt-2 text-center">
                      <AudioPlayerInput
                        urlMedia={post?.urlMedia}
                        enableUrlMedia={post?.enableUrlMedia}
                        uploads={post?.uploadsFile}
                        folder="posts"
                      />
                    </div>
                  ) : null}

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
                    <>
                      <div className="mt-4">
                        <Controller
                          name="attachment"
                          control={control}
                          render={({ field: { onChange } }) => (
                            <>
                              <div className="mx-auto justify-center text-center">
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
                                    <Button
                                      className="text-center text-black dark:text-white"
                                      icon={<UploadOutlined />}
                                    >
                                      Upload audio
                                    </Button>
                                  )}
                                </Upload>
                              </div>
                            </>
                          )}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5">
                        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                          <div className="flex min-w-0 flex-1 items-center">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-black dark:text-white">
                                {' '}
                                Allow download{' '}
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-500">
                                allow everyone to download in original quality
                                file
                              </p>
                            </div>
                          </div>

                          <SwitchInput
                            control={control}
                            name="allowDownload"
                            label=""
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4">
                  <SelectInput
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
                  <SelectInput
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      {`Categories makes it easy to browse your posts.`}
                    </span>
                    <label className="mb-2 block text-sm dark:text-white"></label>
                    <Link
                      className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
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
                  <span className="text-sm font-medium text-gray-400">
                    {`Provide a full description of the item that you are selling.`}
                  </span>
                </div>

                <div className="my-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={() => back()}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="info"
                    loading={loading}
                  >
                    Save and Publish
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
