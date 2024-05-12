import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Pops = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
};
const useReactIntersectionObserver = ({ fetchNextPage, hasNextPage }: Pops) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return {
    ref,
  };
};

export { useReactIntersectionObserver };
