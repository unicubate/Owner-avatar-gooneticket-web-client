import { GetInfiniteUsersAPI } from '@/api-site/user';
import { useInputState } from '../hooks';
import { ListInviteUsers } from '../setting/list-invite-users';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Tabs, TabsContent } from '@/components/ui/tabs';

import { SearchInput } from '../ui-setting';

const CreateContributorModal: React.FC<{
  showModal: boolean;
  setShowModal: any;
  buttonDialog: React.ReactNode;
}> = ({ showModal, setShowModal, buttonDialog }) => {
  const { search, isOpen, setIsOpen, handleSetSearch, hasErrors } =
    useInputState();

  const {
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    data: dataUsers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteUsersAPI({
    take: 4,
    sort: 'DESC',
    search,
  });

  const dataTableUsers = isLoadingUsers ? (
    <LoadingFile />
  ) : isErrorUsers ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataUsers?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataUsers?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListInviteUsers item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <Dialog
        onOpenChange={setShowModal}
        open={showModal}
        defaultOpen={showModal}
      >
        <DialogTrigger asChild>{buttonDialog}</DialogTrigger>
        <DialogContent className="sm:max-w-[700px] dark:bg-[#121212] dark:border-gray-800">
          <Tabs defaultValue="account" className="w-full mt-4">
            {/* <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList> */}
            <TabsContent value="account">
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <SearchInput
                    placeholder="Search by first name, last name, email"
                    onChange={handleSetSearch}
                  />
                </div>

                <div className="mt-4">
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableUsers}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { CreateContributorModal };
