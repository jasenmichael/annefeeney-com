<template>
  <v-col class="text-center mt-auto d-flex align-center flex-column">
    <v-row>
      <v-col class="text-start" cols="12">
        <div class="text-center">
          <v-btn
            v-for="(link, i) in socialLinks"
            :key="i"
            class="ma-3 lighten-1 fab accented-text"
            dark
            fab
            :href="link.url"
            rel="noreferrer"
            :aria-label="link.name"
            target="_blank"
          >
            <v-icon dark> {{ link.icon }} </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>


<script>
import { mdiMail, mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js'

export default {
  data: () => ({
    icons: {
      mdiMail,
      mdiTwitter,
      mdiFacebook,
      mdiInstagram,
    },
    socialLinks: [],
  }),
  beforeMount() {
    this.getSocialLinks()
  },
  methods: {
    getSocialLinks() {
      this.socialLinks = this.$config.siteData.networks.map((network) => {
        return {
          url: network.name === 'Email' ? 'mailto:' + network.url : network.url,
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
}
</script>
