module.exports = {
  poweredByHeader: false,
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    transpilePackages: ['ui'],
  },

  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],

  // i18n: {
  //   locales: ['en', 'fr'], // Langues prises en charge
  //   defaultLocale: 'en', // Langue par défaut
  // },

  env: {
    NAME_SITE: process.env.NEXT_PUBLIC_NAME_SITE,
    QUERY_DEV_TOOLS: process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS,
    BASE_NAME_TOKEN: process.env.NEXT_PUBLIC_BASE_NAME_TOKEN,
    PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    MEDIA_HOST: process.env.NEXT_PUBLIC_MEDIA_HOST ?? '',
  },
};
