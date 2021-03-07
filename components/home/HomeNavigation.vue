<template>
  <div>
    <v-col class="text-center mt-auto d-flex align-center flex-column">
      <v-row>
        <v-col class="text-start" cols="12">
          <div class="text-center">
            <v-btn
              v-for="(link, i) in links"
              :key="i"
              class="ma-3 lighten-1 fab accented-text"
              light
              :to="link.path"
              rounded
            >
              {{ link.name.toUpperCase() }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>


<script>
export default {
  data: () => {
    return {
      links: [
        { name: 'home', path: '/' },
        { name: 'blog', path: '/blog' },
        { name: 'articles', path: '/articles' },
        { name: 'photos', path: '/photos' },
      ],
    }
  },
}
</script>
