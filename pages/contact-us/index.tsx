import { LayoutSite } from "@/components/layout-site";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { GetStaticPropsContext } from "next";

export default function ContactUs() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <LayoutSite title="Contact us">
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Contact us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:grid-cols-3 md:px-0">
              <div className="overflow-hidden rounded-xl bg-white">
                <div className="p-6">
                  <svg
                    className="mx-auto size-10 shrink-0 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium text-gray-900">
                    +1-316-555-0116
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    +1-446-526-0117
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-white">
                <div className="p-6">
                  <svg
                    className="mx-auto size-10 shrink-0 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium text-gray-900">
                    contact@example.com
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    hr@example.com
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-white">
                <div className="p-6">
                  <svg
                    className="mx-auto size-10 shrink-0 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                    8502 Preston Rd. Ingle, Maine 98380, USA
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-white">
              <div className="px-6 py-12 sm:p-12">
                <h3 className="text-center text-3xl font-semibold text-gray-900">
                  Send us a message
                </h3>

                <form action="#" method="POST" className="mt-14">
                  <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Your name{" "}
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your full name"
                        className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black caret-blue-600 transition-all duration-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter your full name"
                        className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black caret-blue-600 transition-all duration-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Phone number{" "}
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="tel"
                        name=""
                        id=""
                        placeholder="Enter your full name"
                        className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black caret-blue-600 transition-all duration-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <label className="text-base font-medium text-gray-900">
                      {" "}
                      Company name{" "}
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your full name"
                        className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black caret-blue-600 transition-all duration-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-base font-medium text-gray-900">
                        {" "}
                        Message{" "}
                      </label>
                      <div className="relative mt-2.5">
                        <textarea
                          name=""
                          id=""
                          placeholder=""
                          className="block w-full resize-y rounded-md border border-gray-200 bg-white p-4 text-black caret-blue-600 transition-all duration-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 p-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutSite>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}