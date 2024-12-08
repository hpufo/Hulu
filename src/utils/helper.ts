import imgError from '../assets/imgError.webp';
import {HUB_HEIGHT,HUB_WIDTH,FOCUSED_HEIGHT,FOCUSED_WIDTH,IMAGE_FORMAT} from './constants';
import { CollectionComponent, View } from '../types/types';

export const proxyUrl = (url:string) => 'https://corsproxy.io/?' + encodeURIComponent(url);

export function componentToObject(component:CollectionComponent){
  return {category: component.name, rowRef: null, colOffset: 0, items: component.items.map((item: View) => ({
    id: item.id,
    headline: item.visuals.headline,
    series_description: item.entity_metadata.series_description,
    hub_image: item.visuals.artwork.horizontal_tile.image.path+`&size=${HUB_WIDTH}x${HUB_HEIGHT}&format=${IMAGE_FORMAT}`,
    focused_image: item.visuals.artwork.horizontal_tile.image.path+`&size=${FOCUSED_WIDTH}x${FOCUSED_HEIGHT}&format=${IMAGE_FORMAT}`,
    premiere_date: item.entity_metadata.premiere_date,
    genre: item.entity_metadata.genre_names,
    rating: item.entity_metadata.rating.code || 'Unrated',
    watermark: item.visuals?.primary_branding?.artwork['brand.watermark'].path+`&size=${50}x${25}&format=${IMAGE_FORMAT}`,
    ref: null,
  }))};
}

export function getYearFromDate(dateString:string):number{
  let date = new Date(dateString);
  return date.getFullYear();
}

export function isElementInView(element: HTMLElement): boolean {
  let rect = element.getBoundingClientRect();
  let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= viewportWidth
  );
}

export function handleFailedImage(this: HTMLImageElement){
  this.src = imgError;
  this.alt = 'image failed to load';
}