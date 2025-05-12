/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  env: {
    //NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}

// There is a lot more that can go in here.  From redirects to headers to build options.
// See https://github.com/themotleyfool/premium/blob/master/apps/epic/next.config.js
// Primary environmental specific functionality like sourcemaps for dev.
// And Sentry config for non-dev.  

module.exports = nextConfig
