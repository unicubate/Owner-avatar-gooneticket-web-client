import React, { useEffect, useState } from 'react';
import { Select, Upload, UploadFile, UploadProps } from 'antd';
import { SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting/ant/button-input';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { PlusOutlined } from '@ant-design/icons';
import { SwitchInput } from '../ui-setting/ant/switch-input';
import { CommissionFormModel } from '@/types/commission';
import { CreateOrUpdateOneCommissionAPI } from '@/api-site/commission';
import { useRouter } from 'next/router';
import { TextareaReactQuillInput } from '../ui-setting';
import { TextInput, NumberInput } from '../ui-setting/ant';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { useAuth } from '../util/context-user';
import { filterImageAndFile } from '@/utils/utils';

const { Option } = Select;

type Props = {
  commission?: any;
  uploadImages?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPayment: yup.string().nullable(),
  description: yup.string().min(10, 'Minimum 10 symbols').required(),
  limitSlot: yup.number().when('enableLimitSlot', (enableLimitSlot, schema) => {
    if (enableLimitSlot[0] === true)
      return schema.min(1).required('limit slots required');
    return schema.nullable();
  }),
});

const CreateOrUpdateFormCommission: React.FC<Props> = ({
  commission,
  uploadImages,
}) => {
  const { profile } = useAuth() as any;
  const { push, back } = useRouter();
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

  const watchEnableLimitSlot = watch('enableLimitSlot', false);

  useEffect(() => {
    if (commission) {
      const fields = [
        'title',
        'price',
        'urlMedia',
        'enableLimitSlot',
        'limitSlot',
        'description',
        'messageAfterPayment',
      ];
      fields?.forEach((field: any) => setValue(field, commission[field]));
    }
  }, [commission, setValue]);

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCommissionAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<CommissionFormModel> = async (
    data: CommissionFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newImageLists } = filterImageAndFile({ imageList });
      const payload = {
        ...data,
        imageList,
        newImageLists,
      };
      await saveMutation({
        ...payload,
        commissionId: commission?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Commission save successfully`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
      if (!commission?.id) {
        push(`/commissions`);
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

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden bg-white dark:bg-[#121212]  border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="px-4 py-5">
                <h2 className="dark:text-white font-bold">
                  {commission?.id ? 'Update' : 'Create a new'} commission
                </h2>
                <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
                  <div className="mb-2">
                    <TextInput
                      label="Name*"
                      control={control}
                      type="text"
                      name="title"
                      placeholder="e.g. black and white sketch"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <NumberInput
                    control={control}
                    label="Price*"
                    type="number"
                    name="price"
                    placeholder="Price commission"
                    errors={errors}
                    required
                    prefix={profile?.currency?.code}
                  />
                </div>

                <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
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
                              maxCount={10}
                            >
                              {imageList.length >= 10 ? null : (
                                <div className="text-center dark:text-white">
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

                <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
                  <div className="mb-2">
                    <TextareaReactQuillInput
                      control={control}
                      name="description"
                      label="Description"
                      placeholder="Write description"
                      errors={errors}
                      className=""
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Describe in detail what buyers will receive when they make a purchase.`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
                  <div className="mb-2">
                    <TextInput
                      label="Embed Media (optional)"
                      control={control}
                      type="text"
                      name="urlMedia"
                      placeholder="e.g. https://youtube.com/watch?v=abc123"
                      errors={errors}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Add a preview video, audio or other content to showcase your product to potential buyers`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-4 gap-y-5 gap-x-6">
                  <div className="mb-2">
                    <TextareaReactQuillInput
                      control={control}
                      name="messageAfterPayment"
                      label="Thank you message or delivery instructions (optional)"
                      placeholder="Success page confirmation"
                      errors={errors}
                      className=""
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
                  <div className="mb-2">
                    <label className="block dark:text-white text-sm font-bold mb-2">
                      Advanced settings
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold dark:text-white">
                          {' '}
                          Limit slots (optional){' '}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          A limited number of slots creates a sense of urgency
                          and also saves you from burn-out.
                        </p>
                      </div>
                    </div>

                    <SwitchInput
                      control={control}
                      name="enableLimitSlot"
                      label=""
                    />
                  </div>
                  {watchEnableLimitSlot ? (
                    <div className="mb-1">
                      <NumberInput
                        control={control}
                        label=""
                        type="number"
                        name="limitSlot"
                        placeholder="10"
                        errors={errors}
                        required
                      />
                    </div>
                  ) : null}

                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold dark:text-white">
                          {' '}
                          Special price for members{' '}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Offer a discounted extra price to attract new members
                          and to keep your current members engaged.
                        </p>
                      </div>
                    </div>

                    <SwitchInput
                      control={control}
                      name="allowChooseInventory"
                      label=""
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4 mb-4 space-x-4">
                  <ButtonInput
                    status="cancel"
                    type="button"
                    shape="default"
                    size="large"
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
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    <small>{`(*) These fields are required`}</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormCommission };
