<template>
  <v-card :to="`/photos/${post.slug}`" flat color="transparent">
    <v-img
      contain
      max-height="80vh"
      max-width="80vw"
      :src="post.localImage || post.image"
    ></v-img>
  </v-card>
  <!-- <pre>{{ post }}</pre> -->
</template>

<script>
export default {
  props: ['post'],
}
</script>
