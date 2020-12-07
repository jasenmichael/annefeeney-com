// const loadJsonFile = require('load-json-file')
const fs = require('fs');

// takes tumblr handle, returns deserialized posts
const getJson = async (handle) => {
  const axios = require('axios')
  return axios.get(`https://${handle}.tumblr.com/api/read/json`, {
      method: 'GET',
      redirect: 'follow',
      mode: "no-cors",
      "Content-Type": "text/plain"
    })
    .then(res => res.data)
    .then(async txt => {
      let data = JSON.parse(txt.replace('var tumblr_api_read = ', '').replace('};', '}'))
      const posts = await deserializePosts(data.posts)
      //   console.log(posts)
      return posts
    })
    .catch(error => console.log('error', error))
}

const getType = async (posts, type) => {
  const filteredPosts = posts.filter(post => post.type === type)
  return await deserializePosts(filteredPosts)
}

// takes og tumblr posts, deseriallizes, and returns
const deserializePosts = (posts) => {
  return Promise.all(posts.map(async post => {
    return {
      // slug: "tumblr",
      id: post.id,
      date: post.date,
      type: post.type,
      unixtime: post['unix-timestamp'] || null,
      // likebtn: post['like-button'] || null,
      caption: post['photo-caption'] && post['photo-caption'].replace(/(<([^>]+)>)/gi, "") || null,
      //   instaUrl: post['photo-link-url'] || null,
      // tumblrUrl: post.url || null,
      // width: post.width || null,
      // height: post.height || null,
      tags: post.tags || [],
      //   imageUrl1280: post['photo-url-1280'] || null,
      //   imageUrl500: post['photo-url-500'] || null,
      //   imageUrl400: post['photo-url-400'] || null,
      //   imageUrl250: post['photo-url-250'] || null,
      //   imageUrl100: post['photo-url-100'] || null,
      //   imageurl75: post['photo-url-75'] || null,
      image: post['photo-url-1280'] || null,
      imageSmall: post['photo-url-500'] || null,
      localImage: post.localImage || null,
      localImageSmall: post.localImageSmall || null,
      regularTitle: post['regular-title'] || null,
      regularBody: post['regular-body'] || null,
      linkText: post['link-text'] || null,
      linkUrl: post['link-url'] || null,
      linkDescription: post['link-description'] || null,
      OG: post
    }
  }))
}

// takes posts, and dd dir, will construct filename [dir]/[post.id].[ext]
const downloadImages = async (posts, dir) => {
  const updatedPosts = await Promise.all(posts.map(async post => {
    if (post.type === 'photo') {
      const localImage = await downloadImage(post.image, `${dir}/${post.id}.${post.image.split('.').pop()}`)
      const localImageSmall = await downloadImage(post.imageSmall, `${dir}/${post.id}-thumb.${post.image.split('.').pop()}`)
      return {
        ...post,
        localImage,
        localImageSmall
      }
    } else return post
  }))
  return updatedPosts
}

// takes url, local path (static/..jpg), returns public path(removes static)
const downloadImage = async (url, path) => {
  const axios = require('axios')
  if (fs.existsSync(path)) {
    console.log('NOT DOWNLOADING - Image found at\r\n', path)
  } else {
    console.log('Image not found saving to ', path)
    await axios.get(url, {
      responseType: "stream"
    }).then(res => {
      res.data.pipe(fs.createWriteStream(path))
    })
  }
  const localPath = path.replace("static", "")
  return localPath
  ////////////////////
}


const cacheTumblrDownloadImages = async (handle, ) => {
  const writeJsonFile = require('write-json-file')
  const readJsonFile = require('load-json-file')
  console.log('Checking tumblr cache......')
  const posts = await getJson(handle)
  const jsonFile = "content/tumblr.json"
  if (!fs.existsSync(jsonFile)) {
    await writeJsonFile(jsonFile, [])
  }
  const cachedPosts = await readJsonFile(jsonFile)
  const updatedPosts = await downloadImages(posts, "static/img")
  if (JSON.stringify(updatedPosts) != JSON.stringify(cachedPosts)) {
    console.log("POSTS CHANGED - now updating ")
    await writeJsonFile(jsonFile, updatedPosts)
  } else {
    console.log("POSTS NOT CHANGED")
  }
}

module.exports = {
  // getJson,
  // getType,
  // deserializePosts,
  // downloadImages,
  // downloadImage,
  cacheTumblrDownloadImages
}
