import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Avatar } from 'antd';
import { ScreenSizeMap } from 'antd/es/_util/responsiveObserver';
import Link from 'next/link';

interface Props {
  profile: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

const AvatarComponent: React.FC<Props> = ({ profile, size, className }) => {
  return (
    <Link href={`/${profile?.username}`}>
      {profile?.image ? (
        <Avatar
          className={`${className} bg-${profile?.color}-400 rounded-full`}
          size={size}
          src={profile?.image}
          alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
        />
      ) : (
        <Avatar
          className={`${className} bg-${profile?.color}-400 rounded-full`}
          size={size}
          alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
        >
          {capitalizeOneFirstLetter(
            String(profile?.firstName),
            String(profile?.lastName),
          )}
        </Avatar>
      )}
    </Link>
  );
};

export { AvatarComponent };
