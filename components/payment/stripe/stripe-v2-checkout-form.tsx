// import { ButtonInput } from '@/components/ui-setting';
// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from '@stripe/react-stripe-js';

// const StripeV2CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   return (
//     <>
//       <form>
//         <PaymentElement />
//         <div className="mt-4">
//           <ButtonInput
//             type="submit"
//             className="w-full"
//             size="lg"
//             variant="info"
//           >
//             Continue
//           </ButtonInput>
//         </div>
//       </form>
//     </>
//   );
// };

// export { StripeV2CheckoutForm };

'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';

type CheckoutFormProps = {
  product?: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function StripeV2CheckoutForm({
  product,
  clientSecret,
}: CheckoutFormProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form productId={'717625371'} />
      </Elements>
    </div>
  );
}

function Form({ productId }: { productId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    // const orderExists = await userOrderExists(email, productId);

    // if (orderExists) {
    //   setErrorMessage(
    //     'You have already purchased this product. Try downloading it from the My Orders page',
    //   );
    //   setIsLoading(false);
    //   return;
    // }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? 'Purchasing...' : `Purchase - 10 EUR`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
