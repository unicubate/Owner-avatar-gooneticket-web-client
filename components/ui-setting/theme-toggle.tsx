import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BiAdjust, BiMoon, BiSun } from 'react-icons/bi';
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            {['dark'].includes(theme as string) && (
              <BiMoon
                title="toggle dark mode"
                onClick={() => setTheme('light')}
                className="size-6 bg-white dark:bg-[#1c1b22]"
              />
            )}
            {['system'].includes(theme as string) && (
              <BiAdjust
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <span className="cursor-pointer">Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <span className="cursor-pointer">Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <span className="cursor-pointer">System</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
    </>
  );
};

export { ThemeToggle };
