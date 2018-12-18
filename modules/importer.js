import fs from 'fs';
import { promisify } from "util";

export default class Importer {
  import(path) {
    return promisify(fs.readFile)(path);   
  } 
  importSync(path) {
    return fs.readFileSync(path).toString();    
  }  
}