const axios = require('axios');

const HUB_WIDTH=400;
const HUB_HEIGHT=200;
const FOCUSED_WIDTH=420;
const FOCUSED_HEIGHT=210;
const IMAGE_FORMAT='webp';
//A quick and dirty file I created to generate all the images I will need for the app.
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

axios.all([axios.get('https://deea0klm3ow5h.cloudfront.net/collections/2362.json'),axios.get('https://deea0klm3ow5h.cloudfront.net/collections/2468.json'),axios.get('https://deea0klm3ow5h.cloudfront.net/collections/120.json')])
  .then(axios.spread((...resArray) => {
    return resArray.reduce((acc, res) => {
      res.data.items.forEach(item => {
        console.log(item.visuals.artwork.horizontal_tile.image.path+`&size=${HUB_WIDTH}x${HUB_HEIGHT}&format=${IMAGE_FORMAT}`,item.visuals.artwork.horizontal_tile.image.path+`&size=${FOCUSED_WIDTH}x${FOCUSED_HEIGHT}&format=${IMAGE_FORMAT}`)
        acc.push(
          axios.get(item.visuals.artwork.horizontal_tile.image.path+`&size=${HUB_WIDTH}x${HUB_HEIGHT}&format=${IMAGE_FORMAT}`),
          axios.get(item.visuals.artwork.horizontal_tile.image.path+`&size=${FOCUSED_WIDTH}x${FOCUSED_HEIGHT}&format=${IMAGE_FORMAT}`)
        );
      });
      return acc;
    }, []);
  }))
  .then((promises) => axios.all(promises))
  .then(axios.spread((...resArray) => {
    let processing = resArray.filter((res) => res.data==='Submitted for processing');
    console.log(`${processing.length} images are being processed`);
  })).catch(e => console.log(e))