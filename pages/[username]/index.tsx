import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { HtmlParser } from "@/utils/html-parser";
import { CreateFormPublicDonation } from "@/components/donation/create-form-public-donation";
import { RecentCommentTransactions } from "@/components/transaction/recent-comment-transactions";
import { LoadingFile } from "@/components/ui";
import ContentLoader from "react-content-loader";
import Skeleton from "react-loading-skeleton";
import { SubHorizontalNavPublicUser } from "@/components/user/sub-horizontal-nav-public-user";
import { ErrorFile } from "@/components/ui/error-file";

const ProfilePublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    status,
    data: user
  } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });


  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${user?.profile?.lastName ?? ""
          }`}
        user={user}
      >
        <div className="mt-4 px-4 max-w-full sm:px-6 lg:px-8">
          {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto py-6">

              {user?.id ? <SubHorizontalNavPublicUser user={user} /> : null}

              <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
                <div className="flow-root">
                  <div className="mx-auto sm:px-6 md:px-8">
                    {user?.profile?.description && (
                      <div className="mt-2 overflow-hidden bg-white dark:bg-black rounded-lg shadow-xl shadow-gray-600/15">
                        <div className="p-8 sm:py-4 sm:px-4">
                          <div className="flex items-center">
                            <div
                              className={`text-sm font-normal text-gray-600 dark:text-gray-300 group relative`}
                            >
                              <span className={`ql-editor`}>
                                <HtmlParser
                                  html={String(
                                    user?.profile?.description ?? ""
                                  )}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}


                    {status === "pending" && (
                      <>
                        <Skeleton height={30} width="100%" />
                        <Skeleton height={100} width="100%" className="mt-4" />
                        <Skeleton height={30} width="100%" className="mt-8" />
                        <Skeleton height={30} width="100%" className="mt-2" />
                      </>
                    )}

                    {status === "error" && (
                      <ErrorFile
                        status="error"
                        title="404"
                        description="Error find data please try again..."
                      />
                    )}


                    <div className="mt-4 overflow-hidden bg-white dark:bg-black rounded-lg shadow-xl shadow-gray-600/15">
                      <div className="p-6 sm:py-4 sm:px-4">
                        <div className="flex items-center">

                          {user?.id ? <CreateFormPublicDonation user={user} /> : null}

                        </div>
                      </div>
                    </div>

                    {user?.donation?.count > 0 ? (
                      <RecentCommentTransactions
                        model="DONATION"
                        modelIds={["DONATION"]}
                        userReceiveId={user?.id}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>
    </>
  );
};

export default ProfilePublic;
