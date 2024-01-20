import { ButtonInput } from "./ant/button-input";
import { useRouter } from "next/router";
import { HiOutlineLockClosed } from "react-icons/hi";

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
            {" "}
            This post is for members only.{" "}
          </p>

          <ButtonInput
            onClick={() => push(`/${profile?.username}/memberships`)}
            className="mt-2"
            shape="default"
            type="button"
            size="medium"
            loading={false}
            color={profile?.color as any}
            icon={<HiOutlineLockClosed className="size-5" />}
          >
            Join now
          </ButtonInput>
        </div>
      </div>
    </>
  );
};

export { WhoCanSeeItem };
