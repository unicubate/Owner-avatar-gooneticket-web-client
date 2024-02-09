import { GetOneUserPublicAPI } from '@/api-site/user';
import { HorizontalNavPublicUser } from '@/components/user/horizontal-nav-public-user';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

const TransactionCancel = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <h1>Susses</h1>
    </>
  );
};

export default TransactionCancel;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`../../lang/${locale}/index.json`)).default,
      },
    },
  };
}
