# Hulu

This is a project that uses Typescript, HTML, CSS, and webpack to create a client side app that mimics how Hulu would appear on a device. Therefore the only way to interact with the app is with the keyboard. You can used the arrow keys to navigate and the enter key to get more infomation on a tile displayed in a modal. Pressing anything will close the modal and allow you to continue navigating. This app interacts with an API which is a black box for me. When making a request for an image the dimensions and file type must be specified. In which the response will be a message stating that the image is processing. Once the image is finished proccessing the same request will respond with an image. Due to the blackbox nature of the API I do not know how long these images last for. Therefore I created a helper script that will generate all the images needed for the application which will ensure that all the files exists for the app. So please run that file locally before viewing this app. Alternatively you can just use the app and then on a reload all the images should be ready.

To set up locally: npm install

To ensure all images exist for the app: node ./generateHubImgs.js

To run locally: 

1) Run the proxy server: node proxy.js

2) Run the app(In another terminal window): run npm start

App is hosted at(May not work due to reliance on a free proxy which has limitations): https://hpufo.github.io/Hulu/
