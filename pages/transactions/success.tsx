import { Result } from 'antd';
import { useRouter } from 'next/router';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { GetStaticPropsContext } from 'next';

const TransactionSuccess = () => {
  const { query, push, back } = useRouter();
  const token = String(query.token);

  return (
    <>
      <div className="mx-auto mt-8 max-w-lg">
        <Result
          status="success"
          title="Successfully Purchased"
          subTitle={`Order number: ${token}`}
          extra={[
            <>
              <div className="flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="outline"
                  onClick={() => back()}
                >
                  By Again
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="info"
                  onClick={() => {
                    push(`/home`);
                  }}
                >
                  Go Home
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
