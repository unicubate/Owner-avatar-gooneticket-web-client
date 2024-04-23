import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormPost } from '@/components/post/create-or-update-form-post';
import { PrivateComponent } from '@/components/util/private-component';
import { useRouter } from 'next/router';
const PostsCreate = () => {
  const { userStorage } = useInputState();
  const organizationId = userStorage?.organizationId;
  const { query } = useRouter();
  const { type, albumId } = query;

  return (
    <>
      <LayoutDashboard title={'Posts create'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {organizationId && type === 'article' ? (
              <CreateOrUpdateFormPost organizationId={organizationId} />
            ) : null}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);
