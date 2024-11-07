import { CreateOnPaymentAPI } from '@/api-site/payment';
import { useInputState, useRedirectAfterSomeSeconds } from '@/components/hooks';
import { type ISourceOptions } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { CircleCheckBigIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

const TransactionSuccess = () => {
  const { setHasErrors } = useInputState();
  const { query } = useRouter();
  const { type, token, tag } = query;

  const { timerRemaining } = useRedirectAfterSomeSeconds(`/${tag}`, 2);

  // this should be run only once per application lifetime
  const { isPending, mutateAsync } = CreateOnPaymentAPI();

  useEffect(() => {
    const loadItem = async () => {
      if (token && type === 'stripe') {
        setHasErrors(undefined);
        try {
          const { data: session } = await mutateAsync({
            data: { token },
            paymentModel: 'STRIPE-CONFIRM-CHECKOUT-SESSION-EVENT',
          });
          setHasErrors(false);
          if (session?.id) {
            window.location.href = `${session?.url}`;
          }
        } catch (error: any) {
          setHasErrors(true);
          setHasErrors(error.response.data.message);
        }
      }
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    };

    loadItem();
  }, [type, token, mutateAsync, setHasErrors]);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        zIndex: 1,
      },
      particles: {
        color: {
          value: ['#FFFFFF', '#FFd700'],
        },
        move: {
          direction: 'bottom',
          enable: true,
          outModes: {
            default: 'out',
          },
          size: true,
          speed: {
            min: 6,
            max: 10,
          },
        },
        number: {
          value: 500,
          density: {
            enable: true,
            area: 800,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <>
      <div className="mx-auto mt-10 max-w-lg">
        <div className="h-screen">
          <div className="p-6  md:mx-auto">
            <div className="mx-auto mt-4 max-w-max text-green-500">
              <CircleCheckBigIcon className="size-32" />
            </div>

            {token ? <Particles id="tsparticles" options={options} /> : null}
            <div className="text-center">
              <h3 className="text-center text-base font-semibold md:text-2xl">
                {type === 'booking' ? 'Booking' : 'Payment'} Done!
              </h3>
              <p className="my-2 text-gray-600">
                Thank you for completing your{' '}
                {type === 'booking' ? 'booking' : 'secure online payment'}{' '}
                redirecting to orders in {timerRemaining}
              </p>
              <p className="text-gray-00 my-2"> Order number: {token} </p>
              {/* <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  variant="outline"
                  onClick={() => back()}
                >
                  Back
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-full"
                  variant="primary"
                  onClick={() => {
                    push(`/payments`);
                  }}
                >
                  Go Payments
                </ButtonInput>
              </div> */}
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
                  variant="outline"
                  onClick={() => back()}
                >
                  Back
                </ButtonInput>
                <ButtonInput
                  type="button"
                  className="w-full"
                  variant="primary"
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
