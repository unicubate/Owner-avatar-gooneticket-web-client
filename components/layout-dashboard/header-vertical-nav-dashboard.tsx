import { VerticalNavDashboard } from "./vertical-nav-dashboard";

interface Props {
  user?: any;
}

const HeaderVerticalNavDashboard: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div className="hidden md:flex md:w-56 md:flex-col">
        <div className="flex flex-col pt-5 max-h-screen fixed bg-white">

          <VerticalNavDashboard user={user} />

        </div>
      </div>
    </>
  );
};

export { HeaderVerticalNavDashboard };
