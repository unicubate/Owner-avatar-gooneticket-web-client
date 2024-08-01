import { useRouter } from 'next/router';
import { useDeferredValue, useEffect, useState } from 'react';

export const useCanonicalUrl = () => {
  const router = useRouter();
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const deferredCanonicalUrl = useDeferredValue(canonicalUrl);

  useEffect(() => {
    const origin = window.location.origin;
    const path = window.location.pathname.split('#')[0];
    setCanonicalUrl(origin + path);
  }, [router.asPath]);

  return deferredCanonicalUrl;
};
