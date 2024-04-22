import { TableAffiliations } from '@/components/affiliation/table-affiliations';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ButtonInput } from '@/components/ui-setting';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Affiliates = () => {
  const { push } = useRouter();
  const { userStorage } = useInputState();

  return (
    <>
      <LayoutDashboard title={'Affiliates'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            {/* {profile?.id ? <EnableGallery profile={profile} /> : null} */}

            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="py-2 sm:mt-0">
                <ButtonInput
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => push(`/shop/extras`)}
                  icon={<MoveLeft className="size-4" />}
                />
              </div>
            </div>

            <div className="flow-root">
              <TableAffiliations organizationId={userStorage?.organizationId} />
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Affiliates);
