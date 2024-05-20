import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
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
          <img
            className={cn(`bg-${profile?.color}-600`, className)}
            src={oneImageToURL(profile?.image)}
            alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
          />
        </>
      )}

      {!profile?.image && (
        <>
          <img
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
