import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Image } from 'antd';
import { ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

interface Props {
  profile: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

export function CoverComponent(props: Props) {
  const { profile, size, className } = props;
  return (
    <>
      {profile?.image && (
        <>
          <Image
            height="100%"
            width="100%"
            preview={false}
            className={cn(`bg-${profile?.color}-600`, className)}
            src={oneImageToURL(profile?.image)}
            alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
          />
        </>
      )}

      {!profile?.image && (
        <>
          <Image
            height="100%"
            width="100%"
            preview={false}
            className={cn(`object-cover`, className)}
            //size={size}
            alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
            src={`https://ui-avatars.com/api/?name=${capitalizeOneFirstLetter(
              String(profile?.firstName ?? ''),
              String(profile?.lastName ?? ''),
            )}&color=7F9CF5&background=EBF4FF`}
          />
        </>
      )}
    </>
  );
}
