import { useRouter } from 'next/router';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { ButtonInput } from './button-input';

interface Props {
  profile: { color: string; username: string };
}

const WhoCanSeeItem: React.FC<Props> = ({ profile }) => {
  const { push } = useRouter();

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <button className="font-bold">
            <HiOutlineLockClosed className="size-7" />
          </button>
          <p className="text-sm font-bold text-white">
            {' '}
            This post is for members only.{' '}
          </p>

          <ButtonInput
            onClick={() => push(`/${profile?.username}/memberships`)}
            className="mt-2"
            type="button"
            variant="danger"
            icon={<HiOutlineLockClosed className="mr-2 size-5" />}
          >
            Join now
          </ButtonInput>
        </div>
      </div>
    </>
  );
};

export { WhoCanSeeItem };
