import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../util/form';
import { ButtonInput } from '../templates/button-input';
import { getOneUserAPI } from '@/pages/api/user';

type Props = {
    userId: string
}

const schema = yup.object({
    username: yup.string().required(),
});

const UpdateFormUser: React.FC<Props> = ({ userId }) => {
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


    const fetchOneUser = async () =>
        await getOneUserAPI({ userId: userId });
    const { data: userItem } = useQuery(["user", userId], () => fetchOneUser(), {
        refetchOnWindowFocus: false,
        enabled: Boolean(userId),
    });
    const user: any = userItem?.data;


    useEffect(() => {
        if (user) {
            const fields = ['username'];
            fields?.forEach((field: any) => setValue(field, user[field]));
        }
    }, [user, userId, setValue]);


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
                        <div className="mt-2">
                            <TextInput
                                control={control}
                                label="Username"
                                type="text"
                                name="username"
                                placeholder="username"
                                errors={errors}
                                prefix={`${process.env.NEXT_PUBLIC_SITE}/`}
                            />
                        </div>
                    </div>

                </div>


                <div className="mt-8">
                    <ButtonInput shape="round" type="submit" size="normal" loading={loading} color={loading ? 'gray' : user?.profile?.color}>
                        Save changes
                    </ButtonInput>
                </div>

            </form>
        </>
    )
}

export { UpdateFormUser }