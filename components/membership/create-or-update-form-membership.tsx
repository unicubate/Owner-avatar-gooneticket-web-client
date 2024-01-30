import { CreateOrUpdateOneMembershipAPI } from '@/api-site/membership';
import { MembershipFormModel } from '@/types/membership';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { TextareaReactQuillInput } from '../ui-setting';
import { ButtonInput } from '../ui-setting/button-input';
import { TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';
import { useAuth } from '../util/context-user';

const schema = yup.object({
  title: yup.string().required(),
  price: yup.number().min(1).required(),
  month: yup.number().min(1).required(),
  description: yup.string().min(10).required(),
});

const CreateOrUpdateFormMembership: React.FC<{
  membership?: any;
  uploadImages?: any;
  refetch?: any;
}> = ({ membership, uploadImages, refetch }) => {
  const { profile } = useAuth() as any;
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
  const watchPrice = watch('price', '');

  useEffect(() => {
    if (membership) {
      const fields = [
        'title',
        'messageWelcome',
        'price',
        'month',
        'description',
      ];
      fields?.forEach((field: any) => setValue(field, membership[field]));
    }
  }, [membership, setValue]);

  const saveMutation = CreateOrUpdateOneMembershipAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<MembershipFormModel> = async (
    data: MembershipFormModel,
  ) => {
    let newImageLists: any = [];
    setLoading(true);
    setHasErrors(undefined);
    try {
      imageList
        .filter((file: any) => file?.status === 'success')
        .forEach((file: any) => {
          newImageLists.push(file);
        });

      const payload = {
        ...data,
        newImageLists,
        imageList,
      };

      await saveMutation.mutateAsync({
        ...payload,
        membershipId: membership?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Membership save successfully`,
      });
      if (membership?.id) {
        refetch();
      } else {
        push(`/memberships/levels`);
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

  const handleImageChange: UploadProps['onChange'] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-black dark:text-white">
              Create a new membership
            </h2>

            <div className="mt-2">
              <TextInput
                control={control}
                label="Title*"
                type="text"
                name="title"
                required
                placeholder="Title"
                errors={errors}
              />
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Price*"
                  type="number"
                  name="price"
                  placeholder="Price subscribe"
                  errors={errors}
                  required
                />
                <div className="flex items-center justify-between">
                  <Label className="ml-auto block text-lg font-bold dark:text-white text-start">
                    {watchPrice ? watchPrice : null} {profile?.currency?.code}
                  </Label>
                </div>
                <span className="text-sm font-medium text-gray-400">
                  {`Set your minimum price  month. Supporters can choose to pay more`}
                </span>
              </div>
              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Month*"
                  type="number"
                  name="month"
                  placeholder="Month subscribe"
                  errors={errors}
                  required
                  pattern="[0-9]*"
                />
              </div>
            </div>

            <div className="mt-2">
              <Controller
                name="attachmentImages"
                control={control}
                render={({}) => (
                  <>
                    <div className="mx-auto justify-center text-center">
                      <Upload
                        name="attachmentImages"
                        listType="picture-card"
                        fileList={imageList}
                        onChange={handleImageChange}
                        accept=".png,.jpg,.jpeg"
                        maxCount={1}
                      >
                        {imageList.length >= 1 ? null : (
                          <div className="text-center dark:text-white">
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
              <TextareaReactQuillInput
                control={control}
                label="Description*"
                name="description"
                placeholder="This will help your audience decide whether to join your membership. Describe in your own words what you're offering them"
                className="h-40"
                errors={errors}
              />
            </div>
            <div className="mt-2">
              <TextareaReactQuillInput
                control={control}
                label="Welcome note"
                name="messageWelcome"
                placeholder="Write description"
                className="h-32"
                defaultValue={'Thank you for the support! 🎉 '}
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`This will be visible after the payment and in the welcome email. Make it personal, and include any links to rewards you'd like to share with them`}
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
      </form>
    </>
  );
};

export { CreateOrUpdateFormMembership };
