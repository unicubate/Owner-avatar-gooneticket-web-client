import Link from "next/link";
import {
  BiHomeCircle,
  BiSearch,
  BiBookContent,
  BiCoffeeTogo,
} from "react-icons/bi";
import { VscOpenPreview } from "react-icons/vsc";
import { useRouter } from "next/router";
import { Avatar, Button, Dropdown, Image, MenuProps } from "antd";
import { usePathname } from "next/navigation";
import { getCurrentUserFormToken, logoutUser, useAuth } from "../util/context-user";
import { useState } from "react";
import { AvatarComponent } from "../ui/avatar-component";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { CreateOrUpdateFormFollow } from "../like-follow/create-or-update-form-follow";
import { ButtonInput } from "../ui";
import { CreateModalPublicDonation } from "../donation/create-modal-public-donation";
import { UserModel } from "@/types/user.type";
import { ColorType } from "@/types/profile.type";

interface Props {
  user?: UserModel;
  showDrawer?: () => void;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (<Link href="/dashboard">Dashboard</Link>),
  },
  {
    key: '2',
    label: (
      <a href={void (0)}
        title=""
        onClick={() => logoutUser()}
      >
        Logout
      </a>
    ),
  },
];


const HorizontalNavUserPublicSite: React.FC<Props> = ({ user, showDrawer }) => {
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Home",
      status: true,
      href: `/${user?.username}`,
    },
    {
      title: "Gallery",
      status: user?.profile?.enableGallery,
      href: `/${user?.username}/gallery`,
    },
    {
      title: "Memberships",
      status: true,
      href: `/${user?.username}/memberships`,
    },
    {
      title: "Posts",
      status: true,
      href: `/${user?.username}/posts`,
    },
    {
      title: "Shop",
      status: user?.profile?.enableShop,
      href: `/${user?.username}/shop`,
    },
    {
      title: "Commissions",
      status: user?.profile?.enableCommission,
      href: `/${user?.username}/commissions`,
    },
  ]);

  return (
    <>
      <header className="bg-white border-[1px] border-gray-300 sticky top-0 z-20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <div className="flex ml-6 mr-auto xl:ml-0">

              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                <nav className="flex -mb-px space-x-10">
                  {navigation
                    .filter((item) => item?.status === true)
                    .map((item: any, index: number) => {
                      const isActive = pathname === item.href;
                      // const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={index}
                          href={`${item?.href}`}
                          title={item?.title}
                          className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                            ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                            : `border-transparent text-gray-500 hover:border-gray-300`
                            } `}
                        >
                          {item?.icon}

                          {item?.title}
                        </Link>
                      );
                    })}
                </nav>
              </div>
            </div>

            <div className="flex items-center justify-end">

              <div className="flex items-center space-x-2 sm:ml-5">
                {userVisiter?.id !== user?.id ? (
                  <>
                    <ButtonInput
                      shape="default"
                      size="normal"
                      type="button"
                      color={user?.profile?.color as ColorType}
                      loading={false}
                      onClick={() => setOpenModal(true)}
                      icon={<BiCoffeeTogo className="h-6 w-6" />}
                    >
                      Donate
                    </ButtonInput>
                    <CreateOrUpdateFormFollow item={user} />
                  </>
                ) : (
                  <>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                      <button type="button"  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                        <AvatarComponent
                          profile={user?.profile}
                          className="object-cover bg-gray-300 rounded-full w-9 h-9"
                        />
                        <p className="ml-1 text-sm font-bold text-gray-900">
                          {user?.profile?.firstName} {user?.profile?.lastName}
                        </p>
                      </button>
                    </Dropdown>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {openModal ? (
        <CreateModalPublicDonation
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
        />
      ) : null}
    </>
  );
};

export { HorizontalNavUserPublicSite };
