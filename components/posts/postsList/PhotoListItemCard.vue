<template>
  <v-container>
    <!-- <pre>{{ $route.path }}</pre> -->
    <v-card :to="`${$route.path}/${post.slug}`" rounded="4" light max-width="900">
      <v-row class="pa-0">
        <v-col cols="12" sm="4" class="py-0 ma-0">
          <v-img
            contain
            max-width="300"
            class="ma-0"
            :src="post.localImage || post.image"
          >
          </v-img> 

        </v-col>
        <v-col cols="8" class="d-flex align-start flex-column">
          <h3 class="mt-auto  mr-3">{{ post.caption ? post.caption.trim() : `Untitled` }}</h3>
          <!-- <pre>{{post.caption}}</pre> -->
          <h4 class="mt-auto  mr-3" v-text="post.tags.map(tag=>`#${tag}`).join(' ') || ''"></h4>
        </v-col>
      </v-row>
    </v-card>

    <!-- <pre>{{ post }}</pre> -->
  </v-container>
</template>

<script>
export default {
  props: ['post'],
}
</script>
