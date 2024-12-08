import { Category } from "../types/types";
import { createTile, updateTile } from "./tile";
import { handleFailedImage } from "../utils/helper";

export function createComponentRow(categoryItem:Category,index:number,windowWidth:number):HTMLElement{
  let {category,items} = categoryItem;
  let rowWrapper = document.createElement('div');
  rowWrapper.className = 'rowWrapper';
  let header = document.createElement('h3');
  header.textContent = category;
  header.className = 'category';
  rowWrapper.appendChild(header);
  let componentRow = document.createElement('div');
  componentRow.className = 'componentRow';
  componentRow.dataset.row = index+'';

  for(let j=0; j<Math.min(windowWidth,items.length); j++){
    let item = items[j];
    let imgWrapper = createTile(handleFailedImage);
    updateTile(imgWrapper, item, j+'');
    componentRow.appendChild(imgWrapper);
  }
  rowWrapper.appendChild(componentRow);
  return rowWrapper;
}

export function updateTitleRow(rowWrapper:HTMLElement,category:Category, index:string, data:Category[]):void{
  let header = rowWrapper.querySelector('.category')!;
  header.textContent = category.category;
  let componentRow = rowWrapper.querySelector('.componentRow') as HTMLElement;
  componentRow.dataset.row = index;
  let colOffset = category.colOffset;
  for(let imgWrapper of componentRow.children){
    updateTile(imgWrapper as HTMLElement,data[Number(index)].items[colOffset],colOffset+'');
    colOffset++;
  }
  category.rowRef = rowWrapper;
}