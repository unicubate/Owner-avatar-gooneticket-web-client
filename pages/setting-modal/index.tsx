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

const Setting = () => {
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
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Setting
      </button>

      {showModal ? (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-200">
              <svg
                className="h-10 w-10 items-center text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div> */}

              <div className="p-2 flex-auto justify-center">
                {/* <div className="font-regular text-center relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                  Error message save to de db je me demande ou je suis merde
                </div> */}
                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Title donation"
                    type="text"
                    name="title"
                    placeholder="Title donation"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    row={4}
                    control={control}
                    label="Description"
                    name="description"
                    placeholder="Description coupon"
                    errors={errors}
                  />
                </div>
              </div>
              <div className="mt-2 text-center space-x-2">
                <Button
                  onClick={() => setShowModal(false)}
                  type="default"
                  size="large"
                  shape="round"
                  htmlType="button"
                  disabled={false}
                >
                  Cancel
                </Button>

                {/* <Button
                  type="primary"
                  size="large"
                  loading
                  disabled
                  shape="round"
                >
                  Please wait...
                </Button> */}

                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  danger
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* {showModal ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Deactivate account
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}

      {/* {showModal ? (
        <>
          <div classNameName="min-w-screen relative flex min-h-screen flex-col items-center justify-center bg-white pt-4">
            <div classNameName="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

            <div classNameName="fixed overflow-y-auto">
              <div classNameName="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div classNameName="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div classNameName="p-4 sm:p-10 text-center overflow-y-auto">
                   

                    <h3 classNameName="mb-2 text-2xl font-bold text-gray-800">
                      Sign out
                    </h3>
                    <p classNameName="text-gray-500">
                      Are you sure you would like to sign out of your account?
                    </p>

                    <div classNameName="mt-6 flex justify-center gap-x-4">
                      <Button
                        type="default"
                        size="large"
                        block
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="dashed"
                        size="large"
                        block
                        htmlType="submit"
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null} */}
      {/* <div classNameName="max-w-2xl mx-auto">
        <button
          classNameName="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          data-modal-toggle="authentication-modal"
        >
          Toggle login modal
        </button>

        <div
          id="authentication-modal"
          aria-hidden="true"
          classNameName="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
        >
          <div classNameName="relative w-full max-w-md px-4 h-full md:h-auto">
            <div classNameName="bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div classNameName="flex justify-end p-2">
                <button
                  type="button"
                  classNameName="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                >
                  <svg
                    classNameName="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form
                classNameName="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                action="#"
              >
                <h3 classNameName="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <div>
                  <label
                    htmlFor="email"
                    classNameName="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    classNameName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    classNameName="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    classNameName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div classNameName="flex justify-between">
                  <div classNameName="flex items-start">
                    <div classNameName="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        classNameName="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div classNameName="text-sm ml-3">
                      <label
                        htmlFor="remember"
                        classNameName="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    classNameName="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  classNameName="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div classNameName="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="#"
                    classNameName="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p classNameName="mt-5">
          This modal element is part of a larger, open-source library of
          Tailwind CSS components. Learn more by going to the official{" "}
          <a classNameName="text-blue-600 hover:underline" href="#" target="_blank">
            Flowbite Documentation
          </a>
          .
        </p>
      </div> */}

      {/* <div classNameName="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div classNameName="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div classNameName="w-full">
            <div classNameName="m-8 my-20 max-w-[400px] mx-auto">
              <div classNameName="mb-8">
                <h1 classNameName="mb-4 text-3xl font-extrabold">
                  Turn on notifications
                </h1>
                <p classNameName="text-gray-600">
                  Get the most out of Twitter by staying up to date with whats
                  happening.
                </p>
              </div>
              <div classNameName="space-y-4">
                <button classNameName="p-3 bg-black rounded-full text-white w-full font-semibold">
                  Allow notifications
                </button>
                <button classNameName="p-3 bg-white border rounded-full w-full font-semibold">
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        classNameName="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div classNameName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div classNameName="fixed inset-0 z-10 overflow-y-auto">
          <div classNameName="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div classNameName="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div classNameName="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                <div classNameName="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    classNameName="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>

                
                

                <div classNameName="sm:flex sm:items-start">
                  <div classNameName="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      classNameNameNameName="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                 

                  <div classNameName="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      classNameNameNameName="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Deactivate account
                    </h3>
                    <div classNameNameNameName="mt-2">
                      <p classNameNameNameName="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>

                </div>





              </div>
              <div classNameName="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  classNameName="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  classNameName="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PrivateComponent(Setting);
