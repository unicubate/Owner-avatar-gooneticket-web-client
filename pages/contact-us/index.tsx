import { CreateContactForm } from '@/components/contact-us/create-contact-form';
import { MediumFooter } from '@/components/footer/medium-footer';
import { LayoutSite } from '@/components/layouts/site';

export default function ContactUs() {
  return (
    <>
      <LayoutSite title="Contact us">
        <div className="py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-36">
              <div className="flex flex-col justify-between self-stretch">
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Contact Us
                  </h2>
                  <p className="my-12 mt-2 text-base font-normal leading-7 text-gray-600 lg:mt-6 lg:text-lg lg:leading-8">
                    Customer support response times may vary depending on the
                    urgency. You will receive a response as soon as possible. In
                    the meantime, please do not submit new requests if you have
                    already submitted a report for the same topic.
                  </p>

                  <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-auto">
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
                  </div>
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
