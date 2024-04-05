import { GetOneDonationAPI } from '@/api-site/donation';
import { HorizontalNavDonation } from '@/components/donation/horizontal-nav-donation';
import { UpdateFormDonation } from '@/components/donation/update-form-donation';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';

const SettingDonations = () => {
  const user = useAuth() as any;

  const {
    data: donation,
    isError: isErrorDonation,
    isLoading: isLoadingDonation,
  } = GetOneDonationAPI({
    donationId: user?.donationUser?.id,
  });

  return (
    <>
      <LayoutDashboard title={'Donations settings'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavDonation />

            <div className="flow-root">
              {donation?.id ? <UpdateFormDonation donation={donation} /> : null}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(SettingDonations);
