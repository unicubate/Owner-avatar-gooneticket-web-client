import { formatePrice } from '@/utils';

interface Props {
  value: number;
  className: string;
  currency: { amount?: string; code: string };
}

const SerialPrice = ({ value, currency, className }: Props) => {
  return (
    <>
      <span className={className}>
        {formatePrice({
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
