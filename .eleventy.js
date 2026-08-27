const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json"]);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  }); 
};