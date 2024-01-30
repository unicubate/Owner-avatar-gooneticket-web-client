import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { Button } from '../ui/button';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button variant="link">
        {['dark', 'system'].includes(theme as string) && (
          <BiMoon
            title="toggle dark mode"
            onClick={() => setTheme('light')}
            className="size-6 bg-white dark:bg-[#1c1b22]"
          />
        )}
        {['light'].includes(theme as string) && (
          <BiSun
            title="toggle light mode"
            onClick={() => setTheme('dark')}
            className="size-6 bg-white dark:bg-[#1c1b22]"
          />
        )}
      </Button>

      {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
    </>
  );
};

export { ThemeToggle };
