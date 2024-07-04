import { GetOneUserPublicAPI } from '@/api-site/user';
import { TablePublicEventDates } from '@/components/event-date/table-public-event-dates';
import { useInputState } from '@/components/hooks';
import { LayoutUserPublicSite } from '@/components/layouts/user-public-site';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useRouter } from 'next/router';

const ProfilePublic = () => {
  const { userStorage: userVisiter } = useInputState();
  const { query } = useRouter();
  const username = String(query?.username);

  const { status, data: user } = GetOneUserPublicAPI({
    username,
    organizationVisitorId: userVisiter?.organizationId,
  });

  return (
    <>
      <LayoutUserPublicSite
        title={`${user?.profile?.firstName || 'User'} ${
          user?.profile?.lastName ?? ''
        }`}
        user={user}
      >
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
            <div className="container mx-auto space-y-4 p-4">
              <div className="flow-root">
                {user?.organizationId ? (
                  <TablePublicEventDates user={user} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </LayoutUserPublicSite>

      {status === 'pending' ? <LoadingFile /> : null}

      {status === 'error' ? (
        <ErrorFile
          title="404"
          description="Error find data please try again"
          className="dark:text-white"
        />
      ) : null}
    </>
  );
};

export default ProfilePublic;
