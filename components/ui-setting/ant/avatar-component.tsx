import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Avatar } from 'antd';
import { ScreenSizeMap } from 'antd/es/_util/responsiveObserver';
import Image from 'next/image';

interface Props {
  profile: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

export function AvatarComponent(props: Props) {
  const { profile, size, className } = props;
  return (
    <>
      <div className="relative sm:flex sm:items-center">
        <div className="relative inline-flex shrink-0">
          {profile?.image && (
            <>
              <Image
                width={50}
                height={50}
                quality={90}
                priority={true}
                className={cn(
                  `bg-${profile?.color}-600 rounded-full`,
                  className,
                )}
                src={oneImageToURL(profile?.image)}
                alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
              />
            </>
          )}

          {!profile?.image && (
            <>
              <Avatar
                className={cn(`rounded-full object-cover`, className)}
                size={size}
                alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
                src={`https://ui-avatars.com/api/?name=${capitalizeOneFirstLetter(
                  String(profile?.firstName ?? ''),
                  String(profile?.lastName ?? ''),
                )}&color=7F9CF5&background=EBF4FF`}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
