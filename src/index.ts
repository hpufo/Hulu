import { loadInitialData,loadAddionalData } from './api';
import { Item, Category } from './types/types';
import { createComponentRow, updateTitleRow } from './components/tileRow';
import { updateTile, setActive, removeActive } from './components/tile';
import { createDialog, updateDialog } from './components/dialog';
import { handleFailedImage } from './utils/helper';
import { HUB_WIDTH, HUB_HEIGHT } from './utils/constants';
import './styles.css';

//App state:
let data:Category[]=[];
let windowHeight = Math.ceil(window.screen.availHeight/(HUB_HEIGHT+87))+1;
let windowWidth = Math.ceil(window.screen.availWidth/(HUB_WIDTH+20))+1;
let dir:string;

function handleInput(e:KeyboardEvent){
  let activeElement:HTMLElement = document.querySelector('.active')!;
  let dialog = document.querySelector('dialog')!;
  let col = Number(activeElement.dataset.col);
  let row = Number(activeElement.parentElement?.dataset.row);

  if(dialog.open){
    dialog.close();
    return;
  }
  if(e.key==='Enter'){
    updateDialog(data[row].items[col]);
    dialog.showModal();
  }
  
  switch(e.key){
    case "ArrowUp":
      if(row===0) return;
      dir='up';
      col = col - data[row].colOffset;
      row--;
      col = col + data[row].colOffset;
      break;
    case "ArrowDown":
      if(row===data.length-1) return;
      dir='down';
      col = col - data[row].colOffset;
      row++;
      col = col + data[row].colOffset;
      break;
    case "ArrowRight":
      if(col===data[row].items.length-1) return;
      dir='right';
      col++;
      break;
    case "ArrowLeft":
      dir='left';
      if(col===0) return;
      col--;
      break;
    default:
      return;
  }
  if(col >= data[row].items.length){
    col = data[row].items.length-1;
  }

  removeActive(data);
  setActive(data[row].items[col], dir);
  
  let nextDataItem = data[row].items[col+1];
  //load items to the right
  if(col >= windowWidth-1 && col < data[row].items.length-1 && !nextDataItem.ref){
    let dataItemAtWindowStart = data[row].items[col-(windowWidth-1)];
    colSlidingWindow(dataItemAtWindowStart,nextDataItem);
    data[row].colOffset++;
  }
  //loads items to the left
  if(col>0 && !data[row].items[col-1].ref){
    let prevDataItem = data[row].items[col-1];
    let dataItemAtWindowEnd = data[row].items[col+(windowWidth-1)];
    colSlidingWindow(dataItemAtWindowEnd,prevDataItem,true);
    data[row].colOffset--;
  }
  //loads the bottom row
  if(row < data.length-1 && !data[row+1].rowRef){
    let leavingIndex = row-(windowHeight-1);
    let enteringIndex = row+1;
    rowSlidingWindow(data[leavingIndex],data[enteringIndex]);
  }
  //loads the top row
  if(row>0 && !data[row-1].rowRef){
    let leavingIndex = row+(windowHeight-1);
    let enteringIndex = row-1;
    rowSlidingWindow(data[leavingIndex],data[enteringIndex], true);
  }
}
function rowSlidingWindow(leaving:Category,entering:Category,prepend=false){
  let rowWrapper = leaving.rowRef!;
  leaving.rowRef = null;
  let parent = rowWrapper.parentElement!;
  parent.removeChild(rowWrapper);
  let leavingRowNum = Number((rowWrapper.querySelector('.componentRow') as HTMLElement).dataset.row);
  if(prepend){
    let enteringRowNum = leavingRowNum-windowHeight;
    updateTitleRow(rowWrapper,entering,enteringRowNum+'',data);
    parent.prepend(rowWrapper);
  }else{
    let enteringRowNum = leavingRowNum+windowHeight;
    updateTitleRow(rowWrapper,entering,enteringRowNum+'',data);
    parent.appendChild(rowWrapper);
  }
}
function colSlidingWindow(leaving:Item,entering:Item,prepend=false){
  let imgWrapper:HTMLElement = leaving.ref!;
  leaving.ref = null;
  let componentRow:HTMLElement = imgWrapper.parentElement!;
  componentRow.removeChild(imgWrapper);
  let leavingColNum = Number(imgWrapper.dataset.col);
  if(prepend){
    updateTile(imgWrapper,entering,(leavingColNum-windowWidth)+'');
    componentRow.prepend(imgWrapper);
  }else{
    updateTile(imgWrapper,entering,(leavingColNum+windowWidth)+'');
    componentRow.appendChild(imgWrapper);
  }
}

function buildDOM(data:Category[],targetElement:HTMLElement):void{
  let wrapper = document.createElement('div');
  for(let i=0; i<Math.min(windowHeight,data.length); i++){
    let rowWrapper = createComponentRow(data[i],i,windowWidth);
    wrapper.appendChild(rowWrapper);
    data[i].rowRef = rowWrapper;
  }
  targetElement?.addEventListener('keyup',handleInput);
  targetElement.appendChild(wrapper);
  
  let dialog = createDialog(handleFailedImage);
  targetElement.appendChild(dialog);
}

async function init(){
  const body = document.querySelector('body')!;
  try{
    let [response, urlsToProcessLater] = await loadInitialData();
    data = response;
    buildDOM(data,body);
    setActive(data[0].items[0],'up');
    body.addEventListener('keyup',handleInput);
    await loadAddionalData(urlsToProcessLater,data);
  }catch(e){
    console.log(e);
  }
}

init();
