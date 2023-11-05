import { ButtonInput } from "./button-input";
import { PiLockKey } from "react-icons/pi";
import { useRouter } from "next/router";

interface Props {
  username?: string;
}

const WhoCanSeeItem: React.FC<Props> = ({ username }) => {
  const { push } = useRouter();

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-black dark:text-white">
          <button className="font-bold">
            <PiLockKey className="w-7 h-7" />
          </button>
          <p className="text-sm font-bold text-black dark:text-white"> This post is for members only. </p>

          <ButtonInput
            onClick={() => push(`/${username}/memberships`)}
            className="mt-2"
            shape="default"
            type="button"
            size="large"
            loading={false}
            color="red"
          >
            Join now
          </ButtonInput>
        </div>
      </div>
    </>
  );
};

export { WhoCanSeeItem };
