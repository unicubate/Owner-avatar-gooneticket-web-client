import React, { useEffect } from 'react'
import { NavbarProps } from '../layout-dashboard/header-vertical-nav-dashboard';
import Link from 'next/link';
import { Button, Spin } from 'antd';
import { getAllCountiesAPI, getAllCurrenciesAPI, getOneProfileAPI } from '@/pages/api/profile';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectSearchInput } from '../util/form/select-search-input';
import { DateInput, TextAreaInput, TextInput, TextInputPassword } from '../util/form';
import { ButtonInput } from '../templates/button-input';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';

type Props = {
    profileId: string
}

const schema = yup.object({
    fullName: yup.string().required(),
    url: yup.string().url().optional(),
    birthday: yup.date().required(),
    currencyId: yup.string().uuid().required(),
    countryId: yup.string().uuid().required(),
});

const UpdateFormProfile: React.FC<Props> = ({ profileId }) => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const fetchCurrencies = async () => await getAllCurrenciesAPI();
    const { data: dataCurrencies } = useQuery(
        ["currencies"],
        () => fetchCurrencies(),
        {
            refetchOnWindowFocus: false,
        }
    );
    const currencies: any = dataCurrencies?.data;

    const fetchCountries = async () => await getAllCountiesAPI();
    const { data: dataCountries } = useQuery(
        ["countries"],
        () => fetchCountries(),
        {
            refetchOnWindowFocus: false,
        }
    );
    const countries: any = dataCountries?.data;


    const fetchOneProfile = async () =>
        await getOneProfileAPI({ profileId: profileId });
    const { data: profileItem } = useQuery(["profile", profileId], () => fetchOneProfile(), {
        refetchOnWindowFocus: false,
        enabled: Boolean(profileId),
    });
    const profile: any = profileItem?.data;


    useEffect(() => {
        if (profile) {
            const fields = ['birthday', 'currencyId', 'countryId', 'url', 'phone', 'color', 'fullName', 'firstAddress'];
            fields?.forEach((field: any) => setValue(field, profile[field]));
        }
    }, [profile, profileId, setValue]);


    const onSubmit: SubmitHandler<any> = (payload: any) => {
        // let data = new FormData();
        // data.append("confirm", `${payload.confirm}`);
        // payload?.attachment?.fileList?.length > 0 &&
        //   payload?.attachment?.fileList.forEach((file: any) => {
        //     data.append("attachment", file as RcFile);
        //   });

        console.log("payload =======>", payload);
    };

    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)} className="py-7">

                <h2 className="text-base font-bold text-gray-900"> Personal Info </h2>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-1 gap-y-5 gap-x-6">

                    <div>
                        <label className="text-sm font-medium text-gray-600"> Username </label>
                        <div className="mt-2">
                            <TextInput
                                control={control}
                                type="text"
                                name="username"
                                placeholder="username"
                                errors={errors}
                            />
                        </div>
                    </div>

                </div>


                <div className="mt-8">
                    <ButtonInput shape="round" type="submit" size="normal" loading={false} color='indigo'>
                        Save changes
                    </ButtonInput>
                </div>

            </form>


            <form onSubmit={handleSubmit(onSubmit)} className="py-7">

                <h2 className="text-base font-bold text-gray-900"> Profile </h2>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                    <div>
                        <div className="mt-2">
                            <TextInput
                                label="Full name"
                                control={control}
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div>
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

                </div>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-3 gap-y-5 gap-x-6">
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <div className="mt-2">
                            <TextInput
                                label="Second address"
                                control={control}
                                type="text"
                                name="secondAddress"
                                placeholder="First address"
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-3 gap-y-5 gap-x-6">
                    <div>
                        <label className="text-sm font-bold text-gray-600 mb-2"> Birthday </label>
                        <DateInput
                            control={control}
                            placeholder="12/01/2023"
                            name="birthday"
                            errors={errors}
                        />
                    </div>
                    <div>
                        <div className="mt-2">
                            <SelectSearchInput
                                label="Counties"
                                firstOptionName="Second address"
                                optionType="other"
                                control={control}
                                errors={errors}
                                placeholder="Country"
                                name="countryId"
                                dataItem={countries}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <SelectSearchInput
                                label="Currency"
                                firstOptionName="Currency"
                                optionType="other"
                                control={control}
                                errors={errors}
                                placeholder="Currency"
                                name="currencyId"
                                dataItem={currencies}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-6 gap-y-5 gap-x-6">
                    <div>
                        <div className="mt-2">
                            <TextAreaInput
                                control={control}
                                label="Bio"
                                name="description"
                                placeholder="Introduce yourself and what you're creating"
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-8">
                    <ButtonInput shape="round" type="submit" size="normal" loading={false} color='indigo'>
                        Save changes
                    </ButtonInput>
                </div>
            </form>


        </>
    )
}

export { UpdateFormProfile }