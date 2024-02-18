import { ButtonInput } from '@/components/ui-setting/button-input';
import { Result } from 'antd';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const TransactionSuccess = () => {
  const { query, push, back } = useRouter();
  const token = String(query.token);

  return (
    <>
      <div className="mx-auto mt-8 max-w-lg">
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
      </div>
    </>
  );
};

export default TransactionSuccess;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
