<template>
  <div>
    <!-- <pre>{{params}}</pre> -->
    <h2>Back to <nuxt-link to="/photos"> Photos </nuxt-link></h2>
    <v-img
      contain
      max-height="80vh"
      max-width="80vw"
      v-if="!photoExist"
      :src="photo.localImage || photo.image"
    ></v-img>
    <div v-else>
      <h2>{{ params.photo }} not found...</h2>
    </div>
    <!-- <pre>{{ params }}</pre> -->
    <!-- <pre>{{content}}</pre> -->
    <!-- <pre>{{ photo }}</pre> -->
    <!-- <pre>exists: {{ !photoExist }}</pre> -->
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const photo =
      (await $content("tumblr")
        .where({ type: 'photo', id: params.photo })
        .fetch()
        .then((photo) => photo[0])) || {}
    return { photo, params }
  },
  computed: {
    photoExist() {
      return (
        Object.keys(this.photo).length === 0 &&
        this.photo.constructor === Object
      )
    },
  },
}
</script>
