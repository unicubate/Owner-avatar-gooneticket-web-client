import { ButtonInput } from '@/components/ui-setting';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const StripeV2CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <form>
        <PaymentElement />
        <div className="mt-4">
          <ButtonInput
            type="submit"
            className="w-full"
            size="lg"
            variant="info"
          >
            Continue
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { StripeV2CheckoutForm };
