import { GetAllCategoriesAPI } from '@/api-site/category';
import { CreateOrUpdateOnePostAPI } from '@/api-site/post';
import { PostFormModel, arrayWhoCanSees } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useUploadItem } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant';
import { ButtonInput } from '../ui-setting/button-input';
import { SelectInput, TextInput } from '../ui-setting/shadcn';

type Props = {
  organizationId: string;
  uploadImages?: any;
  postId?: string;
  post?: any;
  refetch?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(30, 'minimum 3 symbols').required(),
  categories: yup.array().optional(),
  enableVisibility: yup.boolean().required(),
});

const CreateOrUpdateFormPost = ({
  postId,
  post,
  refetch,
  uploadImages,
  organizationId,
}: Props) => {
  const router = useRouter();
  const { imageList, handleImageChange } = useUploadItem({
    uploadImages,
  });

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
  const watchEnableVisibility = watch('enableVisibility', true);

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'FALSE',
    organizationId,
    sort: 'DESC',
    take: 100,
  });

  useEffect(() => {
    if (post) {
      const fields = [
        'title',
        'description',
        'whoCanSee',
        'type',
        'categoryId',
        'categories',
        'enableVisibility',
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
    data: PostFormModel,
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
        type: 'ARTICLE',
        postId: post?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Article save successfully',
      });
      if (post?.id) {
        refetch();
      } else {
        router.back();
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5">
                <h2 className="font-bold dark:text-white">
                  {post?.id ? 'Update' : 'Create a new'} article
                </h2>

                <div className="mt-4 py-2">
                  <div className="mx-auto max-w-max">
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
                        <div className="text-center dark:text-white">
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload cover</div>
                        </div>
                      )}
                    </Upload>
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

                <div className="mt-2">
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

                <div className="mt-2">
                  <ReactQuillInput
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Write description"
                    errors={errors}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold dark:text-white">
                          Product{' '}
                          {watchEnableVisibility ? 'visible' : 'invisible'}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Make the product{' '}
                          {watchEnableVisibility ? 'visible' : 'invisible'} to
                          the public
                        </p>
                      </div>
                    </div>

                    <SwitchInput
                      control={control}
                      defaultValue={watchEnableVisibility}
                      name="enableVisibility"
                      label=""
                    />
                  </div>
                </div>

                {/* <div className="mt-4">
                  <ButtonInput
                    shape="default"
                    type="submit"
                    size="large"
                    loading={loading}
                    color="indigo"
                  >
                    Save and Publish
                  </ButtonInput>
                </div> */}
                <div className="my-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="primary"
                    loading={loading}
                  >
                    Save {watchEnableVisibility && 'and Publish'}
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
