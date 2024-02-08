import { PostType } from '@/types/post';
import {
  FileAudioIcon,
  FileVideoIcon,
  ImageIcon,
  MenuSquareIcon,
} from 'lucide-react';

const IconTypePost: React.FC<{ type: PostType; className?: string }> = ({
  type,
  className,
}) => {
  return (
    <>
      {type === 'ARTICLE' ? <MenuSquareIcon className={className} /> : null}
      {type === 'AUDIO' ? <FileAudioIcon className={className} /> : null}
      {type === 'VIDEO' ? <FileVideoIcon className={className} /> : null}
      {type === 'GALLERY' ? <ImageIcon className={className} /> : null}
    </>
  );
};

export { IconTypePost };
