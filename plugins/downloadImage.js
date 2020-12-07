const fs = require('fs');
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')

export default async function (url, id) {
  console.log('checking if already downloaded')
  let path = `/${id}.jpg`

  async function saveLocalPath() {
    let posts = await loadJsonFile('static/posts-cache.json')
    let updatedPosts = posts
      .map(post => {
        let cachedPost = posts.filter(cached => post.id === cached.id)[0]
        let path = `/${post.id}.jpg`
        // console.log("post", post.id)
        // console.log("cachedPost", cachedPost.id)
        // console.log("localImage", cachedPost.localImage)
        // console.log("path", path)
        if (post.id === cachedPost.id) {
          return {
            ...post,
            localImage: path
          }
        } else {
          return post
        }

      })
    await writeJsonFile('static/posts-cache.json', updatedPosts)
  }



  ////////////////////
  if (fs.existsSync("static" + path)) {
    console.log('Image found')
    saveLocalPath()
  } else {
    console.log('Image not found, saving', id)
    await axios.get(url, {
      responseType: "stream"
    }).then(res => {
      res.data.pipe(fs.createWriteStream("static" + path))
      saveLocalPath()
    })
  }
  ////////////////////

}
