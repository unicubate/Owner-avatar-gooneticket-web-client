import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useRedirectAfterSomeSeconds(redirectTo: string, seconds = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const { push } = useRouter();

  useEffect(() => {
    if (secondsRemaining === 0) push(redirectTo);

    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      if (secondsRemaining === 1) push(redirectTo);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [push, secondsRemaining, redirectTo]);

  const minutes = Math.floor(secondsRemaining / 60);
  const displaySeconds = secondsRemaining % 60;
  const timerRemaining = `${minutes < 0 && secondsRemaining === 0 ? '0:0' : `${minutes}:${displaySeconds < 10 ? `${displaySeconds}` : displaySeconds}`} `;

  return { timerRemaining };
}
