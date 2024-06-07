export const ImageLogo = ({
  width = 35,
  height = 35,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <>
      {/* <Image
      width={width}
      height={height}
      src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
      alt={`${process.env.NEXT_PUBLIC_NAME_SITE}`}
    /> */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 275 262"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        className="fill-current text-white"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: 2,
        }}
      >
        <g transform="matrix(0.333333,0,0,0.333333,0,0)">
          <g transform="matrix(0.661962,0,0,0.355329,0,0)">
            <rect
              x="0"
              y="0"
              width="1242"
              height="2208"
              className="fill-none"
            />
            <g transform="matrix(1.61398,0,0,2.81429,-82.6132,116.457)">
              <g transform="matrix(606.629,0,0,606.629,654.461,565.438)" />
              <text
                x="214.595"
                y="565.438"
                className="fill-white font-serif text-6xl"
                style={{ fontFamily: 'Georgia, serif', fontSize: '606.629px' }}
              >
                G
              </text>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};
