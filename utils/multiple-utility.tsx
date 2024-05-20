import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ImageProfileModel } from '@/types/profile.type';

interface Props {
  value: number;
  isDivide: boolean;
  currency: string;
  country: string;
}

export const formatePrice = ({ value, isDivide, currency, country }: Props) => {
  const numberCal = isDivide ? value / 100 : value;
  const language = ['FR', 'DE', 'CMR'].includes(country?.toUpperCase())
    ? 'de-DE'
    : 'en-US';
  return (
    <>
      {currency && numberCal && !isNaN(numberCal)
        ? `${numberCal.toLocaleString(language, {
          currency: currency,
          style: 'currency',
        })}`
        : null}
    </>
  );
};

export const oneImageToURL = (image: ImageProfileModel) => {
  const url =
    image?.key === 'aws'
      ? viewOneFileUploadAPI({
        folder: 'profiles',
        fileName: image?.patch,
      })
      : image?.patch;

  return url as string;
};
