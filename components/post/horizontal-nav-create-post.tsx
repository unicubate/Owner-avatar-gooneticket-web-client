import React, { useState } from "react";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { useRouter } from "next/router";
import { IconTypePost } from "@/utils/icon-type-post";

const classIcon = "flex-shrink-0 w-8 h-8 text-gray-600 md:w-10 md:h-10";

const HorizontalNavCreatePost: React.FC<{ user?: any }> = ({ user }) => {
  const router = useRouter();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Write a post",
      href: `/posts/create?type=article`,
      description: `983 Available Posts`,
      icon: <IconTypePost type="ARTICLE" className={classIcon} />,
    },
    {
      title: "Audio post",
      href: `/posts/create?type=audio`,
      description: `142 Available Audio Posts`,
      icon: <IconTypePost type="AUDIO" className={classIcon} />,
    },
    {
      title: "Album post",
      href: `/posts/create?type=album`,
      description: `142 Available Audio Posts`,
      icon: <IconTypePost type="GALLERY" className={classIcon} />,
    },
    {
      title: "Video post",
      href: `/posts/create?type=video`,
      description: `142 Available Videos Posts`,
      icon: <IconTypePost type="VIDEO" className={classIcon} />,
    },
  ]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 mt-8 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4 sm:gap-8 xl:gap-12">
        {navigation.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => router.push(item?.href)}
              className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* <div className="p-6 lg:px-10 lg:py-8"> */}
              <div className="p-6 lg:px-6 lg:py-4">
                <div className="flex items-center justify-start space-x-3">
                  {item?.icon}
                  <>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white sm:text-base lg:text-lg">
                      {item?.title}
                    </h3>
                    {/* <p className="mt-2 text-sm font-medium text-gray-600">
                      {item?.description}
                    </p> */}
                  </>
                </div>
              </div>
              {/* </div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { HorizontalNavCreatePost };
