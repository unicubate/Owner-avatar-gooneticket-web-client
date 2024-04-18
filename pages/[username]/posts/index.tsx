import { GetOneUserPublicAPI } from '@/api-site/user';
import { LayoutUserPublicSite } from '@/components/layout-user-public-site';
import { PublicPosts } from '@/components/post/public-posts';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { useAuth } from '@/components/util/context-user';
import { useRouter } from 'next/router';

const PostsUserPublic = () => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query, push } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    userVisitorId: userVisiter?.id,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`Posts - ${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full py-6">
            <div className="border-gray-200 py-6 lg:col-span-3 xl:col-span-4">
              <div className="flow-root">
                <div className="mx-auto sm:px-6 md:px-8">
                  {user?.id ? (
                    <PublicPosts
                      typeIds={['ARTICLE', 'AUDIO', 'VIDEO']}
                      userVisitor={{
                        id: userVisiter?.id,
                        organizationId: user?.organizationId,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile title="404" description="Error find data please try again" />
      ) : null}
    </>
  );
};

export default PostsUserPublic;
