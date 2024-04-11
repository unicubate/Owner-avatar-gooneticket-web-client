import { ButtonInput } from '@/components/ui-setting';
import { useRouter } from 'next/router';

const TransactionSuccess = () => {
  const { query, push, back } = useRouter();
  const token = String(query.token);

  return (
    <>
      <div className="mx-auto mt-10 max-w-lg">
        <div className="h-screen">
          <div className="p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="mx-auto my-6 size-16 text-green-600"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="text-center text-base font-semibold md:text-2xl">
                Payment Done!
              </h3>
              <p className="my-2 text-gray-600">
                Thank you for completing your secure online payment.
              </p>
              <p className="text-gray-00 my-2"> Order number: {token} </p>
              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => back()}
                >
                  Back
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="info"
                  onClick={() => {
                    push(`/payments`);
                  }}
                >
                  Go Payments
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mx-auto mt-8 max-w-lg">
        <Result
          status="success"
          title="Successfully Purchased"
          className="text-with"
          subTitle={`Order number: ${token}`}
          extra={[
            <>
              <div className="flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => back()}
                >
                  Back
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="info"
                  onClick={() => {
                    push(`/payments`);
                  }}
                >
                  Go Payments
                </ButtonInput>
              </div>
            </>,
          ]}
        />
      </div> */}
    </>
  );
};

export default TransactionSuccess;
