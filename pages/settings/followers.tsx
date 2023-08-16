import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Avatar, Button, Card, Col, List, Pagination, Popconfirm, Row } from "antd";
import { DeleteOutlined, DownloadOutlined, EditOutlined, FundViewOutlined, PoweroffOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ButtonInput } from "@/components/templates/button-input";
import { useState } from "react";
import { arrayPeoples } from "@/components/mock";


const Followers = () => {
    const [peopleArrays] = useState(arrayPeoples)
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
            <LayoutDashboard title={"Followers"}>


                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Followers</h1>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                <HorizontalNavSetting />



                                <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">

                                    <div className="flow-root">

                                        <div className="overflow-hidden bg-white border border-gray-200">
                                            <div className="px-4 py-5">

                                                <div className="sm:flex sm:items-center sm:justify-between">
                                                    <p className="text-base font-bold text-gray-900">Followers</p>
                                                </div>

                                                {peopleArrays.map((person, index) => (
                                                    <>
                                                        <hr className="mt-1 border-gray-200" />
                                                        <div key={index} className="py-5">
                                                            <div className="flex items-center">
                                                                <div className="relative flex-shrink-0 cursor-pointer">
                                                                    <Avatar size="large" src={person?.image} alt={person?.name} />
                                                                </div>

                                                                <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                                                                    <p className="text-sm font-bold text-gray-900">{person?.name}</p>
                                                                    <p className="mt-1 text-sm font-medium text-gray-500">{person?.email}</p>
                                                                </div>

                                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                                    <ButtonInput shape="default" type="submit" size="normal" loading={false} color={'indigo'}>
                                                                        Following
                                                                    </ButtonInput>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                ))}


                                            </div>
                                        </div>




                                        {/* </div> */}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>


        </>
    );
};

export default PrivateComponent(Followers);
