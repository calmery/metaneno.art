require("nextjs-sitemap-generator")({
  baseUrl: "https://metaneno.art",
  ignoredExtensions: ["js", "map"],
  ignoredPaths: ["404", "/cheki/"],
  pagesDirectory: __dirname + "/../.next/serverless/pages",
  targetDirectory: "public/",
});
