/* eslint-disable @next/next/no-img-element */
import { MediumFooter } from '@/components/footer/medium-footer';
import {
  comparedLandingPage,
  featuresLandingPage,
} from '@/components/landing-page/data-map';
import { LayoutSite } from '@/components/layout-site';
import { ButtonInput } from '@/components/ui-setting';
import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export default function Home() {
  const [features] = useState(featuresLandingPage);
  const [compared] = useState(comparedLandingPage);
  const t = useIntl();

  return (
    <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 py-6 mx-auto max-w-5xl text-center">
            <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
              {t.formatMessage({ id: 'HOME.TITLE' })}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base font-normal leading-7 text-gray-500">
              {t.formatMessage({ id: 'HOME.SUBTITLE' })}
            </p>
          </div>

          <div className="mx-auto max-w-xl text-center">
            <div className="flex flex-wrap justify-center">
              <Link href={`/register`}>
                <ButtonInput
                  type="button"
                  className="px-10 text-lg"
                  size="xlg"
                  variant="info"
                >
                  Start free with email
                </ButtonInput>
              </Link>
            </div>

            <ul className="mt-2 flex items-center justify-center space-x-6 sm:space-x-8">
              <li className="flex items-center">
                <span className="text-xs font-normal text-gray-500 sm:text-sm">
                  It’s free, and takes less than a minute.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 my-8 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Designed for creators,
          </h2>
          <p className="text-lg font-bold mt-2 leading-tight sm:text-lg lg:text-lg text-gray-600">
            not for businesses.
          </p>
        </div>

        <div className="grid mt-4 grid-cols-1 gap-6 lg:mt-4 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden dark:bg-black/15 rounded">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                You have 100% ownership of your supporters. We never email them,
                and you can export the list any time you like.
              </p>
            </div>
          </div>

          <div className="overflow-hidden dark:bg-black/15 rounded">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                You get to talk to a human for help, or if you just like some
                advice to hit the ground running.
              </p>
            </div>
          </div>

          <div className="overflow-hidden dark:bg-black/15 rounded">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                We don't call them "customers" or transactions. They are your
                supporters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Make 20% or more,
          </h2>
          <p className="text-lg font-bold  mt-2 leading-tight sm:text-lg lg:text-lg text-gray-600">
            compared to other platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 lg:mt-4 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {compared.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden dark:bg-black/15 rounded"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {feature?.icon}
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold">{feature?.title}</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-gray-600 mt-2">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold leading-none sm:text-4xl lg:text-5xl">
            Fund your creative work by
            <span className="text-indigo-600"> creating your page </span>
          </h2>
          <p className="text-lg font-bold mt-2 leading-tight sm:text-lg lg:text-lg text-gray-600">
            It only takes a minute to create your page and start receiving
            donations and support
          </p>
        </div>

        <div className="flex mt-4 flex-wrap justify-center">
          <ButtonInput
            type="button"
            className="px-10 text-lg"
            size="xlg"
            variant="info"
          >
            Start free with email
          </ButtonInput>
        </div>
      </div>

      <div className="my-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold leading-none sm:text-4xl lg:text-5xl">
            All the features you need
          </h2>
          <p className="text-lg font-bold  mt-2 leading-tight sm:text-lg lg:text-lg text-gray-600">
            Everything you need to make an income from your work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 lg:mt-4 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden dark:bg-black/15 rounded"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {feature?.icon}
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold">{feature?.title}</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-gray-600 mt-2">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MediumFooter />

      {/* <section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-black/15 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
        <h2 className="font-semibold text-gray-800 dark:text-white">
          🍪 Cookie Notice
        </h2>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          We use cookies to ensure that we give you the best experience on our
          website.{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Read cookies policies
          </a>
          .{' '}
        </p>

        <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Manage your preferences
          </button>

          <button className=" text-xs bg-indigo-500 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Accept
          </button>
        </div>
      </section> */}

      {/* <section className="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
        <div className="flex items-center gap-x-4">
          <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z"
                fill="currentColor"
              />
            </svg>
          </span>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to ensure that we give you the best experience on our
            website.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Read cookies policies
            </a>
            .{" "}
          </p>
        </div>

        <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
          <button className="w-1/2 text-xs text-gray-800 underline transition-colors duration-300 md:w-auto dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Cookie Setting
          </button>

          <button className=" text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Accept All Cookies
          </button>
        </div>
      </section> */}
    </LayoutSite>
  );
}
