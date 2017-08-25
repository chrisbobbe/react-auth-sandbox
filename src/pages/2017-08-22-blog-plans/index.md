---
title: Blog Fixes and Features!
date: "2017-08-22T20:23:03.284Z"
path: "/blog-plans/"
tags: ["projects", "blog"]
---

## Where to next?

I've made a list of changes I want to make to my blog. Actually two lists: Fixes and Features!

## Fixes:

I've noticed a bug that also seems to show up on Gatsby's own website, which I'm guessing they built with Gatsby. Images in my blog posts, which I insert in Markdown with `![display-text](link/to/image)`, always seem to act as clickable links that add `/undefined` to the path when you click on them. Also, sometimes images never load fully, and just stay really blurry with the alt text displayed at the top. (Again, this happens both on my blog and on www.gatsbyjs.org.)

For some reason, some bugs I see when testing locally with `gatsby develop` are different from those on GitHub Pages. Since I didn't write this code (it came from Dustin Schau at [gatsbyjs.org](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/)), it could be a challenge for me to find and squash bugs, but I'm ready for it! My biggest concern is that there might be something going wrong under the Gatsby hood, which could be out of my control unless I find a workaround.

### Local development:
The background color is affected by the Google Chrome theme I'm using; I tried a few different ones to test. Why is that, I wonder? And why doesn't this problem show up on GitHub Pages?

### On GitHub Pages:
The header renders with exactly the same `<h3>` style on the homepage and on each blog post page. But it's supposed to be a bigger `<h1>` for the homepage. So I went to check the layout component, and it's working with conditional rendering, starting with this line: `if (location.pathname === '/') {`. The difference seems to be that the main page runs on localhost:8000/, whereas in production we're at https://chrisbobbe.github.io**/gatsby-blog/**. That "gatsby-blog" part is there because that's what the GitHub repository is called, but Gatsby is supposed to take this into account using something called `pathPrefix`. From the [docs](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/path-prefix.md), it seems like `pathPrefix` should make sure that a "/gatsby-blog" in production will be treated the same way as a "/" in development, and that I should write code only for the "/" case:

> During development, write paths as if there was no path prefix e.g. for a blog hosted at example.com/blog, don't add /blog to your links. The prefix will be added when you build for deployment.

There are other problems that seem to have to do with pathPrefix. Even on the LocalHost, it sometimes randomly tries to append "/gatsby-blog" to the path, which shouldn't be happening.

## Features:

I'd really like to add a tagging and filtering feature to my blog. That way I could let people narrow down on the projects I'm working on, if they're not interested in random spontaneous outbursts on other nerdy topics. I also want to do a major overhaul of the styling, and I'm looking at a React library called [styled-components](https://www.styled-components.com/docs/basics#motivation) to do this. It catches my eye because it lets you skip a lot of inline css mapping with `className` in favor of defining styles in React components themselves. But I'm about to find out how hard this will be. This Gatsby blog starter kit isn't built with React design principles I'm used to; it only has one component, Bio, in the Components folder, for example. Clearly other things are being rendered somehow, but I'll have to look harder to see if this is done with React components, or if I can organize it into React components to enable styled-components.
