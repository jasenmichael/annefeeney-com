<template>
  <div>
    <v-btn @click="toggleShowHead()">
      {{ theHead ? 'Hide' : 'Show' }} Head
    </v-btn>
    <pre v-if="theHead"><hr>{{ theHead }}<hr></pre>
    <pre>params.type: {{ params.type }}</pre>
    <!-- <pre>contentTypes: {{ contentTypes }}</pre> -->

    <!-- if posts, create post breadcrumb, and PostsList component -->
    <div v-if="posts">
      <pre> posts {{ posts.length }} </pre>
      <!-- <pre> posts {{ posts }} </pre> -->
      <v-breadcrumbs
        divider=">"
        :items="[
          { to: '/', text: 'home' },
          { to: '/' + params.type, text: params.type },
        ]"
      ></v-breadcrumbs>
      <PostsList :posts="posts" :types="types" />
    </div>

    <!-- if single post, create breadcrumb, and PostItem component -->
    <div v-if="post">
      <v-breadcrumbs
        divider=">"
        :items="[
          { to: '/', text: 'home', exact: true },
          {
            to: `/${params.type}`,
            text: params.type,
            disabled: false,
            exact: true,
          },
          {
            to: `/${params.type}/${post.slug}`,
            text: post.slug,
            disabled: false,
            exact: true,
          },
        ]"
      ></v-breadcrumbs>
      <!-- <pre>POST: {{ post }}</pre> -->
      <PostItem :post="post" />
    </div>
  </div>
</template>


<script>
import getMeta from '~/utils/getMeta.js'

export default {
  data() {
    return {
      theHead: false,
      query: this.$route.query,
    }
  },
  async asyncData({ $content, params, error }) {
    // since we are getting our params.type from "pages/_type" folder,
    // we need to get the tumblr type from our params.type and use the type tumblr uses
    // essentially we are making an alias /type to the tumblr type
    const types = {
      photos: 'photo',
      blog: 'regular',
      videos: 'video',
      articles: 'link',
      audio: 'audio',
      // chat: "chat"
      // quote: "quote"
    }
    const contentTypes = Object.keys(types)

    // if params.type not in types return null to trigger error page
    const type = types[params.type] || null

    //get single type item /type/itemSlug
    if (params.item && type) {
      const post = await $content('tumblr', params.item)
        .where({ type })
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'Post not found' })
        })
      const posts = null
      return { params, post, posts, types }
    }

    // get all of one type /type
    if (type && !params.item) {
      const contentPosts = await $content(params.type)
        .fetch()
        .then((posts) => {
          return posts.map((post) => {
            // add type and content source to each post
            return { ...post, type, source: params.type }
          })
        })
        .catch((err) => [])
      const tumblrPosts = await $content('tumblr')
        .where({ type })
        .fetch()
        .then((posts) => {
          return posts.map((post) => {
            // add source: 'tumblr' to each post
            return { ...post, source: 'tumblr' }
          })
        })
        .catch((err) => [])

      const posts = [...tumblrPosts, ...contentPosts]
      const post = null
      return { params, posts, post, types, contentTypes }
    }

    // get all types /posts
    if (params.type === 'posts' && !params.item) {
      // const contentBlogPosts = await $content('blog')
      //   .fetch()
      //   .then((posts) => {
      //     return posts.map((post) => {
      //       // add type and content source to each post
      //       return { ...post, type: types['blog'], source: 'blog' }
      //     })
      //   })
      //   .catch((err) => [])

      // const contentType = 'blog'
      const contentPosts = []
      Promise.all(
        contentTypes.forEach(async (contentType) => {
          await $content(contentType)
            // .only('slug')
            .fetch()
            .then((posts) => {
              return posts.map((post) => {
                // add type and content source to each post
                contentPosts.push({
                  ...post,
                  type: types[contentType],
                  source: contentType,
                })
              })
            })
            .catch((err) => [])
        })
      )

      const tumblrPosts = await $content('tumblr') // []
        .fetch()
        .then((posts) => {
          return posts.map((post) => {
            // add source: 'tumblr' to each post
            return { ...post, source: 'tumblr' }
          })
        })
        .catch((err) => [])

      const post = null
      const posts = [...tumblrPosts, ...contentPosts]
      // const posts = [...tumblrPosts]
      return { params, posts, post, types, contentTypes }
    }

    // error if not a type or itemSlug empty(doesn't exist)
    if (!type || post.length) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  mounted() {},
  methods: {
    toggleShowHead() {
      this.theHead = this.theHead
        ? false
        : document.head.innerHTML.split('.v-application')[0].trim()
      console.log('clicked..', this.theHead)
    },
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
        type: 'website', // use article for blogs and such
        title:
          this.$config.siteData.name +
          ' | ' +
          this.params.type.charAt(0).toUpperCase() +
          this.params.type.slice(1) +
          ' Collection',
        description: this.$config.siteData.description,
        url: this.canonicalUrl,
        mainImage:
          ((this.$config.ngrok && this.$config.ngrok.url) ||
            this.$config.baseUrl) +
          ((this.page && this.page.cover) || '/background.jpg'),
      }
      return getMeta(metaData, this.$config.siteData, this.canonicalUrl)
    },
  },
  head() {
    return {
      title: this.params.type + ' collection',
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
