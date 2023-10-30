import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { UpdateFormDonation } from "@/components/donation/update-form-donation";
import { useAuth } from "@/components/util/context-user";
import { GetOneDonationAPI } from "@/api-site/donation";

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
      <LayoutDashboard title={"Donations settings"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavDonation />

                <div className="flow-root">
                  {donation?.id ? <UpdateFormDonation donation={donation} /> : null}
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(SettingDonations);
