import Link from "next/link";
import { BiHomeCircle, BiSearch, BiBookContent, BiCoffeeTogo } from "react-icons/bi";
import { VscOpenPreview } from "react-icons/vsc";
import { useRouter } from "next/router";
import { Avatar, Button, Image } from "antd";
import { usePathname } from "next/navigation";
import { getCurrentUserFormToken, useAuth } from "../util/context-user";
import { useState } from "react";
import { AvatarComponent } from "../ui/avatar-component";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { CreateOrUpdateFormFollow } from "../like-follow/create-or-update-form-follow";
import { ButtonInput } from "../ui";
import { CreatePublicDonation } from "../donation/create-public-donation";


interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavUserPublicSite: React.FC<Props> = ({ user, showDrawer }) => {
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const router = useRouter();
  const pathname = usePathname();
  const { query } = useRouter();
  const username = String(query?.username);
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Home",
      status: true,
      href: `/${username}`,
    },
    {
      title: "Gallery",
      status: user?.profile?.enableGallery,
      href: `/${username}/gallery`,
    },
    {
      title: "Memberships",
      status: true,
      href: `/${username}/memberships`,
    },
    {
      title: "Posts",
      status: true,
      href: `/${username}/posts`,
    },
    {
      title: "Shop",
      status: user?.profile?.enableShop,
      href: `/${username}/shop`,
    },
    {
      title: "Commissions",
      status: user?.profile?.enableCommission,
      href: `/${username}/commissions`,
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
              {/* <div className="flex items-center flex-shrink-0">
                <Image
                  preview={false}
                  className="block w-auto h-8 lg:hidden"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                  alt=""
                />
                <Image
                  preview={false}
                  className="hidden w-auto h-8 lg:block"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                  alt=""
                />
              </div> */}

              {/* <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                {navigation.filter((item) => item?.status === true).map((item: any, index: number) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item?.title}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium  transition-all duration-200 border-b-2  ${isActive
                          ? `text-${user?.profile?.color ?? "indigo"
                          }-600 border-${user?.profile?.color ?? "indigo"
                          }-600`
                          : "text-gray-700 hover:border-gray-300 hover:text-gray-900"
                        } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}

              </div> */}

              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                <nav className="flex -mb-px space-x-10">
                  {navigation.filter((item) => item?.status === true).map((item: any, index: number) => {
                    const isActive = pathname.startsWith(item.href);
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
              {/* <div className="flex-1 hidden max-w-xs ml-auto lg:block">
                    <label className="sr-only"> Search </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input type="search" name="" id="" className="block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                    </div>
                </div> */}


              {/* <div className="relative">
                

              </div> */}

              <div className="flex items-center space-x-2 sm:ml-5">
                {userVisiter?.id !== user?.id ? (
                  <>
                    <ButtonInput
                      shape="default"
                      size="normal"
                      type="button"
                      color={user?.profile?.color}
                      loading={false}
                      onClick={() => setOpenModal(true)}
                      icon={<BiCoffeeTogo className="h-6 w-6" />}
                    >
                      Donate
                    </ButtonInput>
                    <CreateOrUpdateFormFollow item={user} />
                  </>
                ) :
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    <AvatarComponent
                      profile={user?.profile}
                      className="object-cover bg-gray-300 rounded-full w-9 h-9"
                    />
                    <p className="ml-1 text-sm font-bold text-gray-900">
                      {user?.profile?.firstName} {user?.profile?.lastName}
                    </p>
                  </button>}
              </div>
            </div>
          </div>
        </div>
      </header>

      {openModal ? (
        <CreatePublicDonation
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
        />
      ) : null}
    </>
  );
};

export { HorizontalNavUserPublicSite };
