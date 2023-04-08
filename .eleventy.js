const dayjs = require("dayjs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const footnotes = require('eleventy-plugin-footnotes');
//const markdownItFootnote = require("markdown-it-footnote");
const Image = require("@11ty/eleventy-img");
const activityPubPlugin = require('eleventy-plugin-activity-pub');


(async () => {
  let url = "https://images.unsplash.com/photo-1608178398319-48f814d0750c";
  let stats = await Image(url, {
    widths: [300]
  });

  console.log( stats );
})();

module.exports = function (config) {
  // Pass-through images
  config.addPassthroughCopy("./_site/images");
  config.addPassthroughCopy("./_site/css");
  
  config.addWatchTarget("./_site/css");

  config.addPlugin(pluginRss);

  config.addPlugin(footnotes, { /* … */ })

  config.addPlugin(activityPubPlugin, {
		domain: 'smgalante.com',
		username: 'smgalante@smgalante.com',
		displayName: 'Steven Galante',
		summary: 'This is my Eleventy website, except now its also discoverable on the Fediverse!',
	});

/*
    // set markdown footnote processor
    let markdownIt = require("markdown-it");
    let markdownItFootnote = require("markdown-it-footnote");

    let options = {
      html: true,
      breaks: true,
      linkify: true
    };
    let markdownLib = markdownIt(options).use(markdownItFootnote);

    config.setLibrary("md", markdownLib);
*/
  

  // Add Date filters
  config.addFilter("date", (dateObj) => {
    return dayjs(dateObj).format("MMMM D, YYYY");
  });

  config.addFilter("sitemapDate", (dateObj) => {
    return dayjs(dateObj).toISOString();
  });

  config.addFilter("year", () => {
    return dayjs().format("YYYY");
  });

  // Add pages collection
  config.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('_site/blog/posts/**/*.md')
    });

  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine:  'md', 
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "dist",
    },
  };
};
