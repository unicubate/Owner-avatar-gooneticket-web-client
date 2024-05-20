import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ImageProfileModel } from '@/types/profile.type';

interface Props {
  value: number;
  isDivide: boolean;
  currency: string;
}

export const formatePrice = ({ value, isDivide, currency }: Props) => {
  const numberCal = isDivide ? value / 100 : value;
  // const language = ['FR', 'IT'].includes(initialLang.toUpperCase())
  //   ? 'DE'
  //   : initialLang;
  return (
    <>
      {currency && numberCal && !isNaN(numberCal)
        ? `${numberCal.toLocaleString('IT', {
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
