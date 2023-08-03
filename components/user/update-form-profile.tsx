import React, { useEffect } from 'react'
import { NavbarProps } from '../layout-dashboard/header-vertical-nav-dashboard';
import Link from 'next/link';
import { Button, Spin } from 'antd';
import { getAllCountiesAPI, getOneProfileAPI } from '@/pages/api/profile';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectSearchInput } from '../util/form/select-search-input';
import { DateInput, TextAreaInput, TextInput } from '../util/form';
import { ButtonInput } from '../templates/button-input';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';

type Props = {
    profileId: string
}

const schema = yup.object({
    fullName: yup.string().optional(),
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

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mt-12">
                <div className="space-y-8">



                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"> Website </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <TextInput
                                control={control}
                                type="text"
                                name="url"
                                placeholder="https://www.yousite.com"
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"> Birthday </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <DateInput
                                control={control}
                                placeholder="12/01/2023"
                                name="birthday"
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"> Country </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <SelectSearchInput
                                firstOptionName="Country"
                                optionType="other"
                                control={control}
                                errors={errors}
                                placeholder="Country"
                                name="countryId"
                                dataItem={countries}
                            />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"> Write Your Bio </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <TextAreaInput
                                control={control}
                                name="description"
                                placeholder="Introduce yourself and what you're creating"
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="mt-6 sm:mt-12">
                    <Button type="primary" danger block size="large" htmlType="submit">
                        Save
                    </Button>

                    <ButtonInput type="submit" color='red'>
                        Save
                    </ButtonInput>
                </div> */}



                {/* <div className="mt-8">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center shrink-0 w-full px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700"
                    >
                        Approve Transaction
                    </button>
                </div>

                <div className="bg-gray-50">
                    <div className="p-6 sm:p-8">
                        <div className="sm:space-x-5 sm:flex sm:items-center sm:justify-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-6 py-4 text-xs font-bold tracking-widest text-gray-500 uppercase transition-all duration-200 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-gray-100 hover:text-gray-900 sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center flex-1 w-full px-6 py-4 mt-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg shrink-0 sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 sm:mt-0"
                            >
                                Approve Transaction
                            </button>
                        </div>
                    </div>
                </div> */}
                <div className="mt-8">
                    <ButtonInput shape="round" type="submit" size="normal" loading={false} color='indigo'>
                        Save
                    </ButtonInput>
                </div>


                {/* <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 sm:gap-x-5 gap-y-4">


                    <ButtonInput type="submit" loading={false} color='indigo'>
                        Save
                    </ButtonInput>
                    <ButtonInput shape="round" type="submit" size="normal" loading={false} color='indigo'>
                        Save
                    </ButtonInput>
                </div> */}


            </form>
        </>
    )
}

export { UpdateFormProfile }