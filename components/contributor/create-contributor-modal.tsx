import { useInputState } from '../hooks';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { GetInfiniteUsersAPI } from '@/api-site/user';
import { ListInviteUsers } from '../setting/list-invite-users';
import { SearchInput } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreateOrUpdateFormContributor } from './create-or-update-form-contributor';

const CreateContributorModal = ({
  showModal,
  setShowModal,
  buttonDialog,
}: {
  showModal: boolean;
  setShowModal: any;
  buttonDialog: React.ReactNode;
}) => {
  const { search, isOpen, setIsOpen, handleSetSearch, hasErrors, t } =
    useInputState();

  const {
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    data: dataUsers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteUsersAPI({
    take: 2,
    sort: 'DESC',
    search,
  });

  const dataTableUsers = isLoadingUsers ? (
    <LoadingFile />
  ) : isErrorUsers ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataUsers?.pages[0]?.data?.total) <= 0 ? (
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
        <DialogContent className="dark:border-gray-800 dark:bg-[#121212] sm:max-w-[650px]">
          <Tabs defaultValue="new-contributor" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new-contributor">
                Create contributor
              </TabsTrigger>
              <TabsTrigger value="invite">Invite people</TabsTrigger>
            </TabsList>
            <TabsContent value="new-contributor">
              <CreateOrUpdateFormContributor
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </TabsContent>
            <TabsContent value="invite">
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
