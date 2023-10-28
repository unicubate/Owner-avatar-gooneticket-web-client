import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";
import { useState } from "react";
import { LayoutUserPublicSite } from "@/components/layout-user-public-site";
import { HtmlParser } from "@/utils/html-parser";
import { CreateFormPublicDonation } from "@/components/donation/create-form-public-donation";
import { RecentCommentTransactions } from "@/components/transaction/recent-comment-transactions";
import { LoadingFile } from "@/components/ui";
import ContentLoader, { BulletList } from "react-content-loader";

const ProfilePublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  if (status === "pending") {
    <LoadingFile />;
  }

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName ?? ""} ${
          user?.profile?.lastName ?? ""
        }`}
        user={user}
      >
        {user?.id ? (
          <div className="flex flex-col flex-1 bg-gray-100">
            <div className="mt-4 px-4 max-w-full sm:px-6 lg:px-8">
              <HorizontalNavPublicUser user={user} />

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-full mx-auto py-6">
                  <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
                    <div className="flow-root">
                      <div className="mx-auto sm:px-6 md:px-8">
                        {user?.profile?.description && (
                          <div className="mt-2 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                            <div className="p-8 sm:py-4 sm:px-4">
                              <div className="flex items-center">
                                <div
                                  className={`text-sm font-normal text-gray-600 group relative`}
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

                        {username && user?.id !== userVisiter?.id ? (
                          <div className="mt-4 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                            <div className="p-6 sm:py-4 sm:px-4">
                              <div className="flex items-center">
                                {user?.id ? (
                                  <CreateFormPublicDonation user={user} />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {user?.donation?.count > 0 ? (
                          <div className="mt-4 overflow-hidden bg-white shadow-2xl shadow-gray-300/60">
                            <div className="p-6 sm:py-4 sm:px-4">
                              <RecentCommentTransactions
                                model="DONATION"
                                modelIds={["DONATION"]}
                                organizationId={userVisiter?.organizationId}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContentLoader height="500" width="100%" viewBox="0 0 265 230">
            <circle cx="120" cy="30" r="25" />
            <rect x="15" y="60" rx="2" ry="2" width="230" height="20" />
            <rect x="15" y="90" rx="2" ry="2" width="230" height="40" />
            <rect x="15" y="140" rx="2" ry="2" width="230" height="150" />
          </ContentLoader>
        )}
      </LayoutUserPublicSite>
    </>
  );
};

export default ProfilePublic;
