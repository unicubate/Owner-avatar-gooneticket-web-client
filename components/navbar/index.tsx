import Logo from "./logo";
import Searchbar from "./searchbar";
import Path from "./path";
import { ExploreIcon, HeartIcon, MessengerIcon, PostIcon } from "./icons";
import Profile from "./profile";
import { DownloadOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "../util/session/context-user";
// import { MenuAlt4Icon } from '@heroicons/react/outline';
// import { HomeIcon } from '@heroicons/react/solid';

interface Props {
  user: any;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [size, setSize] = useState<SizeType>("large");

  return (
    <nav className="flex items-center justify-between px-5 h-14 gap-5">
      <Logo />
      {/* <Searchbar /> */}
      <div className="flex items-center gap-5">
        <ul className="sm:flex items-center gap-5 hidden">
          {/* <Path Icon={HomeIcon} /> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg> */}

          {/* <Path Icon={MessengerIcon} />
          <Path Icon={PostIcon} />
          <Path Icon={ExploreIcon} />
          <Path Icon={HeartIcon} /> */}
          <Button onClick={() => {
            router.push(`${`/explore`}`);
          }} type="text">
            Explore
          </Button>
          <Button onClick={() => {
            router.push(`${`/about`}`);
          }} type="text">About</Button>
          <Button type="text">Blog</Button>

          {user?.id ? (
            <>
              <Path Icon={MessengerIcon} />
              <Path Icon={PostIcon} />
              <Path Icon={ExploreIcon} />
              <Path Icon={HeartIcon} />
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  router.push(`${`/login`}`);
                }}
                size={size}
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  router.push(`${`/register`}`);
                }}
                type="primary"
                size={size}
              >
                Sign Up
              </Button>
            </>
          )}
        </ul>
        {/* <MenuAlt4Icon className="w-6 sm:hidden" /> */}
        {/* <Profile /> */}
      </div>
    </nav>
  );
};

export default Navbar;
