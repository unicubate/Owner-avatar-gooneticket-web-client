import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FaqsList } from "@/components/faq/faqs-list";
import Layout from "@/components/layout";

const faqs = [
  {
    id: "ed589200-fd6f-4740-bdf4-6deade38cfc8",
    title: "Q. Does this theme supports plugins?",
    description: `
        It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
  {
    id: "9d0681d0-8d1f-4069-be43-1df594fb6d2a",
    title: "Ask everything you need to know about our products and services.",
    description: `
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
  {
    id: "9d0681d0-2354-09876-ytm-1df594fb6d2a",
    title: "Ask everything you need to know about our products and services.",
    description: `
        distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution.`,
  },
];
const Faqs = () => {
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };

  return (
    <>
      <Layout title="Get Donations, Memberships and Shop Sales. No Fees">



        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
              Ask everything you need to know about our products and services.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mt-12 overflow-hidden border border-gray-200 divide-y divide-gray-200 sm:mt-16 rounded-xl">
            {faqs.map((item, index) => (
              <FaqsList item={item} key={index} index={index} />
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-8 overflow-hidden text-center bg-gray-100 sm:mt-12 rounded-xl">
            <div className="px-6 py-12 sm:p-12">
              <div className="max-w-sm mx-auto">
                <div className="relative z-0 flex items-center justify-center -space-x-2 overflow-hidden">
                  <img
                    className="relative z-10 inline-block rounded-full w-14 h-14 ring-4 ring-gray-100"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-male.png"
                    alt=""
                  />
                  <img
                    className="relative z-30 inline-block w-16 h-16 rounded-full ring-4 ring-gray-100"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-female-1.png"
                    alt=""
                  />
                  <img
                    className="relative z-10 inline-block rounded-full w-14 h-14 ring-4 ring-gray-100"
                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-female-2.png"
                    alt=""
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  Still have questions?
                </h3>
                <p className="mt-2 text-base font-normal text-gray-600">
                  Cant find the answer youre looking for? Please chat with our
                  friendly team.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                    role="button"
                  >
                    Start free trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>



    </>
  );
};

export default Faqs;
