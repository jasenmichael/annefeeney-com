<template>
  <div class="max-w-6xl mx-auto">
    <!-- :height="windowSize.y - 250" -->
    <!-- width="100vw" -->
    <!-- dark -->
    <!-- v-resize="onResize" -->
    <h1 class="py-4 text-xl md:text-2xl text-center font-light text-gray-300">
      Anne Feeney, Rest in Power (July 1, 1951 – February 3, 2021)
    </h1>
    <div class="lg:flex text-center items-center mx-auto mb-2">
      <h2 class="text-center ml-auto text-gray-300 mr-2 lg:mr-0">
        Join us in
        <span class="text-2xl">
          Celebrating the life and legacy of Anne Feeney
        </span>
        Memorial April 3, 2021
      </h2>
      <button
        class="px-4 mr-auto font-bold rounded bg-gray-800 hover:bg-gray-700 mt-2"
      >
        <nuxt-link to="/memorial" class="visited:text-gray-300"> more info here </nuxt-link>
      </button>
    </div>
    <div class="h-3/4 flex mx-auto">
      <img
        :src="require(`~/assets/background.jpg`)"
        class="object-contain mx-auto bg-gray-900 opacity-60"
      />
    </div>

    <!-- :src="
        windowSize.x >= 550
          ? require(`~/assets/background.jpg`)
          : require('~/assets/background-sm.jpg')
      " -->
    <!-- <v-overlay z-index="-20"></v-overlay> -->
    <v-row z-index="999" align="center" justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-7xl font-weight-thin mb-2">
          {{ page.title || $config.siteData.name }}
        </h1>
        <h2 class="subheading font-weight-light">
          {{ page.description || $config.siteData.description }}
        </h2>
        <div class="hidden md:block">
          <HomeNavigation />
        </div>
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
    <!-- </img> -->

    <v-row z-index="999" align="center" justify="center">
      <!-- <v-col class="mt-auto" cols="12"> -->
      <v-col class="mt-auto d-flex align-center flex-column" cols="12" >
        <v-row class="md:px-2">
          <v-card light class="pa-6 mt-4 " style="font-size: 1.3rem" >
            <nuxt-content class="text-gray-900 rounded-none md:rounded" :document="page" />
          </v-card>
        </v-row>
      </v-col>
      <ContactLinks />
    </v-row>
  </div>
</template>


<script>
import getMeta from "~/utils/getMeta.js";
import { mdiMail, mdiTwitter, mdiFacebook, mdiInstagram } from "@mdi/js";

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
    this.onResize();
    this.getSocialLinks();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    getSocialLinks() {
      this.socialLinks = this.$config.siteData.networks.map((network) => {
        return {
          url: network.url,
          icon: this.icon(network.name),
          // color: 'blue',
          name: network.name,
        };
      });
    },
    icon(name) {
      let icon;
      switch (name) {
        case "Twitter":
          return this.icons.mdiTwitter;
        case "Facebook":
          return this.icons.mdiFacebook;
        case "Instagram":
          return this.icons.mdiInstagram;
        case "Email":
          return this.icons.mdiMail;
        default:
          return;
      }
    },
  },
  async asyncData({ $content }) {
    const page = await $content("pages/home").fetch();
    return {
      page,
    };
  },
  computed: {
    canonicalUrl() {
      return (
        ((this.$config.ngrok && this.$config.ngrok.url) ||
          this.$config.baseUrl) + this.$route.fullPath
      );
    },
    meta() {
      const metaData = {
        type: "website", // use article for blogs and such
        title: this.$config.siteData.name,
        description: this.$config.siteData.description,
        url: this.canonicalUrl,
        mainImage:
          ((this.$config.ngrok && this.$config.ngrok.url) ||
            this.$config.baseUrl) + (this.page.cover || "/background.jpg"),
      };
      return getMeta(metaData, this.$config.siteData, this.canonicalUrl);
    },
  },
  head() {
    return {
      title: this.page.description || this.$config.siteData.description,
      meta: this.meta,
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.canonicalUrl,
        },
      ],
    };
  },
};
</script>


<style >
.nuxt-content {
  background-color: white;
}
.nuxt-content p {
  color: black;
}
</style>
