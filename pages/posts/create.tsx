import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { CreateOrUpdateFormAlbumPost } from '@/components/post/create-or-update-form-album-post';
import { CreateOrUpdateFormAudioPost } from '@/components/post/create-or-update-form-audio-post';
import { CreateOrUpdateFormGalleryPost } from '@/components/post/create-or-update-form-gallery-post';
import { CreateOrUpdateFormPost } from '@/components/post/create-or-update-form-post';
import { CreateOrUpdateFormVideoPost } from '@/components/post/create-or-update-form-video-post';
import { PrivateComponent } from '@/components/util/private-component';
import { GetStaticPropsContext } from 'next';
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

            {organizationId && type === 'audio' ? (
              <CreateOrUpdateFormAudioPost organizationId={organizationId} />
            ) : null}

            {organizationId && type === 'video' ? (
              <CreateOrUpdateFormVideoPost organizationId={organizationId} />
            ) : null}

            {organizationId && type === 'gallery' ? (
              <CreateOrUpdateFormGalleryPost
                organizationId={organizationId}
                albumId={albumId as string}
              />
            ) : null}

            {organizationId && type === 'album' ? (
              <CreateOrUpdateFormAlbumPost organizationId={organizationId} />
            ) : null}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
