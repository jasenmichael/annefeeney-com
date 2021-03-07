<template>
  <v-container>
    <h2 class="mb-6">Back to <nuxt-link to="/blog"> Blog </nuxt-link></h2>
    <!-- <pre>{{ blogImages }}</pre> -->
    <!-- <img v-for="(img, i) in blogImages" :key="i" :src="img" alt=""> -->
    <v-card light class="pa-8 ma-3">
      <h1 v-html="blog.title"></h1>
      <div v-html="body"></div>
      <!-- <pre>{{ blog }}</pre> -->
    </v-card>
  </v-container>
</template>


<script>
import getMeta from '~/utils/getMeta.js'
export default {
  middleware({ redirect, route }) {
    route.path == '/home' && redirect('/')
  },
  async asyncData({ $content, params }) {
    const blog = await $content(`blog/${params.slug}`)
      // .only(["slug", "title", "path"])
      .fetch()
      .catch((err) => {
        return Error({ statusCode: 404, message: 'Page not found' })
      })
    const body = blog.body
      // add on error display.none for broken images
      .replace(/<img/g, `<img onerror=\"this.style.display=\'none\'\"`)
      .replace(/http:/g, 'https:')
    // const imgRex = /<img.*?src="(.*?)"[^>]+>/g
    // const imgRex = /<img.*?src='(.*?)'/g
    // const blogImage = imgRex.exec(blog.body)
    const blogImages = [...new Set(blog.body.split(" ").filter(line => line.includes("jpg")).map(line => {
      return JSON.parse(line.replace(/href=/g, '').replace(/src=/g, ""))
    }))]
    
    // .map(line => {
    //   return line.split(" ")
    // })
    return {
      blog,
      params,
      body,
      blogImages,
    }
  },
  computed: {
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
            this.$config.baseUrl) + '/background.jpg',
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
