import Image from 'next/image';

export const ImageLogo = ({
  width = 35,
  height = 35,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      width={width}
      height={height}
      src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
      alt={`${process.env.NEXT_PUBLIC_NAME_SITE}`}
    />
  );
};
