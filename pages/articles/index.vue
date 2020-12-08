<template>
  <v-container>
    <!-- <pre>{{ articles }}</pre> -->
    <!-- <pre>{{ content }}</pre> -->
    <!-- <div v-html="content[1].OG['audio-player']"></div> -->
    <h2 class="mb-6">Go Back <nuxt-link to="/"> Home </nuxt-link></h2>
    <h1>Anne Feeney in the News and Media</h1>
    <v-card
      max-width="900"
      class="pa-1 ma-3"
      light
      v-for="article in articles"
      :key="article.id"
      :href="article.linkUrl"
      target="_blank"
    >
      <v-card-title>{{ article.linkText || articleTitle }}</v-card-title>
      <v-card-text
        class="pb-0 mb-0"
        v-html="
          (article.linkDescription &&
            article.linkDescription.replace(/p>/g, 'quote>')) ||
          ''
        "
      ></v-card-text>
      <v-card-text>click to read the full article..</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    // const content = await $content("tumblr").fetch()
    const articles = await $content('tumblr')
      .where({ type: 'link' })
      .fetch()
      .catch((err) => {
        return Error({ statusCode: 404, message: 'Page not found' })
      })
    return { articles }
  },
}
</script>
