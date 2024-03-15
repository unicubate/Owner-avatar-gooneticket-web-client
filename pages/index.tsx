/* eslint-disable @next/next/no-img-element */
import { LayoutSite } from '@/components/layout-site';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home_page');

  return (
    <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
        {/* <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full"
            src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/5/grid-pattern.png"
            alt=""
          />
        </div> */}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base font-normal leading-7 text-gray-500">
              {t('subTitle')}
            </p>
          </div>
          <div className="mx-auto max-w-xl text-center">
            <form action="#" method="POST" className="mt-8 sm:mt-10">
              <div
                className="group relative p-3 rounded-xl sm:border sm:border-gray-200 dark:sm:border-gray-600 sm:focus-within:border-gray-200"
                //className="group relative p-2 sm:rounded-xl sm:border sm:border-gray-200 sm:focus-within:border-gray-200 sm:focus-within:ring-1 sm:focus-within:ring-gray-300"
              >
                {/* <Input className="block bg-transparent p-3 outline-none focus:border-transparent focus:ring-transparent sm:border-none sm:focus:border-transparent sm:focus:ring-0" /> */}
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email address"
                  className="block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent p-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:border-none sm:focus:border-transparent sm:focus:ring-0"
                />

                <div className="mt-2 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:flex sm:items-center sm:pr-2">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    size="xlg"
                    variant="info"
                  >
                    Get started
                  </ButtonInput>
                </div>
              </div>
            </form>

            {/* <ul className="mt-4 flex items-center justify-center space-x-6 sm:space-x-8">
              <li className="flex items-center">
                <span className="text-xs font-medium sm:text-sm">
                  {' '}
                  It’s free, and takes less than a minute.{' '}
                </span>
              </li>
            </ul> */}
          </div>
        </div>
      </div>

      {/* <section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
        <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Cookie Notice</h2>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">We use cookies to ensure that we give you the best experience on our website. <a href="#" className="text-blue-500 hover:underline">Read cookies policies</a>. </p>

        <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Manage your preferences
          </button>

          <button className=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../lang/${locale}/index.json`)).default,
    },
  };
}
