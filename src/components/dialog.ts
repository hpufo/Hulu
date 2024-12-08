import { HUB_WIDTH,HUB_HEIGHT } from "../utils/constants";
import { Item } from "../types/types";
import { en } from "../locales/messages.json";

export function createDialog(handleFailedImage: () => void):HTMLElement{
  let dialog = document.createElement('dialog');

  let title = document.createElement('h1');
  title.textContent = '';
  dialog.appendChild(title);

  let imgWrapper = document.createElement('div');
  let img = document.createElement('img');
  img.src = '';
  img.alt = '';
  img.width = HUB_WIDTH;
  img.height = HUB_HEIGHT;
  img.onerror = handleFailedImage;
  imgWrapper.appendChild(img);
  dialog.appendChild(imgWrapper);

  let genres = document.createElement('div');
  genres.className = 'genres';
  genres.textContent = '';
  dialog.appendChild(genres);

  let description = document.createElement('p');
  description.textContent = '';
  dialog.appendChild(description);

  return dialog;
}

export function updateDialog(item:Item):void{
  let dialog = document.querySelector('dialog')!;

  let title = dialog.querySelector('h1')!;
  title.textContent = item.headline;

  let img = dialog.querySelector('img')!;
  img.src = item.hub_image;
  img.alt = item.headline;

  let genres = dialog.querySelector('.genres')!;
  genres.textContent = `${en.genres}: ${item.genre.join(', ')}`;

  let description = dialog.querySelector('p')!;
  description.textContent = item.series_description;
}