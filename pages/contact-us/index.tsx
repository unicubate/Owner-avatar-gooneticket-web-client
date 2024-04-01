import { CreateContactForm } from '@/components/contact-us/create-contact-form';
import { MediumFooter } from '@/components/footer/medium-footer';
import { LayoutSite } from '@/components/layout-site';
import { GetStaticPropsContext } from 'next';

export default function ContactUs() {
  return (
    <>
      <LayoutSite title="Contact us">
        <div className="py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36">
              <div className="flex flex-col self-stretch justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Contact Us
                  </h2>
                  <p className="mt-2 my-12 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
                    Customer support response times may vary depending on the
                    urgency. You will receive a response as soon as possible. In
                    the meantime, please do not submit new requests if you have
                    already submitted a report for the same topic.
                  </p>

                  <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-3 lg:mt-auto">
                    <div>
                      <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                        USA OFFICE Hours
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        Monday-Friday
                        <br />
                        8:00 am to 5:00 pm
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                        Our Address
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        Via della costa 13 <br />
                        Vigevano, Italy
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                        Get In Touch
                      </h3>
                      <p className="mt-5 text-base font-medium text-gray-600">
                        +393425712192
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black/15 shadow-xl rounded-2xl">
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
