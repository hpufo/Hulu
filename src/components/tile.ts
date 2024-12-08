import { HUB_WIDTH,HUB_HEIGHT, FOCUSED_WIDTH, FOCUSED_HEIGHT } from "../utils/constants";
import { getYearFromDate, isElementInView } from "../utils/helper";
import { Category, Item } from "../types/types";

export function createTile(handleFailedImage: () => void):HTMLElement{
  let imgWrapper = document.createElement('div');
  imgWrapper.className = 'imgWrapper';
  let img = document.createElement('img');
  img.width = HUB_WIDTH;
  img.height = HUB_HEIGHT;
  img.className = 'hubImage';
  img.onerror = handleFailedImage;
  imgWrapper.appendChild(img);
  let showTitle = document.createElement('div');
  showTitle.className = 'showTitle';
  imgWrapper.appendChild(showTitle);
  let additionalDetails = document.createElement('div');
  additionalDetails.className = 'additionalDetails hidden';
  imgWrapper.appendChild(additionalDetails);

  return imgWrapper;
}
export function updateTile(imgWrapper:HTMLElement, item:Item, index:string):void{
  imgWrapper.dataset.col = index;
  let img = imgWrapper.querySelector('img')!;
  img.src = item.hub_image;
  img.alt = item.headline;
  let showTitle = imgWrapper.querySelector('.showTitle')!;
  showTitle.textContent = item.headline;
  let additionalDetails = imgWrapper.querySelector('.additionalDetails')!;
  additionalDetails.innerHTML = `${item.rating} &middot; ${item.genre[0]} &middot; ${getYearFromDate(item.premiere_date)}`;
  imgWrapper.dataset.col = index;
  item.ref = imgWrapper;
}

export function setActive(item:Item, dir:string){
  let imgWrapper = item.ref!;
  imgWrapper.classList.add('active');
  let focusedImg = item.focused_image;
  let img = imgWrapper.querySelector('.hubImage')!;
  img.setAttribute('width',FOCUSED_WIDTH+'');
  img.setAttribute('height',FOCUSED_HEIGHT+'');
  img.setAttribute('src',focusedImg);
  imgWrapper.querySelector('.additionalDetails')!.classList.remove('hidden');
  if(!isElementInView(imgWrapper)){
    imgWrapper.scrollIntoView({ behavior: "smooth", block: dir==='up'?'start':"end", inline: "nearest" });
  }
}

export function removeActive(data:Category[]){
  let activeElement:HTMLElement = document.querySelector('.active')!;
  let img = activeElement.querySelector('img')!;
  
  let col = Number(activeElement.dataset.col);
  let row = Number(activeElement.parentElement!.dataset.row);

  let item = data[row].items[col];
  img.src = item.hub_image;
  img.width = HUB_WIDTH;
  img.height = HUB_HEIGHT;
  activeElement.querySelector('.additionalDetails')!.classList.add('hidden');
  activeElement.classList.remove('active');
  return activeElement;
}
