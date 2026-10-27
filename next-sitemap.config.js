/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ahmadbasit.com",
  generateRobotsTxt: true,
  outDir: "public",
  trailingSlash: true,
  exclude: [
    "/admin",
    "/admin/*",
    "/publisher",
    "/publisher/*",
    "/mab/*",
    "/api/*",
    "/login",
    "/login/*",
  ],
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1.0
        : path.includes("/blogs/")
        ? 0.8
        : path.includes("-with-ai-in-")
        ? 0.6 // pSEO pages: real but lower priority than curated content
        : 0.7,
    lastmod: new Date().toISOString(),
  }),
};
