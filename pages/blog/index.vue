<template>
  <v-container>
    <h2>Back to <nuxt-link to="/blog"> Blog </nuxt-link></h2>
    <h1>Fellow Travelers' Advisory Blog (Archive)</h1>
    <v-card
      max-width="900"
      class="pa-1 ma-3"
      light
      v-for="blog in sortBlogs"
      :key="blog.title"
      :to="blog.path"
    >
      <v-card-title>{{ blog.date }}</v-card-title>
      <v-card-text v-html="blog.title"></v-card-text>
      <!-- <nuxt-link :to="blog.path">{{ blog.title }}</nuxt-link> -->
    </v-card>
    <!-- </v-main> -->
  </v-container>
</template>


<script>
import getMeta from '~/utils/getMeta.js'
export default {
  middleware({ redirect, route }) {
    route.path == '/home' && redirect('/')
  },
  async asyncData({ $content, params }) {
    const blogs = await $content(`blog`)
      // .only(["slug", "title", "path"])
      .fetch()
      .catch((err) => {
        return Error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      blogs,
      params,
    }
  },
  computed: {
    sortBlogs() {
      return this.blogs
        .map((blog) => {
          let sortDate = new Date(blog.date)
          return {
            ...blog,
            sortDate,
          }
        })
        .sort((a, b) => b.sortDate - a.sortDate)
    },
    canonicalUrl() {
      return (
        ((this.$config.ngrok && this.$config.ngrok.url) ||
          this.$config.baseUrl) + this.$route.fullPath
      )
    },
    meta() {
      const metaData = {
        type: 'website', // use article for blogs and articless
        title: this.$config.siteData.name + ' - Blog',
        description: this.$config.siteData.description + ' - Blog Page',
        url: this.canonicalUrl,
        mainImage:
          ((this.$config.ngrok && this.$config.ngrok.url) ||
            this.$config.baseUrl) + '/img/og-share.png',
      }
      return getMeta(metaData)
    },
  },
  head() {
    return {
      title: this.$config.siteData.name + ' - Blog',
      meta: this.meta,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.canonicalUrl,
        },
      ],
    }
  },
}
</script>
