import { PostType } from "@/types/post";
import { BiImage } from "react-icons/bi";
import { LuFileText, LuFileAudio2, LuFileVideo2, LuImage } from "react-icons/lu";

const IconTypePost: React.FC<{ type: PostType; className?: string }> = ({
  type,
  className,
}) => {
  return (
    <>
      {type === "ARTICLE" ? <LuFileText className={className} /> : null}
      {type === "AUDIO" ? <LuFileAudio2 className={className} /> : null}
      {type === "VIDEO" ? <LuFileVideo2 className={className} /> : null}
      {type === "GALLERY" ? <LuImage className={className} /> : null}
    </>
  );
};

export { IconTypePost };
