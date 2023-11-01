import { capitalizeOneFirstLetter } from "@/utils/utils";
import { Avatar } from "antd";
import { ScreenSizeMap } from "antd/es/_util/responsiveObserver";
import Link from "next/link";

interface Props {
  profile: any;
  size?: number | ScreenSizeMap
  className?: string
}

const AvatarComponent: React.FC<Props> = ({ profile, size, className }) => {

  return (
    <Link href={`/${profile?.username}`}>{profile?.image ?
      <Avatar className={className} size={size} src={profile?.image}
        alt={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""
          }`} /> :
      <Avatar className={className} size={size} style={{ backgroundColor: '#fde7', color: `${profile?.color}` }}>
        {capitalizeOneFirstLetter(String(profile?.firstName), String(profile?.lastName))}
      </Avatar>}
    </Link>
  );
};

export { AvatarComponent };
