import { cn } from '@/lib/utils';
import { capitalizeOneFirstLetter } from '@/utils/utils';
import { Avatar } from 'antd';
import { ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

interface Props {
  profile: any;
  size?: number | ScreenSizeMap;
  className?: string;
}

const AvatarComponent: React.FC<Props> = ({ profile, size, className }) => {
  return (
    <>
      {/* <Link href={`/${profile?.username}`}> */}
      {profile?.image ? (
        <Avatar
          className={cn(`bg-${profile?.color}-600 rounded-full`, className)}
          size={size}
          src={profile?.image}
          alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
        />
      ) : (
        <Avatar
          className={cn(`bg-${profile?.color}-600  rounded-full`, className)}
          size={size}
          alt={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
          style={{ backgroundColor: '#fde3', color: `${profile?.color}` }}
        >
          {capitalizeOneFirstLetter(
            String(profile?.firstName),
            String(profile?.lastName),
          )}
        </Avatar>
      )}
      {/* </Link> */}
    </>
  );
};

export { AvatarComponent };
