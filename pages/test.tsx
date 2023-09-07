/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  Button,
  Checkbox,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Result,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  LockOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextInput,
  NumberInput,
  DateInput,
  TextInputPassword,
  TextAreaInput,
  SelectInput,
} from "@/components/util/form";
import dayjs from "dayjs";
import { SwitchInput } from "@/components/util/form/switch-input";
import type { RcFile } from "antd/es/upload";
import { LayoutSite } from "@/components/layout-site";
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { Editor } from 'react-draft-wysiwyg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const { Option } = Select;

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .optional(),
  password: yup.string().optional(),
  description: yup.string().optional(),
  currency: yup.string().optional(),
  country: yup.string().optional(),
  age: yup.number().optional(),
  birthday: yup.date().min(new Date(), "Please choose future date").optional(),
  confirm: yup
    .boolean()
    .oneOf([true], "Please check the box to deactivate your account")
    .optional(),
  confirmSwitch: yup.boolean().optional(),
});

type UserModelForm = {
  email?: string;
  age?: number;
  confirm: boolean;
  confirmSwitch: boolean;
  birthday?: Date;
  password?: string;
  currency?: string;
  attachment?: any;
  description?: string;
};

// const fileList: UploadFile[] = [
//   {
//     uid: "-1",
//     name: "yyy.png",
//     status: "done",
//     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     thumbUrl:
//       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//   },
// ];

export default function Home() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserModelForm> = (payload: UserModelForm) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };


  const editor = withReact(createEditor());

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  return (
    <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
      {/* <div className="space-y-3 lg:mx-0">
      <StoryBoard />
      <Feed />
    </div>
    <Panel /> */}

      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <Controller
          name="content"
          control={control}
          defaultValue="" // Vous pouvez définir une valeur par défaut ici
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow" // Vous pouvez personnaliser le thème ici
              modules={{
                toolbar: false, // Masquer la barre d'outils pour le rendre similaire à un textarea
              }}
            />
          )}
        />

        <Result
          status="success"
          title="Success"
          subTitle="Registration completed successfully"
          extra={[
            <Button type="primary" key="console">
              Home
            </Button>,
            <Button key="buy">Profile</Button>,
          ]}
        />

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <h6 className="mt-3 text-xl text-center font-bold">Register</h6>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={"Currency"}
            >
              Image upload
            </label>
            <Controller
              name="attachment"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <div className="text-center justify-center mx-auto">
                    <Upload
                      //action=""
                      name="attachment"
                      listType="picture-card"
                      maxCount={1}
                      className="upload-list-inline"
                      onChange={onChange}
                      defaultFileList={[...fileList]}
                    >
                      {fileList.length > 0 ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                      {/* <Button
                        size="large"
                        style={{ width: "100%" }}
                        icon={<UploadOutlined />}
                        className="text-center"
                      >
                        Upload Profile
                      </Button> */}
                    </Upload>
                  </div>
                  {/* <div className="flex items-center">
                    <div className="flex">
                      <Checkbox checked={value} onChange={onChange} />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-700 font-bold"
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                </>
              )}
            />

            {/* <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={1}
              defaultFileList={[...fileList]}
              className="upload-list-inline"
            >
              <Button
                size="large"
                style={{ width: "100%" }}
                icon={<UploadOutlined />}
                className="text-center"
              >
                Upload
              </Button>
            </Upload> */}
          </div>

          <div className="mb-4">
            <SelectInput
              firstOptionName="Choose currency"
              label="Currency"
              optionType="currency"
              control={control}
              errors={errors}
              placeholder="Select currency"
              name="currency"
              dataItem={[
                { name: "Euro", code: "EUR" },
                { name: "XAF", code: "Franck CFA" },
              ]}
            />
          </div>

          <div className="mb-4">
            <NumberInput
              control={control}
              label="Age"
              type="number"
              name="age"
              placeholder="Age Address"
              errors={errors}
            />
          </div>
          <div className="mb-4">
            <TextInput
              control={control}
              label="Email"
              type="text"
              name="email"
              placeholder="Email Address"
              errors={errors}
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </div>

          <div className="mb-4">
            <DateInput
              control={control}
              label="Birthday date"
              placeholder="Birthday date"
              name="birthday"
              errors={errors}
            />
          </div>

          

          {/* <Controller
            name="editorContent"
            control={control}
            render={({ field }) => (
              <Slate editor={editor} initialValue={initialValue} onChange={field.onChange}>
                <Editable />
              </Slate>
            )}
          /> */}

          <div className="mb-4">
            <Controller
              name="country"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <Select
                    showSearch
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      onChange(value);
                    }}
                  >
                    <Option value="china" label="China">
                      <Space>
                        <span role="img" aria-label="China">
                          🇨🇳
                        </span>
                        China (中国)
                      </Space>
                    </Option>
                  </Select>
                </>
              )}
            />
          </div>

          <div className="mb-4">
            <TextInputPassword
              control={control}
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              errors={errors}
              icon={<LockOutlined className="site-form-item-icon" />}
            />
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm mb-2 dark:text-white"
              >
                Password
              </label>
              <Link
                className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                href="./forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <TextInputPassword
              control={control}
              label="Confirm Password"
              type="password"
              name="password"
              placeholder="Confirm Password"
              errors={errors}
              icon={<LockOutlined className="site-form-item-icon" />}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="confirm"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <div className="flex items-center">
                    <div className="flex">
                      <Checkbox checked={value} onChange={onChange} />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-700 font-bold"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </>
              )}
            />

            {/* {errors?.confirm && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.confirm?.message}
              </span>
            )} */}
          </div>

          {/* <label
            className="inline-block pl-[0.15rem] opacity-50 hover:pointer-events-none"
            htmlFor="flexSwitchCheckCheckedDisabled"
          >
            Disabled checked switch checkbox
          </label>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] disabled:cursor-default disabled:opacity-60 dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckCheckedDisabled"
            checked
            disabled
          /> */}

          <div className="mb-4">
            <SwitchInput
              control={control}
              name="confirmSwitch"
              label="Note Tailwind Components"
            />
          </div>

          <div className="mb-4">
            <TextAreaInput
              row={4}
              control={control}
              label="Description"
              name="description"
              placeholder="Confirm Password"
              errors={errors}
            />
          </div>

          <div className="mt-6">
            {/* <Button type="primary" size="large" loading block>
              Loading
            </Button> */}

            <Button type="primary" size="large" block htmlType="submit">
              Register
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            or login with Social Media
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <a
          href="#"
          className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#FFC107"
            />
            <path
              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
              fill="#FF3D00"
            />
            <path
              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
              fill="#4CAF50"
            />
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#1976D2"
            />
          </svg>

          <span className="mx-2 font-bold">Sign in with Google</span>
        </a>

        <a
          href="#"
          className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6 mx-2" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>

          <span className="mx-2 font-bold">Sign in with GitHub</span>
        </a>

        <p className="mt-8 text-xs font-light text-center text-gray-400 hover:underline cursor-pointer">
          {" "}
          Already have an account? Log in here
        </p>
      </div>

      {/* <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="" alt="" />
          </div>

          <h6 className="mt-3 text-xl text-center font-bold">Register</h6>

          <a
            href="#"
            className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span className="mx-2 font-bold">Sign in with Google</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-center mt-4 px-6 py-3 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>

            <span className="mx-2 font-bold">Sign in with GitHub</span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <div className="flex">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="remember-me"
                  className="text-sm text-gray-700 font-bold"
                >
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-6 py-3 bg-indigo-500 text-white text-sm font-bold rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>

      </div> */}
      {/* <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 94 }} /> */}
    </LayoutSite>
  );
}
