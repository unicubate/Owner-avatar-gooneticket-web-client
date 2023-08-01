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
import {
  BsBell,
  BsBookmark,
  BsTwitter,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { cookies, headers } from "next/headers";
import Layout from "@/components/layout";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "View page",
    icon: BsBell,
  },
  {
    title: "Setting",
    icon: HiOutlineHashtag,
  },
];

const PUBLISH_ITEMS = [
  {
    title: "Articles",
    icon: BiHomeCircle,
  },
  {
    title: "Donations",
    icon: HiOutlineHashtag,
  },
  {
    title: "Gifts",
    icon: BsBell,
  },
];

const SUPPORT_ITEMS = [
  {
    title: "Payments History",
    icon: BiHomeCircle,
  },
  {
    title: "Messages",
    icon: HiOutlineHashtag,
  },
  {
    title: "My Supporters",
    icon: BsBell,
  },
];

const Settings = () => {
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

<div className="flex flex-col">
    <header className="">
        <div className="py-3 bg-gray-900">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between">
                    <div className="block -m-2 lg:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 text-white bg-gray-900 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex-shrink-0 ml-4 mr-4 lg:ml-0">
                        <a href="#" title="" className="flex items-center">
                            <img className="hidden w-auto h-8 lg:block" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-alt.svg" alt="" />
                            <img className="block w-auto h-8 lg:hidden" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg" alt="" />
                        </a>
                    </div>

                    <div className="flex-1 max-w-xs ml-auto lg:hidden">
                        <label className="sr-only"> Search </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>

                            <input type="search" name="" id="" className="border block w-full py-2 pl-10 text-white placeholder-gray-400 bg-gray-900 border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search here" />
                        </div>
                    </div>

                    <div className="flex items-center ml-4 lg:ml-0">
                        <button type="button" className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900" id="options-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="flex items-center justify-between w-full">
                                <span className="flex items-center justify-between min-w-0 space-x-3">
                                    <img className="flex-shrink-0 object-cover bg-gray-700 rounded-full w-7 h-7" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female-4.png" alt="" />
                                    <span className="flex-1 hidden min-w-0 md:flex">
                                        <span className="text-sm font-medium text-white truncate"> Wade Warren </span>
                                    </span>
                                </span>
                                <svg className="flex-shrink-0 w-4 h-4 ml-2 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="hidden py-3 bg-white border-b border-gray-200 lg:block">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between space-x-6">
                    <div className="flex items-center space-x-2 xl:space-x-4">
                        <a href="#" title="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Dashboard
                        </a>

                        <a href="#" title="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Analytics
                            <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>

                        <a href="#" title="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                            Products
                            <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>

                        <a href="#" title="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            Customers
                            <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>

                        <a href="#" title="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6 mr-2 -ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Support
                            <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>

                    <div className="flex-1 hidden max-w-xs ml-auto lg:block">
                        <label className="sr-only"> Search </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>

                            <input type="search" name="" id="" className="border block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

        <div className="flex-1">
            <main>
                <div className="py-6">
                    <div className="px-4 mx-auto max-w-7xl">
                        <div className="max-w-md">
                            <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                            <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis morbi pulvinar venenatis non.</p>
                        </div>
                    </div>

                    <div className="px-4 mx-auto mt-8 max-w-7xl">
                        <div className="w-full pb-1 overflow-x-auto">
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px space-x-10">
                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Profile </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Password </a>

                                    <a href="#" className="py-4 text-sm font-medium text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap"> Team </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Notification </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Integrations </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Licenses </a>
                                </nav>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-base font-bold text-gray-900">Teams you are on</p>
                                        <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold leading-4 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                        >
                                            Join Another Team
                                        </button>
                                    </div>
                                </div>

                                <div className="flow-root mt-8">
                                    <div className="-my-5 divide-y divide-gray-100">
                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/rareblocks-logo.png" alt="" />
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Rareblocks</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">3 members</p>
                                                </div>

                                                <div className="ml-auto">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/astrona-logo.png" alt="" />
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Astrona</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">12 members</p>
                                                </div>

                                                <div className="ml-auto">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-base font-bold text-gray-900">Team Members</p>
                                        <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold leading-4 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                        >
                                            Add New Member
                                        </button>
                                    </div>
                                </div>

                                <div className="flow-root mt-8">
                                    <div className="-my-5 divide-y divide-gray-100">
                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female.png" alt="" />
                                                    <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Arlene McCoy</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">@arlenemc</p>
                                                </div>

                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                    <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female-2.png" alt="" />
                                                    <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-gray-300 border-2 border-white rounded-full"></div>
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Darrell Steward</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">@darrellsteward</p>
                                                </div>

                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                    <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female-3.png" alt="" />
                                                    <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Marvin McKinney</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">@marvinmc</p>
                                                </div>

                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                    <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-male.png" alt="" />
                                                    <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Floyd Miles</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">@floydmiles</p>
                                                </div>

                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                    <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-male-2.png" alt="" />
                                                    <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-gray-300 border-2 border-white rounded-full"></div>
                                                </div>

                                                <div className="ml-4">
                                                    <p className="text-sm font-bold text-gray-900">Albert Flores</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-500">@albertfl</p>
                                                </div>

                                                <div className="flex items-center justify-end ml-auto space-x-8">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                    <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    </>
  );
};

export default PrivateComponent(Settings);
