<template></template>

<script>
if (process.client) {
  NetlifyCmsApp.init()
}

export default {
  layout: 'cms',
  head: {
    script: [
      { src: 'https://unpkg.com/react@^16/umd/react.production.min.js' },
      {
        src: 'https://unpkg.com/react-dom@^16/umd/react-dom.production.min.js',
      },
      { src: 'https://unpkg.com/netlify-cms-app/dist/netlify-cms-app.js' },
    ],
  },
}
</script>
