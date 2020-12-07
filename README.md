# Nuxt Supercharged Boilerplate

Features: 
- Nuxt.js
- Progressive Web App (PWA)
- Trusted Web Application (TWA) -- soon
- Authentication with Netlify Identity
- Open Graph and Twitter head tags for SEO
- Content Management System(CMS) with NetlifyCms (and local cms proxy)
- Flat-file site settings (editable through NetlifyCms)

see it in action [here](https://nuxt-supercharged-boilderplate.netlify.app/)

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jasenmichael/nuxt-supercharged-boilderplate)

----
steps taken to create:
- [x] create-nuxt-app
- [x] install netlifycms
  - [x] create pages/admin.vue
  - [x] create static/config.yml
  - [x] run netlify cms locally ```npx netlify-cms-proxy-server```
- [x] create site data via local cms
- [x] put siteData in runtimeConfig
- [x] add @nuxt/ngrok
- [x] implement dynamic head
- [x] create git repository
- [x] add remote
- [x] push to github
- [x] create netlify.toml, and add deploy to netlify in README.md
- [x] deploy to netlify from github
- [x] check seo tags on.
  - [x] [metatags.io](https://metatags.io/) 
  - [x] [Twitter validator](https://cards-dev.twitter.com/validator)
  - [x] [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  
  ```note: twiter validator and fb debugger cache your site, so changes in your header will not reflect immediatly when you re-run, use metatags first, and to work around twitter and fb cache of site - use a dev branch or change subdomain in netlify, as you will have a new url ;)```
- [x] setup and config Netlify identity and Git-gateway for Netlify Cms
  - [x] enable netlify identity
  - [x] invite self
  - [x] enable git-gateway
- [ ] improve pwa lighthouse score
  - [ ] fix... 
  todo:
- [ ] implement twa module  
- [ ] install post-css
- [ ] add sitemap
- [ ] add feed feed.json and rss.xml
- [ ] add robots.txt

env
 - NGROK_AUTHTOKEN - for ngrok usage in dev

Nuxt Content / NetlifyCms Collections scheme - static/admin/config.yml
- site data (json)
  - name: String
  - description: String
  - language: String
  - networks: Array
    - name: String 
    - url: String
    - icon: Image
    - handle: String
  - favicon: Image
  - tags: String Array
- pages (markdown)
  -  title: String
  -  cover: Image
  -  description: String
  -  body: Markdown
  
to add in static/config.yml
- articles
- blog
- photos
