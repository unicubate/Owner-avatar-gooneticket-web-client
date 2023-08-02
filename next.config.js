module.exports = {
  poweredByHeader: false,
  reactStrictMode: false,
  experimental: {
     transpilePackages: ["ui"],
  },
  
  env: {
    NAME_SITE: process.env.NEXT_PUBLIC_NAME_SITE,
    QUERY_DEV_TOOLS: process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS,
    BASE_NAME_TOKEN: process.env.NEXT_PUBLIC_BASE_NAME_TOKEN,
    PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    HOST: process.env.NEXT_PUBLIC_HOST,
    DEBUG: process.env.NEXT_PUBLIC_DEBUG === "true",
    MEDIA_HOST: process.env.NEXT_PUBLIC_MEDIA_HOST ?? "",
  },
};
