import React, { useEffect, useState } from 'react';
import { Avatar, Button, Select, Space, Upload } from 'antd';
import {
  GetAllCountiesAPI,
  GetAllCurrenciesAPI,
  GetOneProfileAPI,
  UpdateOneProfileAPI,
  getOneFileProfileAPI,
} from '@/api-site/profile';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectSearchInput } from '../ui-setting/ant/select-search-input';
import { DateInput, TextAreaInput, TextInput } from '../ui-setting/ant';
import { ButtonInput } from '../ui-setting/ant/button-input';
import { ProfileFormModel, arrayColors } from '@/types/profile.type';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

type Props = {
  profileId: string;
  user: any;
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  url: yup.string().url().nullable(),
  birthday: yup.date().max(new Date()).required(),
  currencyId: yup.string().uuid().required('currency is a required field'),
  countryId: yup.string().uuid().required('country is a required field'),
});

const UpdateFormProfile: React.FC<Props> = ({ profileId, user }) => {
  const [colors] = useState(arrayColors);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { data: currencies } = GetAllCurrenciesAPI();

  const { data: countries } = GetAllCountiesAPI();

  const { data: profile, status } = GetOneProfileAPI({ profileId });

  useEffect(() => {
    if (profile) {
      const fields = [
        'birthday',
        'currencyId',
        'countryId',
        'url',
        'phone',
        'color',
        'firstName',
        'lastName',
        'secondAddress',
        'firstAddress',
        'description',
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
  }, [profile, profileId, setValue]);

  const saveMutation = UpdateOneProfileAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    payload: ProfileFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        profileId: profileId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Information save successfully`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'bottom',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold"> Profile </h2>

            {profile?.image ? (
              <div className="mt-2 space-x-2 text-center">
                <Avatar
                  size={200}
                  shape="circle"
                  src={getOneFileProfileAPI(String(profile?.image))}
                  alt={`${profile?.firstName} ${profile?.lastName}`}
                />
              </div>
            ) : (
              <div className="mb-4">
                <Controller
                  name="attachment"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <div className="mx-auto justify-center text-center">
                        <Upload
                          name="attachment"
                          listType="picture"
                          maxCount={1}
                          className="upload-list-inline"
                          onChange={onChange}
                          accept=".png,.jpg"
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </div>
                    </>
                  )}
                />
                {/* {errors?.attachment && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors?.attachment?.message}
                                        </span>
                                    )} */}
              </div>
            )}

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextInput
                  label="First name"
                  control={control}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  label="Last name"
                  control={control}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  label="Phone"
                  control={control}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  errors={errors}
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="mt-2">
                <TextInput
                  label="Website"
                  control={control}
                  type="url"
                  name="url"
                  placeholder="Website"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <DateInput
                  label="Birthday"
                  control={control}
                  placeholder="12/01/2023"
                  name="birthday"
                  errors={errors}
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div className="mt-2">
                <TextInput
                  label="First address"
                  control={control}
                  type="text"
                  name="firstAddress"
                  placeholder="First address"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="Second address"
                  control={control}
                  type="text"
                  name="secondAddress"
                  placeholder="Second address"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Color
                </label>
                <Controller
                  name={'color'}
                  control={control}
                  render={({ field }) => (
                    <Select
                      showSearch
                      size="large"
                      style={{ width: '100%' }}
                      id={'color'}
                      placeholder={'Color'}
                      status={errors?.color?.message ? 'error' : ''}
                      filterOption={(input, option) =>
                        (option?.name ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      {...field}
                    >
                      <>
                        {colors?.length > 0
                          ? colors?.map((item: any, index: number) => (
                              <Option
                                key={index}
                                value={item?.name}
                                name={item?.name}
                              >
                                <Space>
                                  <span
                                    className={`text- text-xs font-semibold${item?.name}-600 bg-${item?.name}-50 border- border${item?.name}-600 inline-flex items-center rounded-md px-2.5 py-1`}
                                  >
                                    {item?.name}
                                  </span>
                                </Space>
                              </Option>
                            ))
                          : null}
                      </>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <SelectSearchInput
                  label="Counties"
                  firstOptionName="Country"
                  valueType="key"
                  control={control}
                  errors={errors}
                  placeholder="Country"
                  name="countryId"
                  dataItem={countries}
                />
              </div>
              <div className="mt-2">
                <SelectSearchInput
                  label="Payment currency"
                  firstOptionName="Currency"
                  valueType="key"
                  control={control}
                  errors={errors}
                  placeholder="Currency"
                  name="currencyId"
                  dataItem={currencies}
                />
                <span className="text-sm font-medium text-gray-400">
                  {`Your supporters will pay in this currency.`}
                </span>
              </div>
            </div> */}
            <div className="mt-2">
              <SelectSearchInput
                label="Counties"
                firstOptionName="Country"
                valueType="key"
                control={control}
                errors={errors}
                placeholder="Country"
                name="countryId"
                dataItem={countries}
              />
            </div>
            <div className="mt-2">
              <SelectSearchInput
                label="Payment currency"
                firstOptionName="Currency"
                valueType="key"
                control={control}
                errors={errors}
                placeholder="Currency"
                name="currencyId"
                dataItem={currencies}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Your supporters will pay in this currency.`}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
              <div className="mt-2">
                <TextAreaInput
                  row={3}
                  control={control}
                  label="Bio"
                  name="description"
                  placeholder="Introduce yourself and what you're creating"
                  errors={errors}
                />
              </div>
            </div>

            <div className="mb-2 mt-4 flex items-center space-x-4">
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color={`indigo`}
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormProfile };
