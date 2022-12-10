/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXTAUTH_URL || 'https://gshah.dev',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
