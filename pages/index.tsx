/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/components/layout";
import { ButtonInput } from "@/components/templates/button-input";

export default function Home() {


  return (
    <Layout title="Get Donations, Memberships and Shop Sales. No Fees">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-10">


        <div className="absolute inset-0">
          <img className="object-cover w-full h-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png" alt="" />
        </div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Everything you need to make money doing what you love </h1>
            <p className="max-w-md mx-auto mt-6 text-base font-normal leading-7 text-gray-500">Accept donations. Start a membership. Sell anything you like. It’s easier than you think.</p>


            <form action="#" method="POST" className="mt-8 sm:mt-10">
              <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-300 sm:focus-within:border-gray-300">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="username"
                  className="block w-full px-4 py-4 text-gray-900 placeholder-gray-900 bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                />

                <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                  <ButtonInput shape="round" type="button" size="large" loading={false} color='indigo'>
                    Start my page
                  </ButtonInput>
                </div>
              </div>
            </form>


            <ul className="flex items-center justify-center mt-6 space-x-6 sm:space-x-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-gray-900 sm:text-sm"> It’s free, and takes less than a minute. </span>
              </li>

              {/* <li className="flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-xs font-medium text-gray-900 sm:text-sm"> Join other 1600+ Devs </span>
      </li> */}
            </ul>
          </div>
        </div>

        <div className="flex w-full gap-6 pb-8 mt-12 overflow-x-auto sm:mt-16 lg:mt-20 snap-x">
          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start lg:items-center">
                  <a href="#" title="" className="shrink-0">
                    <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-1.png" alt="" />
                  </a>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <p className="text-xs font-medium text-gray-900 lg:text-sm">
                      <a href="#" title="" className=""> Growth </a>
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                      <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start lg:items-center">
                  <a href="#" title="" className="shrink-0">
                    <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-2.png" alt="" />
                  </a>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <p className="text-xs font-medium text-gray-900 lg:text-sm">
                      <a href="#" title="" className=""> Growth </a>
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                      <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start lg:items-center">
                  <a href="#" title="" className="shrink-0">
                    <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-3.png" alt="" />
                  </a>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <p className="text-xs font-medium text-gray-900 lg:text-sm">
                      <a href="#" title="" className=""> Growth </a>
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                      <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start lg:items-center">
                  <a href="#" title="" className="shrink-0">
                    <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-4.png" alt="" />
                  </a>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <p className="text-xs font-medium text-gray-900 lg:text-sm">
                      <a href="#" title="" className=""> Growth </a>
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                      <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative snap-center scroll-ml-6 shrink-0 first:pl-6 last:pr-6">
            <div className="overflow-hidden w-[300px] lg:w-[420px] transition-all duration-200 transform bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-5">
                <div className="flex items-start lg:items-center">
                  <a href="#" title="" className="shrink-0">
                    <img className="lg:h-24 w-14 h-14 lg:w-24 rounded-xl object-cvoer" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-5.png" alt="" />
                  </a>

                  <div className="flex-1 ml-4 lg:ml-6">
                    <p className="text-xs font-medium text-gray-900 lg:text-sm">
                      <a href="#" title="" className=""> Growth </a>
                    </p>
                    <p className="mt-2 text-sm font-bold text-gray-900 lg:text-lg group-hover:text-gray-600">
                      <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">April 09, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>




    </Layout>
  );
}
