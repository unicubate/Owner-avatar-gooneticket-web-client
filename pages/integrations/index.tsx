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

const Integrations = () => {
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



<div>
    <div className="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-gray-900">
            <div className="flex items-center flex-shrink-0 px-4">
                <img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-alt.svg" alt="" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-8">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                    <Link href="/dashboard"  title="" className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group">
                              <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Dashboard
                          </Link>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Tickets
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Agents
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Customers
                            <svg className="w-4 h-6 ml-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </nav>

                    <hr className="border-gray-700" />

                    <nav className="flex-1 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Products
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Orders
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Analytics
                            <svg className="w-4 h-6 ml-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </nav>

                    <hr className="border-gray-700" />

                    <nav className="flex-1 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-white rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </a>
                    </nav>
                </div>

                <div className="pb-4 mt-auto">
                    <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg hover:bg-gray-700">
                        <img className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-female.png" alt="" />
                        Mariana Jones
                        <svg className="w-5 h-5 ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div className="flex flex-col flex-1 xl:pl-64">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200">
            <div className="flex flex-1 px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between flex-1 lg:justify-end">
                    <div className="flex items-center -m-2 xl:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex ml-4 mr-auto xl:ml-0">
                        <div className="flex items-center flex-shrink-0">
                            <img className="block w-auto h-8 xl:hidden" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="" />
                        </div>
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

                    <div className="flex items-center space-x-6 sm:ml-5">
                        <div className="relative">
                            <button type="button" className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                            <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white"> 2 </span>
                        </div>

                        <div className="relative">
                            <button type="button" className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>
                        </div>

                        <button type="button" className="flex items-center max-w-xs rounded-full xl:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                            <img className="object-cover bg-gray-300 rounded-full w-9 h-9" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/2/avatar-male.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <main>
            <div className="py-6">
                <div className="px-4 mx-auto sm:px-6 md:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                </div>

                <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                    <div className="w-full pb-1 overflow-x-auto">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px space-x-10">
                                <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Profile </a>

                                <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Password </a>

                                <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Team </a>

                                <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Notification </a>

                                <a href="#" className="py-4 text-sm font-medium text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap"> Integrations </a>

                                <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Licenses </a>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-8 border border-indigo-300 rounded-lg bg-indigo-50">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="md:flex md:items-center md:justify-between">
                                <img className="flex-shrink-0 object-cover w-16 h-16 rounded-lg" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/avatar-female.png" alt="" />
                                <div className="flex-1 max-w-xs mt-4 md:mt-0 md:ml-6">
                                    <p className="text-base font-bold text-gray-900">Learn how to connect new apps with Rareblocks API</p>
                                    <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consec tetur.</p>
                                </div>

                                <div className="flex items-center justify-start mt-6 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 md:order-last"
                                    >
                                        View Tutorial
                                    </button>

                                    <button type="button" className="text-sm font-medium text-gray-500 transition-all duration-200 hover:text-gray-900 md:order-first">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-base font-bold text-gray-900">Connect Apps</p>
                            <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                            <label className="sr-only"> Search App </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>

                                <input type="search" name="" id="" className="border block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search App" />
                            </div>
                        </div>
                    </div>

                    <div className="flow-root mt-8">
                        <div className="-my-5 divide-y divide-gray-200">
                            <div className="py-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/mailchimp-logo.png" alt="" />
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm font-bold text-gray-900 truncate">Mailchimp</p>
                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                        <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                        <button
                                            type="button"
                                            className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"
                                         
                                        >
                                            <span className="sr-only">Enable</span>
                                            <span
                                                aria-hidden="true"
                                                className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"
                                              
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="py-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/zapier-logo.png" alt="" />
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm font-bold text-gray-900 truncate">Zapier</p>
                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectes.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                        <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                        <button
                                            type="button"
                                            className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"
                                          
                                        >
                                            <span className="sr-only">Enable</span>
                                            <span
                                                aria-hidden="true"
                                                className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"
                                           
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="py-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/telegram-logo.png" alt="" />
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm font-bold text-gray-900 truncate">Telegram</p>
                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                        <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                        <button
                                            type="button"
                                            className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"
                         
                                        >
                                            <span className="sr-only">Enable</span>
                                            <span
                                                aria-hidden="true"
                                                className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"
                                            
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="py-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/slack-logo.png" alt="" />
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm font-bold text-gray-900 truncate">Slack</p>
                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                        <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                        <button
                                            type="button"
                                            className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"
                                          
                                        >
                                            <span className="sr-only">Enable</span>
                                            <span
                                                aria-hidden="true"
                                                className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"
                                             
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="py-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/dropbox-logo.png" alt="" />
                                        <div className="flex-1 min-w-0 ml-4">
                                            <p className="text-sm font-bold text-gray-900 truncate">Dropbox</p>
                                            <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet adipis.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                        <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                        <button
                                            type="button"
                                            className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"
                                           
                                        >
                                            <span className="sr-only">Enable</span>
                                            <span
                                                aria-hidden="true"
                                                className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"
                                               
                                            ></span>
                                        </button>
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



      {/* <Layout title="Get Donations, Memberships and Shop Sales. No Fees">
        <div classNameNameName="w-full h-full flex justify-center items-center relative">
          <div classNameNameName="max-w-screen-lg w-full h-full flex relative">
        
            <section classNameNameName="w-[20%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
              <div classNameNameName="flex flex-col items-stretch h-full space-y-4 mt-4">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <Link
                    classNameNameName="hover:bg-white/10 text-xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl"
                    href={
                      item.title.toLocaleLowerCase() === "home"
                        ? "/"
                        : `/${item.title.toLowerCase()}`
                    }
                    key={index}
                  >
                    <div>
                      <item.icon />
                    </div>
                    {<div>{item.title}</div>}
                  </Link>
                ))}
                <div classNameNameName="">PUBLISH</div>
              </div>
            </section>
          </div>
        </div>
      </Layout> */}
    </>
  );
};

export default PrivateComponent(Integrations);
