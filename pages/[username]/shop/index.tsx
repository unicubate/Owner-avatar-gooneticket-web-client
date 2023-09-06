import { Button, Image } from "antd";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiCartAdd, BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api/user";
import { useRouter } from "next/router";
import PublicPosts from "@/components/post/public-posts";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/session/context-user";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const ShopUserPublic = () => {
  const userVisiter = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username});

  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      {/* <div classNameNameNameNameName="max-w-7xl mx-auto"> */}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-2 grid grid-cols-1 gap-3 mt-8 sm:gap-6 lg:gap-8 xl:gap-12 sm:mt-12 lg:grid-cols-3">
          <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
            <Image
              preview={false}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
              src="https://picsum.photos/seed/UGlAfLt/640/480"
              alt=""
            />

            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center flex-shrink-0">
                <p className="text-2xl font-bold text-gray-900">$56.93</p>
                <p className="text-sm text-gray-400 font-bold ml-2">
                  {" "}
                  <del> $79.49 </del>
                </p>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                <a href="#" title="">
                  {" "}
                  Columbia Mens Bahama Vent PFG Boat Shoe{" "}
                </a>
              </h3>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <div className="sm:flex flex-col sm:items-end sm:justify-between">
                <div className="mt-2">
                  <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
          <Image
                preview={false}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://loremflickr.com/640/480?lock=5319110548258816"
                alt=""
              />
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center flex-shrink-0">
                <p className="text-2xl font-bold text-gray-900">$10</p>
                <p className="text-sm text-gray-400 font-bold ml-2.5">
                  {" "}
                  <del> $40 </del>
                </p>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                <a href="#" title="">
                  {" "}
                  Columbia Mens Bahama Vent PFG Boat Shoe{" "}
                </a>
              </h3>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>

              <div className="sm:flex flex-col sm:items-end sm:justify-between">
                <div className="mt-2">
                  <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
          <Image
                preview={false}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://picsum.photos/seed/D6zdo/640/480"
                alt=""
              />
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center flex-shrink-0">
                <p className="text-2xl font-bold text-gray-900">$20</p>
                <p className="text-sm text-gray-400 font-bold ml-2.5">
                  {" "}
                  <del> $79 </del>
                </p>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                <a href="#" title="">
                  {" "}
                  Columbia Mens Bahama Vent PFG Boat Shoe{" "}
                </a>
              </h3>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>

              <div className="sm:flex flex-col sm:items-end sm:justify-between">
                <div className="mt-2">
                  <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl">
            <Image
                preview={false}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://picsum.photos/seed/573RkE7/640/480"
                alt=""
              />

            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center flex-shrink-0">
                <p className="text-2xl font-bold text-gray-900">$20</p>
                <p className="text-sm text-gray-400 font-bold ml-2">
                  {" "}
                  <del> $79 </del>
                </p>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                <a href="#" title="">
                  {" "}
                  Columbia Mens Bahama Vent PFG Boat Shoe{" "}
                </a>
              </h3>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>

              <div className="sm:flex flex-col sm:items-end sm:justify-between">
                <div className="mt-2">
                  <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopUserPublic;
