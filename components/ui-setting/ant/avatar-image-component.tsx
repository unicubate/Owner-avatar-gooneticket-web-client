import { cn } from '@/lib/utils';
import { oneImageToURL } from '@/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Image } from 'antd';

interface Props {
  profile: any;
  preview?: boolean;
  className?: string;
}

export function AvatarImageComponent(props: Props) {
  const { profile, preview, className } = props;
  return (
    <>
      <div className="relative sm:flex sm:items-center">
        <div className="relative inline-flex shrink-0">
          {profile?.image && (
            <>
              <Image
                className={cn(`bg-${profile?.color}-600`, className)}
                height={50}
                width={60}
                preview={preview}
                src={oneImageToURL(profile?.image)}
                alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
              />
            </>
          )}

          {!profile?.image && (
            <>
              <Image
                className={cn(`object-cover`, className)}
                height={50}
                width={60}
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
