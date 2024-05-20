import { formatePrice } from '@/utils';

interface Props {
  value: number;
  className: string;
  country: string;
  currency: { amount?: string; code: string };
}

const SerialPrice = ({ value, currency, className, country }: Props) => {
  return (
    <>
      <span className={className}>
        {formatePrice({
          country,
          currency: currency?.code,
          value: currency?.amount
            ? Number(value || 0) * Number(currency?.amount || 0)
            : Number(value || 0),
          isDivide: true,
        }) ?? ''}
      </span>
    </>
  );
};

export { SerialPrice };
