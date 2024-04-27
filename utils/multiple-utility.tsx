/*
 * others
 */

import { viewOneFileUploadAPI } from '@/api-site/upload';
import { ImageProfileModel } from '@/types/profile.type';

export const formatePrice = (options: { value: number; isDivide: boolean }) => {
  const { value, isDivide } = options;
  const numberCal = isDivide ? value / 100 : value;
  return (
    <>
      {!isNaN(numberCal) && String(numberCal).includes('.')
        ? numberCal.toFixed(2)
        : `${numberCal.toFixed(2)}`}{' '}
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
