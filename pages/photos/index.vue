<template>
  <div>
    <!-- <pre v-if="posts">posts {{ posts }}</pre> -->

    <!-- images from old-- -->
    <div id="images">
      <no-ssr>
        <v-row
          v-if="photos.length"
          v-masonry
          origin-left="true"
          horizontal-order="true"
          transition-duration="0.5s"
          item-selector=".img"
          class="masonry-container"
        >
          <v-col
            v-masonry-tile
            class="img"
            v-for="img in photos"
            :key="img.id"
            :xs="'img.width || 8'"
            sm="6"
            md="4"
            lg="3"
          >
            <!-- <v-lazy > -->
            <v-card :to="`/photos/${img.id}`" flat color="transparent">
              <v-img
                :lazy-src="img.localImageSmall || img.imageSmall"
                :src="img.localImage || img.image"
              ></v-img>
              <!-- <v-card-title>{{ card.title }} {{ card.id }}</v-card-title> -->
              <!-- <v-card-text>{{ card.id }}</v-card-text> -->
            </v-card>
            <!-- </v-lazy> -->
          </v-col>
        </v-row>
      </no-ssr>
    </div>
    <!-- <pre v-if="photos">photos {{ photos }}</pre> -->
  </div>
</template>


<script>
import NoSSR from 'vue-no-ssr'
export default {
  components: {
    'no-ssr': NoSSR,
  },
  data: () => {
    return {
      //   : '',
    }
  },
  async asyncData({ $content }) {
    const posts = await $content().where({ slug: 'tumblr' }).fetch()
    const photos = posts.filter((post) => post.type === 'photo').sort( () => .5 - Math.random() )
    return { photos, posts }
  },
  mounted() {
    this.$redrawVueMasonry()
    this.setLoaded()
  },
  watch: {
    posts() {
      this.setLoaded()
    },
  },
  methods: {
    async setLoaded() {
      // add dummy image
      console.log('setting loaded')
      setTimeout(() => {
        this.photos.push({
          id: '00011111',
          imageUrl1280: '',
          width: '1',
        })
        // remove dummy image
        setTimeout(() => {
          this.photos.pop()
        }, 3500)
      }, 2000)
    },
  },
}
</script>
