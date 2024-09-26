import { PrivateComponent } from '@/components/util/private-component';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { BiHomeCircle } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { HiOutlineHashtag } from 'react-icons/hi';

const NAVIGATION_ITEMS = [
  {
    title: 'Home',
    icon: BiHomeCircle,
  },
  {
    title: 'View page',
    icon: BsBell,
  },
  {
    title: 'Setting',
    icon: HiOutlineHashtag,
  },
];

const PUBLISH_ITEMS = [
  {
    title: 'Articles',
    icon: BiHomeCircle,
  },
  {
    title: 'Donations',
    icon: HiOutlineHashtag,
  },
  {
    title: 'Gifts',
    icon: BsBell,
  },
];

const SUPPORT_ITEMS = [
  {
    title: 'Payments History',
    icon: BiHomeCircle,
  },
  {
    title: 'Messages',
    icon: HiOutlineHashtag,
  },
  {
    title: 'My Supporters',
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

    console.log('payload =======>', payload);
  };

  return (
    <>
      <div>
        <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-64 xl:flex-col">
          <div className="flex grow flex-col overflow-y-auto bg-gray-900 pt-5">
            <div className="flex shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/logo-alt.svg"
                alt=""
              />
            </div>

            <div className="mt-8 flex flex-1 flex-col px-3">
              <div className="space-y-4">
                <nav className="flex-1 space-y-2">
                  <Link
                    href="/dashboard"
                    title=""
                    className="group flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </Link>

                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Tickets
                  </a>

                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Agents
                  </a>

                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Customers
                    <svg
                      className="ml-auto h-6 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                </nav>

                <hr className="border-gray-700" />

                <nav className="flex-1 space-y-2">
                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Products
                  </a>

                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Orders
                  </a>

                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Analytics
                    <svg
                      className="ml-auto h-6 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                </nav>

                <hr className="border-gray-700" />

                <nav className="flex-1 space-y-2">
                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-600"
                  >
                    <svg
                      className="mr-4 size-5 shrink-0 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>
                </nav>
              </div>

              <div className="mt-auto pb-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700"
                >
                  <img
                    className="mr-3 size-6 shrink-0 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/4/avatar-female.png"
                    alt=""
                  />
                  Mariana Jones
                  <svg
                    className="ml-auto size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col xl:pl-64">
          <div className="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white">
            <div className="flex flex-1 px-4 sm:px-6 md:px-8">
              <div className="flex flex-1 items-center justify-between lg:justify-end">
                <div className="-m-2 flex items-center xl:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  >
                    <svg
                      className="size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="ml-4 mr-auto flex xl:ml-0">
                  <div className="flex shrink-0 items-center">
                    <img
                      className="block h-8 w-auto xl:hidden"
                      src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/logo.svg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="ml-auto hidden max-w-xs flex-1 lg:block">
                  <label className="sr-only"> Search </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="size-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>

                    <input
                      type="search"
                      name=""
                      id=""
                      className="block w-full rounded-lg border border-gray-300 py-2 pl-10 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                      placeholder="Search here"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6 sm:ml-5">
                  <div className="relative">
                    <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                    >
                      <svg
                        className="size-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </button>
                    <span className="absolute -right-1 -top-px inline-flex items-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                      {' '}
                      2{' '}
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                    >
                      <svg
                        className="size-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 xl:hidden"
                  >
                    <img
                      className="size-9 rounded-full bg-gray-300 object-cover"
                      src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/2/avatar-male.png"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <main>
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              </div>

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <div className="w-full overflow-x-auto pb-1">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-10">
                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Profile{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Password{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Team{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Notification{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-indigo-600 py-4 text-sm font-medium text-indigo-600 transition-all duration-200"
                      >
                        {' '}
                        Integrations{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Licenses{' '}
                      </a>
                    </nav>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border border-indigo-300 bg-indigo-50">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="md:flex md:items-center md:justify-between">
                      <img
                        className="size-16 shrink-0 rounded-lg object-cover"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/avatar-female.png"
                        alt=""
                      />
                      <div className="mt-4 max-w-xs flex-1 md:ml-6 md:mt-0">
                        <p className="text-base font-bold text-gray-900">
                          Learn how to connect new apps with Rareblocks API
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Lorem ipsum dolor sit amet, consec tetur.
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-start space-x-6 md:ml-auto md:mt-0 md:justify-end md:space-x-reverse">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 md:order-last"
                        >
                          View Tutorial
                        </button>

                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 transition-all duration-200 hover:text-gray-900 md:order-first"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Connect Apps
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipis.
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <label className="sr-only"> Search App </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="size-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>

                      <input
                        type="search"
                        name=""
                        id=""
                        className="block w-full rounded-lg border border-gray-300 py-2 pl-10 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                        placeholder="Search App"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flow-root">
                  <div className="-my-5 divide-y divide-gray-200">
                    <div className="py-5">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex min-w-0 flex-1 items-center">
                          <img
                            className="size-10 shrink-0 rounded-full object-cover"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/mailchimp-logo.png"
                            alt=""
                          />
                          <div className="ml-4 min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-900">
                              Mailchimp
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-gray-500">
                              Lorem ipsum dolor sit amet, consectetur adipis.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                          <a
                            href="#"
                            title=""
                            className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                          >
                            {' '}
                            Learn More{' '}
                          </a>

                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none"
                          >
                            <span className="sr-only">Enable</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none ml-1 mt-1 inline-block size-3.5 translate-x-0 rounded-full bg-gray-400 ring-0 transition duration-200 ease-in-out"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex min-w-0 flex-1 items-center">
                          <img
                            className="size-10 shrink-0 rounded-full object-cover"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/zapier-logo.png"
                            alt=""
                          />
                          <div className="ml-4 min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-900">
                              Zapier
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-gray-500">
                              Lorem ipsum dolor sit amet, consectes.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                          <a
                            href="#"
                            title=""
                            className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                          >
                            {' '}
                            Learn More{' '}
                          </a>

                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none"
                          >
                            <span className="sr-only">Enable</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none ml-1 mt-1 inline-block size-3.5 translate-x-0 rounded-full bg-gray-400 ring-0 transition duration-200 ease-in-out"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex min-w-0 flex-1 items-center">
                          <img
                            className="size-10 shrink-0 rounded-full object-cover"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/telegram-logo.png"
                            alt=""
                          />
                          <div className="ml-4 min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-900">
                              Telegram
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-gray-500">
                              Lorem ipsum dolor sit amet.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                          <a
                            href="#"
                            title=""
                            className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                          >
                            {' '}
                            Learn More{' '}
                          </a>

                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none"
                          >
                            <span className="sr-only">Enable</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none ml-1 mt-1 inline-block size-3.5 translate-x-0 rounded-full bg-gray-400 ring-0 transition duration-200 ease-in-out"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex min-w-0 flex-1 items-center">
                          <img
                            className="size-10 shrink-0 rounded-full object-cover"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/slack-logo.png"
                            alt=""
                          />
                          <div className="ml-4 min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-900">
                              Slack
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-gray-500">
                              Lorem ipsum dolor sit amet, consectetur adipis.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                          <a
                            href="#"
                            title=""
                            className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                          >
                            {' '}
                            Learn More{' '}
                          </a>

                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none"
                          >
                            <span className="sr-only">Enable</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none ml-1 mt-1 inline-block size-3.5 translate-x-0 rounded-full bg-gray-400 ring-0 transition duration-200 ease-in-out"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex min-w-0 flex-1 items-center">
                          <img
                            className="size-10 shrink-0 rounded-full object-cover"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/imgs/previews/settings/3/dropbox-logo.png"
                            alt=""
                          />
                          <div className="ml-4 min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-900">
                              Dropbox
                            </p>
                            <p className="mt-1 truncate text-sm font-medium text-gray-500">
                              Lorem ipsum dolor sit amet adipis.
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                          <a
                            href="#"
                            title=""
                            className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                          >
                            {' '}
                            Learn More{' '}
                          </a>

                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none"
                          >
                            <span className="sr-only">Enable</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none ml-1 mt-1 inline-block size-3.5 translate-x-0 rounded-full bg-gray-400 ring-0 transition duration-200 ease-in-out"
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
