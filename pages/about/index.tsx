import { LayoutSite } from '@/components/layout-site';
import { Image } from 'antd';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

const faqs = [
  {
    id: 'ed589200-fd6f-4740-bdf4-6deade38cfc8',
    title: 'Q. Does this theme supports plugins?',
    description: `
        It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
  {
    id: '9d0681d0-8d1f-4069-be43-1df594fb6d2a',
    title: 'Ask everything you need to know about our products and services.',
    description: `
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
  {
    id: '9d0681d0-2354-09876-ytm-1df594fb6d2a',
    title: 'Ask everything you need to know about our products and services.',
    description: `
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
];
const About = () => {
  const [username, setUsername] = useState('Boclair Temgoua');
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log('payload =======>', payload);
  };

  return (
    <>
      {/* <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">



        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">


          <div className="bg-gray-50">
            <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
                  <div>
                    <div className="text-center lg:text-left">
                      <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">A supporter is worth a thousand followers.</h1>
                      <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">Accept donations. Start a membership. Sell anything you like. It’s easier than you think.</p>

                      <form action="#" method="POST" className="mt-8 sm:mt-10">
                        <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-900 sm:focus-within:border-gray-900">
                          <input
                            type="email"
                            name=""
                            id=""
                            placeholder="Enter email address"
                            className="block w-full px-4 py-4 text-gray-900 placeholder-gray-900 bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"

                          />
                          <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                            <button type="submit" className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-gray-600 font-pj hover:bg-gray-600">Get Free Card</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                      <div className="flex items-center">
                        <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">2943</p>
                        <p className="ml-3 text-sm text-gray-900 font-pj">Cards<br />Delivered</p>
                      </div>

                      <div className="hidden sm:block">
                        <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                          <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                          <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                          <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                          <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                        </svg>
                      </div>

                      <div className="flex items-center">
                        <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">$1M+</p>
                        <p className="ml-3 text-sm text-gray-900 font-pj">Transaction<br />Completed</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Image className="w-full" src="https://d33wubrfki0l68.cloudfront.net/d6f1462500f7670e0db6b76b35054a081679a5a0/0ce15/images/hero/5.1/illustration.png" alt="" />
                  </div>
                </div>
              </div>
            </section>
          </div>





          <div className="grid grid-cols-1 text-center sm:grid-cols-2 gap-y-8 lg:grid-cols-4 sm:gap-12">
            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-blue-100 rounded-full">
                <svg className="text-blue-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
              <p className="mt-4 text-sm text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-orange-100 rounded-full">
                <svg className="text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
              <p className="mt-4 text-sm text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
                <svg className="text-green-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
              <p className="mt-4 text-sm text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full">
                <svg className="text-red-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Filter Blocks</h3>
              <p className="mt-4 text-sm text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>
          </div>

        </div>

      </LayoutSite> */}

      <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="absolute inset-0">
            <Image
              className="size-full object-cover"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png"
              alt=""
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                About {username} page{' '}
              </h1>
              <p className="mx-auto mt-6 max-w-md text-base font-normal leading-7 text-gray-500">
                Accept donations. Start a membership. Sell anything you like.
                It’s easier than you think.
              </p>

              <form action="#" method="POST" className="mt-8 sm:mt-10">
                <div className="group relative p-2 sm:rounded-xl sm:border sm:border-gray-400 sm:focus-within:border-gray-900 sm:focus-within:ring-1 sm:focus-within:ring-gray-900">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="username"
                    className="block w-full rounded-xl border border-gray-400 bg-transparent p-4 text-gray-900 outline-none placeholder:text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:border-none sm:focus:border-transparent sm:focus:ring-0"
                  />

                  <div className="mt-4 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:flex sm:items-center sm:pr-2">
                    <button
                      type="submit"
                      className="font-pj inline-flex rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    >
                      {' '}
                      Start my page
                    </button>
                  </div>
                </div>
              </form>

              <ul className="mt-6 flex items-center justify-center space-x-6 sm:space-x-8">
                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm"> It’s free, and takes less than a minute. </span>
                </li> */}

                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-medium text-gray-900 sm:text-sm"> Join other 1600+ Devs </span>
                </li> */}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex w-full snap-x gap-6 overflow-x-auto pb-8 sm:mt-16 lg:mt-20">
            <div className="relative shrink-0 snap-center scroll-ml-6 first:pl-6 last:pr-6">
              <div className="w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:w-[420px]">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <Image
                        className="object-cvoer size-14 rounded-xl lg:size-24"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-1.png"
                        alt=""
                      />
                    </a>

                    <div className="ml-4 flex-1 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          {' '}
                          Growth{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 group-hover:text-gray-600 lg:text-lg">
                        <a href="#" title="" className="">
                          {' '}
                          How a visual artist redefines success in graphic
                          design{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 snap-center scroll-ml-6 first:pl-6 last:pr-6">
              <div className="w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:w-[420px]">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <Image
                        className="object-cvoer size-14 rounded-xl lg:size-24"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-2.png"
                        alt=""
                      />
                    </a>

                    <div className="ml-4 flex-1 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          {' '}
                          Growth{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 group-hover:text-gray-600 lg:text-lg">
                        <a href="#" title="" className="">
                          {' '}
                          How a visual artist redefines success in graphic
                          design{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 snap-center scroll-ml-6 first:pl-6 last:pr-6">
              <div className="w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:w-[420px]">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <Image
                        className="object-cvoer size-14 rounded-xl lg:size-24"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-3.png"
                        alt=""
                      />
                    </a>

                    <div className="ml-4 flex-1 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          {' '}
                          Growth{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 group-hover:text-gray-600 lg:text-lg">
                        <a href="#" title="" className="">
                          {' '}
                          How a visual artist redefines success in graphic
                          design{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 snap-center scroll-ml-6 first:pl-6 last:pr-6">
              <div className="w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:w-[420px]">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <Image
                        className="object-cvoer size-14 rounded-xl lg:size-24"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-4.png"
                        alt=""
                      />
                    </a>

                    <div className="ml-4 flex-1 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          {' '}
                          Growth{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 group-hover:text-gray-600 lg:text-lg">
                        <a href="#" title="" className="">
                          {' '}
                          How a visual artist redefines success in graphic
                          design{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 snap-center scroll-ml-6 first:pl-6 last:pr-6">
              <div className="w-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:w-[420px]">
                <div className="px-4 py-5 sm:p-5">
                  <div className="flex items-start lg:items-center">
                    <a href="#" title="" className="shrink-0">
                      <Image
                        className="object-cvoer size-14 rounded-xl lg:size-24"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/thumbnail-5.png"
                        alt=""
                      />
                    </a>

                    <div className="ml-4 flex-1 lg:ml-6">
                      <p className="text-xs font-medium text-gray-900 lg:text-sm">
                        <a href="#" title="" className="">
                          {' '}
                          Growth{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 group-hover:text-gray-600 lg:text-lg">
                        <a href="#" title="" className="">
                          {' '}
                          How a visual artist redefines success in graphic
                          design{' '}
                        </a>
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-500 lg:text-sm">
                        April 09, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-28">

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Meet the creative team</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 px-8 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex items-center">
                    <Image className="object-cover w-16 h-16 rounded-full shrink-0" src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-1.png" alt="" />
                    <div className="flex-1 ml-4">
                      <p className="text-base font-bold text-gray-900">Albert Flores</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex items-center">
                    <Image className="object-cover w-16 h-16 rounded-full shrink-0" src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-2.png" alt="" />
                    <div className="flex-1 ml-4">
                      <p className="text-base font-bold text-gray-900">Ralph Edwards</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex items-center">
                    <Image className="object-cover w-16 h-16 rounded-full shrink-0" src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-3.png" alt="" />
                    <div className="flex-1 ml-4">
                      <p className="text-base font-bold text-gray-900">Theresa Webb</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex items-center">
                    <Image className="object-cover w-16 h-16 rounded-full shrink-0" src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-4.png" alt="" />
                    <div className="flex-1 ml-4">
                      <p className="text-base font-bold text-gray-900">Jane Cooper</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div> */}

          {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-36">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">All the features you need</h2>
            </div>

            <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-blue-100" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                  </svg>
                  <svg className="absolute text-blue-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-orange-100" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                  </svg>
                  <svg className="absolute text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-green-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                  </svg>
                  <svg className="absolute text-green-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-purple-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                  </svg>
                  <svg className="absolute text-purple-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-gray-100" width="65" height="70" viewBox="0 0 65 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z" />
                  </svg>
                  <svg className="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-yellow-100" width="78" height="78" viewBox="0 0 78 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z" />
                  </svg>
                  <svg className="absolute text-yellow-500 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-gray-100" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z"></path>
                  </svg>
                  <svg className="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-rose-100" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                  </svg>
                  <svg className="absolute text-rose-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div className="relative flex items-center justify-center mx-auto">
                  <svg className="text-lime-100" width="62" height="65" viewBox="0 0 62 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.0264C0 33.4609 8.06546 64.0264 28.5 64.0264C48.9345 64.0264 62 50.4604 62 30.0259C62 9.59135 59.4345 4.0256 39 4.0256C18.5655 4.0256 0 -7.40819 0 13.0264Z" />
                  </svg>

                  <svg className="absolute text-lime-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>
            </div>
          </div> */}
        </div>
      </LayoutSite>
    </>
  );
};

export default About;
