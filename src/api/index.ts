import axios from "axios";
import { proxyUrl, componentToObject } from "../utils/helper";
import { Category, CollectionComponent } from "../types/types";
import { HUB_URL } from "../utils/constants";

export async function loadInitialData():Promise<[Category[], string[]]>{
  try{
    let res = await axios.get(proxyUrl(HUB_URL));
    let data:Category[] = [];
    let urls:string[] = [];
    res.data.components.forEach((component: CollectionComponent) => {
      if(component.items.length){
        data.push(componentToObject(component));
      }else{
        urls.push(component.href);
      }
    });
    return [data,urls];
  }catch(e){
    throw e;
  }
}

export async function loadAddionalData(urls:string[], data:Category[]):Promise<void>{
  try{
    let promises = urls.map(url => axios.get(proxyUrl(url)));
    let responses = await axios.all(promises);
    responses.forEach(res => {
      data.push(componentToObject(res.data));
    });
  }catch(e){
    throw e;
  }
}