const axios = require('axios');

const HUB_WIDTH=400;
const HUB_HEIGHT=200;
const FOCUSED_WIDTH=420;
const FOCUSED_HEIGHT=210;
const IMAGE_FORMAT='webp';

axios.get('https://du841e2hrnlc1.cloudfront.net/hub.json')
  .then((res) => {
    return res.data.components.reduce((acc,component) => {
      component.items.forEach((item) => {
        acc.push(
          axios.get(item.visuals.artwork.horizontal_tile.image.path+`&size=${HUB_WIDTH}x${HUB_HEIGHT}&format=${IMAGE_FORMAT}`),
          axios.get(item.visuals.artwork.horizontal_tile.image.path+`&size=${FOCUSED_WIDTH}x${FOCUSED_HEIGHT}&format=${IMAGE_FORMAT}`)
        );
      })
      return acc;
    },[]);
  })
  .then((reqArray) => axios.all(reqArray))
  .then(axios.spread((...resArray) => {
    let processing = resArray.filter((res) => res.data==='Submitted for processing');
    console.log(`${processing.length} images are being processed`);
  }))
  .catch(e => console.log(e));