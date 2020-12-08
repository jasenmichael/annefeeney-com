<template>
  <v-container width="100%" app fluid>
    <v-parallax
      dark
      v-resize="onResize"
      :src="
        windowSize.x >= 550
          ? require(`~/assets/background.jpg`)
          : require('~/assets/background-sm.jpg')
      "
      :height="windowSize.y - 25"
      widh="100vw"
    >
      <v-overlay z-index="-20"></v-overlay>
      <v-row z-index="999" align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="display-4 font-weight-thin mb-2">
            {{ page.title || $config.siteData.name }}
          </h1>
          <h2 class="subheading font-weight-light">
            {{ page.description || $config.siteData.description }}
          </h2>
          <HomeNavigation />
        </v-col>

        <!-- <v-col class="text-center mt-auto d-flex align-center flex-column">
            <v-row class="pt-10">
              <v-col class="text-start" cols="12">
                <div class="text-center">
                  <v-btn
                    v-for="(link, i) in socialLinks"
                    :key="i"
                    class="ma-3 lighten-1 fab accented-text"
                    dark
                    fab
                    :href="link.url"
                    target="_blank"
                  >
                    <v-icon dark> {{ link.icon }} </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col> -->
      </v-row>
    </v-parallax>
    <v-row z-index="999" align="center" justify="center">
      <!-- <v-col class="mt-auto" cols="12"> -->
      <v-col class="mt-auto d-flex align-center flex-column" cols="12">
        <v-row>
          <v-card rounded="0" light class="pa-6 mt-4" style="font-size: 1.3rem">
            <nuxt-content class="black--text" :document="page" />
          </v-card>
        </v-row>
      </v-col>
      <ContactLinks />
    </v-row>
  </v-container>
</template>


<script>
import getMeta from '~/utils/getMeta.js'
import { mdiMail, mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js'

export default {
  // layout: 'home',
  data: () => ({
    icons: {
      mdiMail,
      mdiTwitter,
      mdiFacebook,
      mdiInstagram,
    },
    socialLinks: [],
    windowSize: {
      x: 550,
      y: 0,
    },
  }),
  beforeMount() {
    this.onResize()
    this.getSocialLinks()
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    getSocialLinks() {
      this.socialLinks = this.$config.siteData.networks.map((network) => {
        return {
          url: network.url,
          icon: this.icon(network.name),
          // color: 'blue',
          name: network.name,
        }
      })
    },
    icon(name) {
      let icon
      switch (name) {
        case 'Twitter':
          return this.icons.mdiTwitter
        case 'Facebook':
          return this.icons.mdiFacebook
        case 'Instagram':
          return this.icons.mdiInstagram
        case 'Email':
          return this.icons.mdiMail
        default:
          return
      }
    },
  },
  async asyncData({ $content }) {
    const page = await $content('pages/home').fetch()
    return {
      page,
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
        type: 'website', // use article for blogs and such
        title: this.$config.siteData.name,
        description: this.$config.siteData.description,
        url: this.canonicalUrl,
        mainImage:
          ((this.$config.ngrok && this.$config.ngrok.url) ||
            this.$config.baseUrl) + (this.page.cover || '/background.jpg'),
      }
      return getMeta(metaData, this.$config.siteData, this.canonicalUrl)
    },
  },
  head() {
    return {
      title: this.page.description || this.$config.siteData.description,
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
