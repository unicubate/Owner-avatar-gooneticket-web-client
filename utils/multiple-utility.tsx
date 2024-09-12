import { viewOneFileUploadAPI } from '@/api-site/upload';
import { initialLang } from '@/i18n/context-intl-provider';
import { ImageProfileModel } from '@/types/profile';

interface Props {
  value: number;
  isDivide?: boolean;
  currency: string;
}

export const formatePrice = ({ value, isDivide = false, currency }: Props) => {
  const numberCal = isDivide ? value / 100 : value;
  const language = ['FR', 'DE', 'CMR'].includes(initialLang?.toUpperCase())
    ? 'de-DE'
    : 'en-US';
  return (
    <>
      {currency && !isNaN(numberCal)
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
