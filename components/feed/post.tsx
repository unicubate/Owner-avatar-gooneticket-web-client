// import IPost from '../../schemas/post'
import { Image } from 'antd';
import {
  BookmarkIcon,
  EmojiCollection,
  HeartIcon,
  MessageIcon,
  ShareIcon,
} from './icons';

interface IProps {
  post: any;
  // post: IPost
}

const Post = ({ post }: IProps) => {
  return (
    <div className="card relative space-y-4">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div className="-m-2 flex items-center gap-3">
          <div className="size-8 cursor-pointer overflow-hidden rounded-full">
            <Image className="w-full" src={post.profile} alt={post.profile} />
          </div>
          <h2 className=" font-semibold">{post.username}</h2>
        </div>
        {/* <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" /> */}
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 aspect-square overflow-hidden">
        <Image className="w-full" src={post.image} alt={post.username} />
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <div className="mb-2 flex justify-between">
          <div className="flex items-center gap-4">
            <HeartIcon />
            <MessageIcon />
            <ShareIcon />
          </div>
          <BookmarkIcon />
        </div>
        <span className=" font-semibold">{`${post.likes} likes`}</span>
        <p>
          <span className="font-semibold">{post.username} </span>
          {post.description}
        </p>
        <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
      </div>

      <div className="relative inset-x-0 -mx-5 h-px bg-gray-200"></div>

      <div className="flex gap-4">
        <EmojiCollection />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Add a comment"
        />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default Post;
