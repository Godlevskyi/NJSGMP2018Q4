import { User, Product } from './models';
import path from 'path';
import { CSV2JSON } from "./utils";
import { DirWatcher, Importer } from './modules';

new User();
new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();

const directoryPath = path.resolve('data');
const delayForWatching = 2000;
const delayForUnWatch = 100000;

try {
  //async loading
  dirWatcher.on('dirwatcher:changed', (filePath) => {
    importer
      .import(filePath)
      .then( dataCSV => console.log(CSV2JSON(dataCSV)));
  });
  
  //Example usage of sync loading. Commented out as not required to be used  
  /*
  dirWatcher.on('dirwatcher:changed', (filePath) => {
    console.log(CSV2JSON(importer.importSync(filePath)));
  });
  */

  dirWatcher.watch(directoryPath, delayForWatching);

} catch (error) {
    console.log('Conversion error', error);
    throw error;
}

setTimeout(() => {
  dirWatcher.unWatch();
  console.log('DirWatcher stopped listening');
}, delayForUnWatch);


