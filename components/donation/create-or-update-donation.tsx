import { NumberInput, TextAreaInput, TextInput } from '../util/form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { CloseOutlined } from '@ant-design/icons';
import { ButtonInput } from '../templates/button-input';

const schema = yup.object({
    amount: yup.number().required(),
    title: yup.string().optional(),
    description: yup.string().optional(),
});



const CreateOrUpdateDonation: React.FC<{ showModal: boolean, setShowModal: any }> = ({ showModal, setShowModal }) => {

    const {
        control,
        register,
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
            {showModal ? (
                <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                    <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                                <CloseOutlined />
                            </span>
                        </button>
                        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 flex-auto justify-center">
                                {/* <div className="font-regular text-center relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                                    Error message save to de db je me demande ou je suis merde
                                </div> */}
                                <div className="mb-4">
                                    <NumberInput
                                        control={control}
                                        label="Amount"
                                        type="number"
                                        name="amount"
                                        placeholder="Amount donation"
                                        errors={errors}
                                        required
                                        prefix={'€'}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextInput
                                        control={control}
                                        label="Title"
                                        type="text"
                                        name="title"
                                        placeholder="Title donation"
                                        errors={errors}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextAreaInput
                                        control={control}
                                        label="Description"
                                        name="description"
                                        placeholder="Description donation"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <div className="mt-2 text-center space-x-2">
                                <ButtonInput shape="default" type="submit" size="normal" loading={false} color={'indigo'}>
                                    Save
                                </ButtonInput>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export { CreateOrUpdateDonation }