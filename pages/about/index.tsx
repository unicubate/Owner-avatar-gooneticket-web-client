import { MediumFooter } from '@/components/footer/medium-footer';
import { featuresAboutPage } from '@/components/landing-page/data-map';
import { LayoutSite } from '@/components/layout-site';
import { useState } from 'react';

const About = () => {
  const [features] = useState(featuresAboutPage);
  return (
    <LayoutSite title="About">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-4xl">
            What makes different?
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
          <div>
            <div className="relative mx-auto flex items-center justify-center">
              <svg
                className="text-blue-100"
                width="72"
                height="75"
                viewBox="0 0 72 75"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
              </svg>
              <svg
                className="absolute size-9 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold">Secured Payments</h3>
            <p className="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>

          <div>
            <div className="relative mx-auto flex items-center justify-center">
              <svg
                className="text-orange-100"
                width="62"
                height="64"
                viewBox="0 0 62 64"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
              </svg>
              <svg
                className="absolute size-9 text-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold">Fast & Easy to Load</h3>
            <p className="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>

          <div>
            <div className="relative mx-auto flex items-center justify-center">
              <svg
                className="text-green-100"
                width="66"
                height="68"
                viewBox="0 0 66 68"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
              </svg>
              <svg
                className="absolute size-9 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold">Light & Dark Version</h3>
            <p className="mt-4 text-base text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Teams
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 xl:gap-x-12">
          <div className="mb-6 lg:mb-0">
            <div className="relative block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex-row items-center lg:flex">
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.jpg"
                    alt="Trendy Pants and Shoes"
                    className="mb-6 w-full rounded-md lg:mb-0"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <h5 className="text-xl font-bold">Darren Randolph</h5>
                  <p className="text-neutral-500 dark:text-neutral-300">
                    Marketing expert
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:mb-0">
            <div className="relative block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex-row items-center lg:flex">
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/4.jpg"
                    alt="Trendy Pants and Shoes"
                    className="mb-6 w-full rounded-md lg:mb-0"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <h5 className="mb-2 text-lg font-bold">Maliha Welch</h5>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    Web designer
                  </p>
                  <ul className="mx-auto flex list-inside justify-center lg:justify-start">
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="dark:text-primary-400 size-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="dark:text-primary-400 size-4 text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        />
                      </svg>
                    </a>
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="dark:text-primary-400 size-3.5 text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                        />
                      </svg>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:mb-0">
            <div className="relative block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex-row items-center lg:flex">
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-5/12 lg:pr-6">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/12.jpg"
                    alt="Trendy Pants and Shoes"
                    className="mb-6 w-full rounded-md lg:mb-0"
                  />
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <h5 className="mb-2 text-lg font-bold">Avaya Hills</h5>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                    Copywriter
                  </p>
                  <ul className="mx-auto flex list-inside justify-center lg:justify-start">
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="dark:text-primary-400 size-4 text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"
                        />
                      </svg>
                    </a>
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="dark:text-primary-400 size-3.5 text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                        />
                      </svg>
                    </a>
                    <a href="#!" className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="dark:text-primary-400 size-4 text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Testimonials
          </h2>
        </div>

        <div className="grid gap-x-6 md:grid-cols-4 lg:gap-x-12">
          <div className="mb-12 md:mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                className="w-32 rounded-full shadow-lg dark:shadow-black/20"
              />
            </div>
            <h5 className="mb-2 text-lg font-bold">Maria Smantha</h5>
            <h6 className="dark:text-primary-400 mb-4 font-medium text-primary">
              Web Developer
            </h6>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
              id officiis hic tenetur quae quaerat ad velit ab hic.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                className="inline-block w-6"
              >
                <path
                  fill="currentColor"
                  d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                />
              </svg>
            </p>
          </div>
          <div className="mb-12 md:mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg"
                className="w-32 rounded-full shadow-lg dark:shadow-black/20"
              />
            </div>
            <h5 className="mb-2 text-lg font-bold">Maria Smantha</h5>
            <h6 className="dark:text-primary-400 mb-4 font-medium text-primary">
              Web Developer
            </h6>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
              id officiis hic tenetur quae quaerat ad velit ab hic.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                className="inline-block w-6"
              >
                <path
                  fill="currentColor"
                  d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                />
              </svg>
            </p>
          </div>
          <div className="mb-12 md:mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg"
                className="w-32 rounded-full shadow-lg dark:shadow-black/20"
              />
            </div>
            <h5 className="mb-2 text-lg font-bold">Lisa Cudrow</h5>
            <h6 className="dark:text-primary-400 mb-4 font-medium text-primary">
              Graphic Designer
            </h6>
            <p className="mb-4">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid commodi.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                className="inline-block w-6"
              >
                <path
                  fill="currentColor"
                  d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                />
              </svg>
            </p>
          </div>
          <div className="mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                className="w-32 rounded-full shadow-lg dark:shadow-black/20"
              />
            </div>
            <h5 className="mb-2 text-lg font-bold">John Smith</h5>
            <h6 className="dark:text-primary-400 mb-4 font-medium text-primary">
              Marketing Specialist
            </h6>
            <p className="mb-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 96 960 960"
                className="inline-block w-6"
              >
                <path
                  fill="currentColor"
                  d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-none sm:text-3xl">
            Fund your creative work by
            <span className="text-indigo-600"> creating your page </span>
          </h2>
          <p className="mt-2 text-lg font-bold leading-tight text-gray-600 sm:text-lg lg:text-lg">
            It only takes a minute to create your page and start receiving
            donations and support
          </p>
        </div>

        <div className="mt-4 flex flex-wrap justify-center">
          <button className="m-2 rounded border px-8 py-3 text-lg dark:border-gray-600">
            Log In
          </button>
          <button className="m-2 rounded bg-indigo-600 px-8 py-3 text-lg font-semibold text-white">
            Get started
          </button>
        </div>
      </div>
      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            All the features you need
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden rounded dark:bg-black/15"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {feature?.icon}
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold">{feature?.title}</p>
                  </div>
                </div>

                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MediumFooter />
    </LayoutSite>
  );
};

export default About;
