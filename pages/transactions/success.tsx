import { Result } from "antd";
import { useRouter } from "next/router";
import { ButtonCancelInput } from "@/components/templates/button-cancel-input";
import { ButtonInput } from "@/components/templates/button-input";

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
                <ButtonCancelInput
                  shape="default"
                  size="large"
                  loading={false}
                  onClick={() => back()}
                >
                  By Again
                </ButtonCancelInput>
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
