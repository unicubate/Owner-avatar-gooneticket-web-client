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
    userId: string
}

const schema = yup.object({
    oldPassword: yup.string().optional(),
    newPassword: yup.string().optional(),
    confirmPassword: yup.string().optional(),
});

const UpdateFormPassword: React.FC<Props> = ({ userId }) => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });



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

                <h2 className="text-base font-bold text-gray-900"> Change password </h2>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-3 gap-y-5 gap-x-6">
                    <div>
                        <div className="mt-2">
                            <TextInputPassword
                                label="Old password"
                                control={control}
                                type="password"
                                name="oldPassword"
                                placeholder="Old password"
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <TextInputPassword
                                label="New password"
                                control={control}
                                type="password"
                                name="newPassword"
                                placeholder="New password"
                                errors={errors}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600"> Confirm password </label>
                        <div className="mt-2">
                            <TextInputPassword
                                control={control}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
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

export { UpdateFormPassword }