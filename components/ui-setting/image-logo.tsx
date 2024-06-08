import Image from 'next/image';

export const ImageLogo = ({
  width = 60,
  height = 60,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <>
      <Image
        width={width}
        height={height}
        src="/goonetikv1.jpg"
        alt={`${process.env.NEXT_PUBLIC_NAME_SITE}`}
      />
    </>
  );
};
