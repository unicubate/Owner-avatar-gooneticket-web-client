import Link from "next/link";
import { BiCoffeeTogo } from "react-icons/bi";
import { Dropdown, MenuProps } from "antd";
import { usePathname } from "next/navigation";
import { logoutUser, useAuth } from "../util/context-user";
import { useState } from "react";
import { AvatarComponent } from "../ui-setting/ant/avatar-component";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { CreateOrUpdateFormFollow } from "../like-follow/create-or-update-form-follow";
import { ButtonInput } from "../ui-setting/ant";
import { CreateModalPublicDonation } from "../donation/create-modal-public-donation";
import { UserModel } from "@/types/user.type";
import { ColorType } from "@/types/profile.type";
import { navigationPublicUser } from "./index";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../ui-setting/theme-toggle";

interface Props {
  user?: UserModel;
  showDrawer?: () => void;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    label: (
      <a href={void 0} title="" onClick={() => logoutUser()}>
        Logout
      </a>
    ),
  },
];

const HorizontalNavUserPublicSite: React.FC<Props> = ({ user, showDrawer }) => {
  const t = useTranslations("menu-site");
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const pathname = usePathname();
  const username = user?.username;
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t("home")}`,
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: `${t("gallery")}`,
      status: user?.profile?.enableGallery,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: `${t("memberships")}`,
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: `${t("posts")}`,
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: `${t("shop")}`,
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
    {
      title: `${t("commissions")}`,
      status: user?.profile?.enableCommission,
      count: user?.commission?.count,
      href: `/${username}/commissions`,
    },
  ]);

  return (
    <>
      <header className="sticky top-0 z-20 border-gray-300 bg-white dark:bg-[#1c1b22]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="-m-2 flex items-center xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-[#121212] dark:text-white dark:hover:text-gray-500 dark:focus:ring-indigo-600"
              >
                <svg
                  className="size-6"
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

            <div className="ml-6 mr-auto flex xl:ml-0">
              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                <nav className="-mb-px flex space-x-10">
                  {navigation
                    .filter(
                      (item) =>
                        item?.status === true && Number(item?.count) >= 1
                    )
                    .map((item: any, index: number) => {
                      const isActive = pathname === item.href;
                      // const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={index}
                          href={`${item?.href}`}
                          title={item?.title}
                          className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                              : `border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300`
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

                <div className="relative">
                  <ThemeToggle />
                </div>

                  {userVisiter?.id !== user?.id ? (
                    <>
                      <ButtonInput
                        shape="default"
                        size="medium"
                        type="button"
                        color={user?.profile?.color as ColorType}
                        loading={false}
                        onClick={() => setOpenModal(true)}
                        icon={<BiCoffeeTogo className="size-5" />}
                      >
                        Donate
                      </ButtonInput>
                      <CreateOrUpdateFormFollow item={user} />
                    </>
                  ) : (
                    <>
                      <Dropdown menu={{ items }} placement="bottomRight" arrow>
                        <button
                          type="button"
                          className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <AvatarComponent
                            className="size-9"
                            profile={user?.profile}
                          />
                          <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
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
