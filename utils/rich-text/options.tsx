import type { MarkdownToJSX } from 'markdown-to-jsx';
import Link from 'next/link';

export const MDOptions: MarkdownToJSX.Options = {
  forceInline: false,
  overrides: {
    p: {
      component: ({ children }) => <p>{children}</p>,
    },
    h1: {
      component: ({ children }) => <h1>{children}</h1>,
    },
    h2: {
      component: ({ children }) => <h2>{children}</h2>,
    },
    h3: {
      component: ({ children }) => <h3>{children}</h3>,
    },
    h4: {
      component: ({ children }) => <h4>{children}</h4>,
    },
    h5: {
      component: ({ children }) => <h5>{children}</h5>,
    },
    h6: {
      component: ({ children }) => <h6>{children}</h6>,
    },
    li: {
      component: ({ children }) => (
        <li style={{ fontFamily: 'Rubik', fontWeight: 'bold' }}>{children}</li>
      ),
    },
    a: {
      component: ({ children, href }) => (
        <Link
          className="text-blue-500 hover:underline"
          style={{ fontWeight: 'bold', color: '#2563eb' }}
          href={href}
          target={href?.[0]?.startsWith('/') ? '_self' : '_blank'}
        >
          {children}
        </Link>
      ),
    },
  },
};
