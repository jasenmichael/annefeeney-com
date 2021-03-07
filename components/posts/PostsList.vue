<template>
  <div>
    <!-- filter by type, and views -->
    <!-- types filter/links -->
    <v-row align="center" justify="start" class="mx-4">
      <div class="m-2 mr-auto">
        <nuxt-link to="/posts">ALL POSTS</nuxt-link>
        <nuxt-link
          class="ml-2"
          v-for="type in Object.keys(types)"
          :key="type"
          :to="'/' + type"
        >
          {{ type.toUpperCase() }}
        </nuxt-link>
      </div>

      <!-- view selector -->
      <v-btn-toggle mandatory v-model="view">
        <v-tooltip v-for="(view, i) in views" :key="i" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>{{ views[i].icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ view.label }} View</span>
        </v-tooltip>
      </v-btn-toggle>
      <!-- view selector -->
    </v-row>
    <!-- filter by type, and views -->

    <!-- <pre>view selected {{ view }}</pre> -->

    <!-- posts not empty, show posts -->
    <div v-if="posts.length">
      <!-- <pre> {{posts.length}} </pre>
      <pre> {{posts}} </pre> -->
      <!-- masonry view - view = 0 -->
      <div v-if="view === 0">
        <div id="images">
          <no-ssr>
            <v-row
              v-masonry
              origin-left="true"
              horizontal-order="true"
              transition-duration="0.5s"
              item-selector=".post"
              class="masonry-container"
            >
              <!-- :key="post.id || post.slug.replace(/,/g, ' ').replace(/ /g, '-')" -->
              <v-col
                v-masonry-tile
                class="post"
                v-for="(post, i) in posts"
                :key="i"
                xs="8"
                sm="6"
                md="4"
                lg="3"
              >
                <!-- <pre>{{$route.path}}</pre> -->
                <!-- <v-lazy> -->
                <AudioListItem v-if="post.type === 'audio'" :post="post" />
                <VideoListItem v-if="post.type === 'video'" :post="post" />
                <PhotoListItemMasonryCard
                  v-if="post.type === 'photo'"
                  :post="post"
                />
                <RegularListItem v-if="post.type === 'regular'" :post="post" />
                <LinkListItem v-if="post.type === 'link'" :post="post" />
                <!-- </v-lazy> -->
              </v-col>
            </v-row>
          </no-ssr>
        </div>
      </div>
      <!-- masonry view - view = 0 -->

      <!-- list view - view = 1 -->
      <div v-if="view === 1">
        <div v-for="(post, i) in posts" :key="i">
          <AudioListItem v-if="post.type === 'audio'" :post="post" />
          <VideoListItem v-if="post.type === 'video'" :post="post" />
          <PhotoListItemCard v-if="post.type === 'photo'" :post="post" />
          <RegularListItem v-if="post.type === 'regular'" :post="post" />
          <LinkListItem v-if="post.type === 'link'" :post="post" />
        </div>
      </div>
      <!-- list view - view = 1 -->

      <!-- grid view - view = 2 -->
      <div v-if="view === 2">
        <div v-for="(post, i) in posts" :key="i">
          post type: {{ post.type }}
          <AudioListItem v-if="post.type === 'audio'" :post="post" />
          <VideoListItem v-if="post.type === 'video'" :post="post" />
          <PhotoListItemCard v-if="post.type === 'photo'" :post="post" />
          <RegularListItem v-if="post.type === 'regular'" :post="post" />
          <LinkListItem v-if="post.type === 'link'" :post="post" />
        </div>
      </div>
      <!-- grid view - view = 2 -->
    </div>

    <!-- posts empty, show not found -->
    <div v-else>No {{ $route.path.replace('/', '') }} found</div>
  </div>
</template>

<script>
import { mdiGrid, mdiViewList, mdiGridLarge } from '@mdi/js'

export default {
  props: ['posts', 'types'],
  data: () => {
    return {
      // set default view
      view: 0,
      views: [
        { label: 'Masonry', icon: mdiGrid },
        { label: 'List', icon: mdiViewList },
        { label: 'Grid', icon: mdiGridLarge },
      ],
      icons: {
        mdiGrid,
        mdiViewList,
        mdiGridLarge,
      },
    }
  },

}
</script>
