import { GetAllCategoriesAPI } from '@/api-site/category';
import { CreateOrUpdateFormEvent } from '@/components/event/create-or-update-form-event';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { PrivateComponent } from '@/components/util/private-component';

const EventCreate = () => {
  const { locale, userStorage } = useInputState();

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'FALSE',
    organizationId: userStorage?.organizationId,
    sort: 'DESC',
    take: 100,
  });

  return (
    <>
      <LayoutDashboard title={'Event create'}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            {userStorage?.organizationId ? <CreateOrUpdateFormEvent categories /> : null}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(EventCreate);
