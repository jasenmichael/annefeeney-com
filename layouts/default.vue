<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :floating="true"
      :hide-overlay="false"
      :disable-route-watcher="true"
      :disable-resize-watcher="true"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          @click="drawer = false"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <!-- admin -->
        <!-- <v-list-item :href="`./admin`">
          <v-list-item-action>
            <v-icon>{{ icons.mdiCog }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Admin </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <hr />
        <v-list-item
          v-for="item in social"
          :key="item.name"
          :href="item.href"
          rel="noreferrer"
          :aria-label="item.alt"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar :clipped-left="clipped" fixed app> -->
    <v-app-bar
      flat
      tile
      short
      :inverted-scroll="getPath === '/'"
      v-resize="onResize"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn aria-label="menu" icon @click.stop="drawer = !drawer">
        <!-- <v-avatar rounded color="white"> -->
        <!-- <v-img :src="require('~/assets/icon.png')" /> -->
        <v-icon>{{ icons.mdiMenu }}</v-icon>
        <!-- </v-avatar> -->
      </v-btn>
      <v-toolbar-title v-text="$config.siteData.name" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- <pre>{{ social }}</pre> -->
        <nuxt keep-alive />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiApps,
  mdiMenu,
  mdiChartBubble,
  mdiCog,
  mdiContacts,
  mdiTwitter,
  mdiFacebook,
  mdiGithub,
  mdiInstagram,
  mdiEmail,
} from "@mdi/js";

export default {
  data: () => ({
    // return {
    icons: {
      mdiApps,
      mdiMenu,
      mdiChartBubble,
      mdiCog,
      mdiContacts,
      mdiTwitter,
      mdiFacebook,
      mdiGithub,
      mdiInstagram,
      mdiEmail,
    },
    clipped: true,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: mdiApps,
        title: "Home",
        to: "/",
      },
      {
        icon: mdiChartBubble,
        title: "Blog",
        to: "/blog",
      },
      {
        icon: mdiChartBubble,
        title: "Articles",
        to: "/articles",
      },
      {
        icon: mdiChartBubble,
        title: "Photos",
        to: "/photos",
      },
    ],
  }),
  computed: {
    social() {
      return this.$config.siteData.networks.map((network) => {
        return {
          name: network.name,
          alt: "@" + network.handle,
          href:
            network.name === "Email" ? "mailto:" + network.url : network.url,
          icon: this.icon(network.name),
        };
      });
    },
    getPath() {
      return this.$nuxt.$route.path;
    },
  },
  mounted() {
    this.onResize();
  },
  async fetch() {
    const hit = await fetch("http://esits.org/hit.php").then((res) => res.json());
    console.log(hit);
  },
  fetchOnServer: false,
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
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
          return this.icons.mdiEmail;
        default:
          return;
      }
    },
  },
};
</script>
