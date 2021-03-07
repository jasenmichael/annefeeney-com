<template>
  <div>
    <!-- post component -->
    <AudioListItem v-if="post.type === 'audio'" :post="post" />
    <VideoListItem v-if="post.type === 'video'" :post="post" />
    <PhotoListItemCard v-if="post.type === 'photo'" :post="post" />
    <RegularListItem v-if="post.type === 'regular'" :post="post" />
    <LinkListItem v-if="post.type === 'link'" :post="post" />
    <!-- <pre>{{ post }}</pre> -->
  </div>
</template>

<script>
export default {
  props: ['post'],
}
</script>
