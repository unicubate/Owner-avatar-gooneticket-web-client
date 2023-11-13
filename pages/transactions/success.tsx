import { Result } from "antd";
import { useRouter } from "next/router";
import { ButtonInput } from "@/components/ui/button-input";
import { GetStaticPropsContext } from "next";

const TransactionSuccess = () => {
  const { query, push, back } = useRouter();
  const token = String(query.token);

  return (
    <>
      <div className="mt-8 max-w-lg mx-auto">
        <Result
          status="success"
          title="Successfully Purchased"
          subTitle={`Order number: ${token}`}
          extra={[
            <>
              <div className="flex items-center space-x-4">
                <ButtonInput
                  status="cancel"
                  type="button"
                  shape="default"
                  size="normal"
                  loading={false}
                  onClick={() => back()}
                >
                  By Again
                </ButtonInput>
                <ButtonInput
                  minW="fit"
                  shape="default"
                  type="button"
                  size="large"
                  loading={false}
                  color="indigo"
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
        ...(await import(`/lang/${locale}.json`)).default,
      }
    }
  }
}