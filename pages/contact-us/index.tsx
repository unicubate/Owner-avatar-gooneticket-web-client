import { CreateContactForm } from '@/components/contact-us/create-contact-form';
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState } from '@/components/hooks';
import { LayoutSite } from '@/components/layouts/site';

export default function ContactUs() {
  const { t } = useInputState();
  return (
    <>
      <LayoutSite title="Contact us">
        <div className="py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-36">
              <div className="flex flex-col justify-between self-stretch">
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    {t.formatMessage({ id: 'CONTACT.US.TITLE' })}
                  </h2>
                  <p className="my-12 mt-2 text-justify text-base font-normal leading-7 text-gray-600 lg:mt-6 lg:text-lg lg:leading-8">
                    {t.formatMessage({ id: 'CONTACT.US.SUBTITLE' })}
                  </p>

                  <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
                    <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0">
                      <div className="overflow-hidden rounded-xl bg-white">
                        <div className="p-0">
                          <svg
                            className="mx-auto size-10 shrink-0 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <p className="mt-6 text-lg font-medium text-gray-900">
                            (+39) 3425712192
                          </p>
                          {/* <p className="mt-1 text-lg font-medium text-gray-900">
                            +1-446-526-0117
                          </p> */}
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-xl bg-white">
                        <div className="p-0">
                          <svg
                            className="mx-auto size-10 shrink-0 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-6 text-lg font-medium text-gray-900">
                            contact@example.com
                          </p>
                          {/* <p className="mt-1 text-lg font-medium text-gray-900">
                            hr@example.com
                          </p> */}
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-xl bg-white">
                        <div className="p-0">
                          <svg
                            className="mx-auto size-10 shrink-0 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                            Via della costa 13, Vigevano, Italy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-auto">
                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-blue-600">
                        USA OFFICE Hours
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        Monday-Friday
                        <br />
                        8:00 am to 5:00 pm
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-blue-600">
                        Our Address
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        Via della costa 13 <br />
                        Vigevano, Italy
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-blue-600">
                        Get In Touch
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        +393425712192
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="rounded-2xl bg-white shadow-xl dark:bg-black/15">
                <div className="p-6 sm:p-6">
                  <CreateContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MediumFooter />
      </LayoutSite>
    </>
  );
}
