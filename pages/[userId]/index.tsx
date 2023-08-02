import { PrivateComponent } from "@/components/util/session/private-component";
import {
  AppstoreOutlined,
  CopyOutlined,
  DashOutlined,
  MailOutlined,
  PauseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Input, Menu, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextAreaInput, TextInput } from "@/components/util/form";
import { PublicComponent } from "@/components/util/session/public-component";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .optional(),
  password: yup.string().optional(),
  description: yup.string().optional(),
});

const ProfilePublic = () => {
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [showModal, setShowModal] = useState(false);

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleCancel = () => {
    setModal2Open(false);
  };

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
      <div className="py-12 bg-gray-900 sm:pb-6 sm:pt-16 lg:pt-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-stretch justify-between sm:items-center">
              <img
                className="object-cover w-32 h-auto sm:-mb-14 shrink-0 rounded-xl"
                src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/mint-success/3/image.png"
                alt=""
              />

              <div className="flex flex-col justify-between flex-1 ml-8 sm:flex-row sm:items-center sm:space-x-6">
                <div className="sm:flex-1">
                  <p className="text-xl font-bold text-white">Sad Ape #258</p>
                  <p className="mt-1 text-base font-medium text-gray-400">
                    Lorem ipsum dolor sit amet elit
                  </p>
                </div>

                <div className="mt-auto sm:ml-auto sm:mt-0">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-xs font-bold tracking-widest text-gray-500 uppercase transition-all duration-200 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-gray-100 hover:text-gray-900"
                    role="button"
                  >
                    View on Opensea
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                <a
                  href="#"
                  className="px-0 py-4 text-xs font-bold tracking-wide text-gray-400 uppercase border-b-2 border-gray-900 sm:pr-10 whitespace-nowrap"
                  aria-current="page"
                >
                  {" "}
                  Details{" "}
                </a>

                <a
                  href="#"
                  className="px-0 py-4 text-xs font-bold tracking-wide text-gray-400 uppercase border-b-2 border-transparent sm:pr-10 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                >
                  {" "}
                  Description{" "}
                </a>

                <a
                  href="#"
                  className="px-0 py-4 text-xs font-bold tracking-wide text-gray-400 uppercase border-b-2 border-transparent sm:pr-10 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
                >
                  {" "}
                  Purchase History{" "}
                </a>
              </nav>
            </div>

            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                <li className="flex items-center justify-between py-5">
                  <p className="text-sm font-medium text-gray-600">Name:</p>
                  <p className="text-sm font-bold text-gray-900">Ramron</p>
                </li>

                <li className="flex items-center justify-between py-5">
                  <p className="text-sm font-medium text-gray-600">Backdrop:</p>
                  <p className="text-sm font-bold text-gray-900">Blue-Green</p>
                </li>

                <li className="flex items-center justify-between py-5">
                  <p className="text-sm font-medium text-gray-600">
                    Facial Expression:
                  </p>
                  <p className="text-sm font-bold text-gray-900">Sad</p>
                </li>

                <li className="flex items-center justify-between py-5">
                  <p className="text-sm font-medium text-gray-600">
                    Body Color:
                  </p>
                  <p className="text-sm font-bold text-gray-900">Black-White</p>
                </li>

                <li className="flex items-center justify-between py-5">
                  <p className="text-sm font-medium text-gray-600">
                    Accessories:
                  </p>
                  <p className="text-sm font-bold text-gray-900">Glasses</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePublic;
