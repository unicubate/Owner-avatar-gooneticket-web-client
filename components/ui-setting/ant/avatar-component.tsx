import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import Image from 'next/image';

interface Props {
  profile: any;
  className?: string;
}

export function AvatarComponent(props: Props) {
  const { profile, className } = props;
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
              <Avatar className={cn(`rounded-full object-cover`, className)}>
                <AvatarImage
                  alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
                  src={`https://ui-avatars.com/api/?name=${
                    profile?.fullName
                      ? capitalizeOneFirstLetter(
                          String(profile?.fullName ?? ''),
                        )
                      : capitalizeOneFirstLetter(
                          String(profile?.firstName ?? ''),
                          String(profile?.lastName ?? ''),
                        )
                  }&color=7F9CF5&background=EBF4FF`}
                />
                <AvatarFallback>
                  {profile?.fullName
                    ? capitalizeOneFirstLetter(String(profile?.fullName ?? ''))
                    : capitalizeOneFirstLetter(
                        String(profile?.firstName ?? ''),
                        String(profile?.lastName ?? ''),
                      )}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </>
  );
}
