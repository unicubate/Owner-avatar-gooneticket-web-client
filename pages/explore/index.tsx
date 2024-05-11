import { LayoutSite } from '@/components/layouts/layout-site';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  searchInput: yup.string().optional(),
});

const Explore = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

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
      <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Meet the creative team
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
            <div className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    className="size-16 shrink-0 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-1.png"
                    alt=""
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-base font-bold text-gray-900">
                      Albert Flores
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    className="size-16 shrink-0 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-2.png"
                    alt=""
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-base font-bold text-gray-900">
                      Ralph Edwards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    className="size-16 shrink-0 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-3.png"
                    alt=""
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-base font-bold text-gray-900">
                      Theresa Webb
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="p-4">
                <div className="flex items-center">
                  <Image
                    className="size-16 shrink-0 rounded-full object-cover"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/team/7/member-4.png"
                    alt=""
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-base font-bold text-gray-900">
                      Jane Cooper
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:mt-10">
            <div className="group relative p-2 sm:rounded-xl sm:border sm:border-gray-400 sm:focus-within:border-gray-300 sm:focus-within:ring-1 sm:focus-within:ring-gray-300">
              <input
                type="text"
                {...register('searchInput')}
                placeholder="Search creators"
                className="block w-full rounded-xl border border-gray-400 bg-transparent p-4 text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:border-none sm:focus:border-transparent sm:focus:ring-0"
              />

              <div className="mt-4 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:flex sm:items-center sm:pr-2">
                <ButtonInput type="button" size="sm" variant="primary">
                  Start my page
                </ButtonInput>
              </div>
            </div>
          </form>

          {/* <form action="#" method="POST" className="mt-8 sm:mt-10">
            <div className="relative p-2 sm:border  group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-600 sm:focus-within:border-gray-900">
              <input
                type="email"
                name=""
                id=""
                placeholder="Search creators"
                className="block w-full px-4 py-4 outline-none focus:border-gray-200 focus:ring-1 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
              />




              <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                <button type="submit" className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-lg focus:outline-none focus:bg-blue-600 font-pj hover:bg-blue-600"> Search </button>
              </div>
            </div>
          </form> */}

          <div className="pt-12 text-center md:flex md:items-center md:justify-between md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Creators{' '}
            </h2>

            <div className="mt-6 md:mt-0">
              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-500 transition-all duration-200 hover:text-gray-900"
              >
                {' '}
                See All Artists{' '}
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 px-12 text-center sm:mt-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:px-0 xl:grid-cols-5 xl:gap-8">
            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-1.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-1.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    kuchka70
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-2.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Pompelmus1
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-3.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-3.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    AlinaBilash
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-4.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-4.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    pavelostrovski
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-5.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-5.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Faratey58
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-2.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Pompelmus1
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-3.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-3.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    AlinaBilash
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-4.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-4.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    pavelostrovski
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-5.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-5.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Faratey58
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-2.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Pompelmus1
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-3.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-3.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    AlinaBilash
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-4.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-4.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    pavelostrovski
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <Image
                  className="w-full object-cover"
                  src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/cover-5.png"
                  alt=""
                />
              </div>
              <div className="-mt-16 sm:flex sm:items-center sm:justify-center sm:space-x-5">
                <div className="relative inline-flex">
                  <Image
                    className="mx-auto size-28 rounded-full object-cover ring-2 ring-white"
                    src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/authors/2/author-5.png"
                    alt=""
                  />
                  <div className="absolute bottom-0 right-0 pr-2">
                    <div className="inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-6 pt-3">
                <p className="text-base font-bold text-gray-900">
                  <a href="#" title="">
                    Faratey58
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </p>
                <p className="mt-1 text-sm font-medium uppercase text-gray-500">
                  $38,194.67
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutSite>
    </>
  );
};

export default Explore;
